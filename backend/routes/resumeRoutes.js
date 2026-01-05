const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse-new");
const mammoth = require("mammoth");

const router = express.Router();

// FIX: database file is inside /config/database.js
const pool = require("../config/database");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
});

const STUDENT_YEAR_ENUM = [
  "1st_year",
  "2nd_year",
  "3rd_year",
  "4th_year",
  "5th_year",
  "fresh_grad",
];

const ROADMAP_ID_ENUM = [
  "back-end",
  "cyber-security",
  "front-end",
  "game-dev",
  "software-architect",
  "ux-design",
];

async function extractResumeText(file) {
  const mime = file.mimetype;

  if (mime === "application/pdf") {
    const parsed = await pdfParse(file.buffer);
    return (parsed.text || "").trim();
  }

  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return (result.value || "").trim();
  }

  if (mime === "application/msword") {
    throw new Error("DOC is not supported. Please upload PDF or DOCX.");
  }

  throw new Error(`Unsupported file type: ${mime}`);
}

// POST /api/resume/analyze
router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      return res.status(500).json({ error: "Missing PERPLEXITY_API_KEY in .env" });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Use form-data field name 'file'.",
      });
    }

    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const resumeText = await extractResumeText(req.file);
    if (!resumeText) {
      return res.status(400).json({ error: "Could not extract text from resume." });
    }

    const studentYear = (req.body.student_year || "").trim();
    const preferredRoadmapId = (req.body.preferred_roadmap_id || "").trim();
    const targetRole = (req.body.target_role || "").trim();
    const targetCountry = (req.body.target_country || "").trim();

    if (studentYear && !STUDENT_YEAR_ENUM.includes(studentYear)) {
      return res.status(400).json({
        error: `Invalid student_year. Use one of: ${STUDENT_YEAR_ENUM.join(", ")}`,
      });
    }

    if (preferredRoadmapId && !ROADMAP_ID_ENUM.includes(preferredRoadmapId)) {
      return res.status(400).json({
        error: `Invalid preferred_roadmap_id. Use one of: ${ROADMAP_ID_ENUM.join(", ")}`,
      });
    }

    const clipped = resumeText.slice(0, 20000);

    const contextBlock = `
Candidate context:
- student_year: ${studentYear || "not_provided"}
- preferred_roadmap_id (if any): ${preferredRoadmapId || "not_provided"}
- target_role (if any): ${targetRole || "not_provided"}
- target_country/job market (if any): ${targetCountry || "not_provided"}

CareerPath constraint:
- Choose ONLY ONE best roadmap_id from this list: ${ROADMAP_ID_ENUM.join(", ")}

Rules:
- If student_year is 1st_year–5th_year, prioritize internships/junior/entry roles and a practical 12-week plan.
- Base strengths/weaknesses on evidence from the resume text.
`.trim();

    const payload = {
      model: "sonar-pro",
      messages: [
        {
          role: "system",
          content: "You are an ATS resume reviewer and career coach for Computer Science students.",
        },
        {
          role: "user",
          content: `${contextBlock}\n\nResume:\n${clipped}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "careerpath_resume_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "summary",
              "strengths",
              "weaknesses",
              "best_roadmap_id",
              "roadmap_confidence",
              "roadmap_reason",
              "recommended_roles",
              "skills_gaps",
              "projects_to_build",
              "resume_improvements",
              "next_12_weeks_plan",
            ],
            properties: {
              summary: { type: "string" },
              strengths: { type: "array", items: { type: "string" } },
              weaknesses: { type: "array", items: { type: "string" } },
              best_roadmap_id: { type: "string", enum: ROADMAP_ID_ENUM },
              roadmap_confidence: { type: "integer", minimum: 0, maximum: 100 },
              roadmap_reason: { type: "string" },
              recommended_roles: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["title", "level", "why"],
                  properties: {
                    title: { type: "string" },
                    level: { type: "string", enum: ["intern", "junior", "entry"] },
                    why: { type: "string" },
                  },
                },
              },
              skills_gaps: { type: "array", items: { type: "string" } },
              projects_to_build: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["project", "what_it_proves", "stack_suggestion"],
                  properties: {
                    project: { type: "string" },
                    what_it_proves: { type: "string" },
                    stack_suggestion: { type: "array", items: { type: "string" } },
                  },
                },
              },
              resume_improvements: { type: "array", items: { type: "string" } },
              next_12_weeks_plan: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["weeks", "actions"],
                  properties: {
                    weeks: { type: "string" },
                    actions: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
    };

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return res.status(resp.status).json({
        error: "Perplexity API error",
        details: data,
      });
    }

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "Empty model response", raw: data });
    }

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (parseErr) {
      return res.status(500).json({
        error: "Perplexity returned invalid JSON",
        raw_content: content,
        parse_error: String(parseErr),
      });
    }

    const scoreOverall = analysis?.roadmap_confidence ?? null;
    const summary = analysis?.summary ?? null;

    try {
      const [result] = await pool.execute(
        `INSERT INTO resume_analyses (user_id, analysis_json, score_overall, summary)
         VALUES (?, ?, ?, ?)`,
        [userId, JSON.stringify(analysis), scoreOverall, summary]
      );

      return res.json({
        id: result.insertId,
        created_at: new Date().toISOString(),
        analysis,
      });
    } catch (dbErr) {
      return res.json({
        id: null,
        created_at: new Date().toISOString(),
        analysis,
        warning: "Analysis completed but not saved to history",
        db_error: String(dbErr),
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Resume analysis failed",
      details: String(err),
    });
  }
});

// GET /api/resume/analyses?limit=20&offset=0
router.get("/analyses", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Force integers (and clamp)
    const limitRaw = Number.parseInt(String(req.query.limit ?? "20"), 10);
    const offsetRaw = Number.parseInt(String(req.query.offset ?? "0"), 10);

    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 20;
    const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

    // Avoid binding LIMIT/OFFSET as statement parameters
    const sql = `
      SELECT id, created_at, analysis_json, score_overall, summary
      FROM resume_analyses
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(sql, [userId]);

    const items = rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      score_overall: row.score_overall,
      summary: row.summary,
      analysis: typeof row.analysis_json === "string" ? JSON.parse(row.analysis_json) : row.analysis_json,
    }));

    return res.json(items);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch analyses",
      details: String(err),
    });
  }
});


module.exports = router;
