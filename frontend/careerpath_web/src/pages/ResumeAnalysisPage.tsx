import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeAnalysisPage.css';

type StudentYear =
  | '1st_year'
  | '2nd_year'
  | '3rd_year'
  | '4th_year'
  | '5th_year'
  | 'fresh_grad';

type RoadmapId =
  | 'back-end'
  | 'cyber-security'
  | 'front-end'
  | 'game-dev'
  | 'software-architect'
  | 'ux-design';

type ResumeAnalysis = {
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  best_roadmap_id?: RoadmapId | string;
  roadmap_confidence?: number;
  roadmap_reason?: string;
  recommended_roles?: Array<{ title?: string; level?: string; why?: string }>;
  skills_gaps?: string[];
  projects_to_build?: Array<{ project?: string; what_it_proves?: string; stack_suggestion?: string[] }>;
  resume_improvements?: string[];
  next_12_weeks_plan?: Array<{ weeks?: string; actions?: string[] }>;
  [key: string]: any;
};

// CLEAN UP CITATIONS: removes [1], [resume], etc.
const cleanBrackets = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\[\d+\]/g, '') // Remove [1], [2], etc.
    .replace(/\[resume\]/gi, '') // Remove [resume]
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
};

const safeString = (v: any, fallback = ''): string => {
  const str = typeof v === 'string' ? v : fallback;
  return cleanBrackets(str);
};

const safeStringArray = (v: any, fallback: string[] = []): string[] => {
  if (!Array.isArray(v)) return fallback;
  return v
    .map(x => cleanBrackets(typeof x === 'string' ? x : ''))
    .filter(x => x.length > 0);
};

const safeNumber = (v: any, fallback = 0): number => {
  const n = Number(v);
  return isNaN(n) ? fallback : n;
};

export const ResumeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [studentYear, setStudentYear] = useState<StudentYear>('3rd_year');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preferredRoadmapId, setPreferredRoadmapId] = useState<RoadmapId | ''>('');
  const [targetRole, setTargetRole] = useState('');
  const [targetCountry, setTargetCountry] = useState('Philippines');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const roadmapOptions = useMemo(
    () => [
      { id: 'front-end' as const, label: 'Front-end' },
      { id: 'back-end' as const, label: 'Back-end' },
      { id: 'cyber-security' as const, label: 'Cybersecurity' },
      { id: 'game-dev' as const, label: 'Game dev' },
      { id: 'software-architect' as const, label: 'Software architect' },
      { id: 'ux-design' as const, label: 'UX design' },
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAnalysis(null);

    if (!file) {
      setError('Please upload a PDF or DOCX resume first.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('student_year', studentYear);

      if (showAdvanced) {
        if (preferredRoadmapId) formData.append('preferred_roadmap_id', preferredRoadmapId);
        if (targetRole.trim()) formData.append('target_role', targetRole.trim());
        if (targetCountry.trim()) formData.append('target_country', targetCountry.trim());
      }

      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      console.log('API response:', data);

      if (!res.ok) {
        setError(data?.error || 'Resume analysis failed.');
        return;
      }

      const raw = data?.analysis ?? data;
      if (raw && typeof raw === 'object') {
        setAnalysis(raw as ResumeAnalysis);
      } else {
        setError('Invalid analysis response format.');
      }
    } catch (err: any) {
      setError(String(err));
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Show form OR results, not both
  if (analysis) {
    return (
      <div className="ra-page">
        <section className="ra-results-page">
          <div className="ra-results-header">
            <button className="ra-back-btn" onClick={() => setAnalysis(null)}>
              ← Back to Upload
            </button>
            <h1 className="ra-results-title">Your Resume Analysis</h1>
          </div>

          <div className="ra-results-container">
            {/* Summary */}
            {analysis.summary && (
              <div className="ra-card ra-card--summary">
                <h2 className="ra-card-title">Summary</h2>
                <p className="ra-text">{safeString(analysis.summary)}</p>
              </div>
            )}

            {/* Best Track */}
            {analysis.best_roadmap_id && (
              <div className="ra-card ra-card--track">
                <h2 className="ra-card-title">Recommended Track</h2>
                <div className="ra-track-info">
                  <div className="ra-track-main">
                    <span className="ra-pill-large">{safeString(analysis.best_roadmap_id).replace('-', ' ').toUpperCase()}</span>
                    {analysis.roadmap_confidence && (
                      <span className="ra-confidence">{safeNumber(analysis.roadmap_confidence)}% Match</span>
                    )}
                  </div>
                  {analysis.roadmap_reason && (
                    <p className="ra-text ra-text--secondary">{safeString(analysis.roadmap_reason)}</p>
                  )}
                </div>
                {analysis.best_roadmap_id && (
                  <button
                    className="ra-btn-primary"
                    onClick={() => navigate(`/roadmaps/${analysis.best_roadmap_id}`)}
                  >
                    Explore Full Roadmap →
                  </button>
                )}
              </div>
            )}

            {/* Two Column: Strengths & Weaknesses */}
            <div className="ra-grid-2">
              {analysis.strengths && safeStringArray(analysis.strengths).length > 0 && (
                <div className="ra-card">
                  <h3 className="ra-card-title">Strengths</h3>
                  <ul className="ra-list">
                    {safeStringArray(analysis.strengths).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.weaknesses && safeStringArray(analysis.weaknesses).length > 0 && (
                <div className="ra-card">
                  <h3 className="ra-card-title">Areas to Improve</h3>
                  <ul className="ra-list">
                    {safeStringArray(analysis.weaknesses).map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommended Roles */}
            {analysis.recommended_roles && Array.isArray(analysis.recommended_roles) && analysis.recommended_roles.length > 0 && (
              <div className="ra-card">
                <h3 className="ra-card-title">Recommended Roles</h3>
                <div className="ra-roles-list">
                  {analysis.recommended_roles.map((r: any, i: number) => (
                    <div key={i} className="ra-role-item">
                      <div className="ra-role-header">
                        <span className="ra-role-title">{safeString(r.title, 'Role')}</span>
                        <span className="ra-role-level">{safeString(r.level, 'entry').toUpperCase()}</span>
                      </div>
                      <p className="ra-role-why">{safeString(r.why)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Gaps */}
            {analysis.skills_gaps && safeStringArray(analysis.skills_gaps).length > 0 && (
              <div className="ra-card">
                <h3 className="ra-card-title">Skills to Develop</h3>
                <div className="ra-skills-grid">
                  {safeStringArray(analysis.skills_gaps).map((g, i) => (
                    <div key={i} className="ra-skill-tag">{g}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects to Build */}
            {analysis.projects_to_build && Array.isArray(analysis.projects_to_build) && analysis.projects_to_build.length > 0 && (
              <div className="ra-card">
                <h3 className="ra-card-title">Projects to Build</h3>
                <div className="ra-projects-list">
                  {analysis.projects_to_build.map((p: any, i: number) => (
                    <div key={i} className="ra-project-item">
                      <h4 className="ra-project-name">{safeString(p.project, 'Project')}</h4>
                      <p className="ra-project-desc">{safeString(p.what_it_proves)}</p>
                      {p.stack_suggestion && safeStringArray(p.stack_suggestion).length > 0 && (
                        <div className="ra-tech-stack">
                          <strong>Stack:</strong>
                          <div className="ra-tech-list">
                            {safeStringArray(p.stack_suggestion).map((tech, j) => (
                              <span key={j} className="ra-tech-badge">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Improvements */}
            {analysis.resume_improvements && safeStringArray(analysis.resume_improvements).length > 0 && (
              <div className="ra-card">
                <h3 className="ra-card-title">Resume Tips</h3>
                <ul className="ra-list">
                  {safeStringArray(analysis.resume_improvements).map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next 12 Weeks Plan */}
            {analysis.next_12_weeks_plan && Array.isArray(analysis.next_12_weeks_plan) && analysis.next_12_weeks_plan.length > 0 && (
              <div className="ra-card">
                <h3 className="ra-card-title">12-Week Action Plan</h3>
                <div className="ra-timeline">
                  {analysis.next_12_weeks_plan.map((w: any, i: number) => (
                    <div key={i} className="ra-timeline-item">
                      <div className="ra-timeline-period">{safeString(w.weeks, 'Week')}</div>
                      {w.actions && Array.isArray(w.actions) && w.actions.length > 0 && (
                        <ul className="ra-timeline-actions">
                          {w.actions.map((a: any, j: number) => (
                            <li key={j}>{safeString(a)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // UPLOAD FORM VIEW
  return (
    <div className="ra-page">
      <section className="ra-hero">
        <div className="ra-hero-inner ra-hero-inner--single">
          <div className="ra-hero-right">
            <form className="ra-upload-card" onSubmit={handleSubmit}>
              <h1 className="ra-hero-title ra-hero-title--small">
                Upload your resume and let our AI assess your fit.
              </h1>

              <div className="ra-upload-dropzone">
                <input
                  id="ra-file"
                  className="ra-file-input"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                <label className="ra-upload-btn" htmlFor="ra-file">
                  📄 Upload Resume
                </label>

                <div className="ra-drop-hint">Or drag and drop your file</div>
                <div className="ra-file-name">{file ? file.name : 'PDF or DOCX'}</div>
              </div>

              <div className="ra-form-row">
                <label className="ra-label">Student Year</label>
                <select
                  className="ra-control"
                  value={studentYear}
                  onChange={(e) => setStudentYear(e.target.value as StudentYear)}
                >
                  <option value="1st_year">1st year</option>
                  <option value="2nd_year">2nd year</option>
                  <option value="3rd_year">3rd year</option>
                  <option value="4th_year">4th year</option>
                  <option value="5th_year">5th year</option>
                  <option value="fresh_grad">Fresh grad</option>
                </select>
              </div>

              <button
                type="button"
                className="ra-advanced-toggle"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                {showAdvanced ? '− Hide Advanced' : '+ Show Advanced'}
              </button>

              {showAdvanced && (
                <div className="ra-advanced">
                  <div className="ra-form-row">
                    <label className="ra-label">Preferred Track (optional)</label>
                    <select
                      className="ra-control"
                      value={preferredRoadmapId}
                      onChange={(e) => setPreferredRoadmapId(e.target.value as RoadmapId | '')}
                    >
                      <option value="">No preference</option>
                      {roadmapOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ra-form-row">
                    <label className="ra-label">Target Role (optional)</label>
                    <input
                      className="ra-control"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g., Frontend Intern"
                    />
                  </div>

                  <div className="ra-form-row">
                    <label className="ra-label">Target Country (optional)</label>
                    <input
                      className="ra-control"
                      value={targetCountry}
                      onChange={(e) => setTargetCountry(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {error && <div className="ra-error">{error}</div>}

              <button type="submit" className="ra-submit" disabled={loading}>
                {loading ? ' Analyzing...' : ' Analyze Resume'}
              </button>

              <div className="ra-assessment-note">
                No resume yet? Try our{' '}
                <button type="button" className="ra-link" onClick={() => navigate('/')}>
                  Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeAnalysisPage;
