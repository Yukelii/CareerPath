import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeAnalysisSection.css';

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

type StoredAnalysisListItem = {
  id: number | string;
  created_at: string;
  filename?: string;
  score_overall?: number;
  analysis: ResumeAnalysis; // full snapshot
};

const cleanBrackets = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\[\d+\]/g, '')
    .replace(/\[resume\]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const safeString = (v: any, fallback = ''): string => {
  const str = typeof v === 'string' ? v : fallback;
  return cleanBrackets(str);
};

const safeStringArray = (v: any, fallback: string[] = []): string[] => {
  if (!Array.isArray(v)) return fallback;
  return v
    .map((x) => cleanBrackets(typeof x === 'string' ? x : ''))
    .filter((x) => x.length > 0);
};

const safeNumber = (v: any, fallback = 0): number => {
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
};

const safeParseDate = (raw: string) => {
  const normalized = raw.includes(' ') ? raw.replace(' ', 'T') : raw;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const ResumeAnalysisSection: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [items, setItems] = useState<StoredAnalysisListItem[]>([]);
  const [selected, setSelected] = useState<StoredAnalysisListItem | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // You will implement this endpoint in backend:
      // returns: [{ id, created_at, filename, score_overall, analysis: {...} }, ...]
      const res = await fetch('/api/resume/analyses?limit=20&offset=0', { credentials: 'include' });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || `Failed: ${res.status}`);

      const list: StoredAnalysisListItem[] = Array.isArray(data) ? data : data?.items || [];
      const sorted = [...list].sort((a, b) => {
        const db = safeParseDate(b.created_at)?.getTime() ?? 0;
        const da = safeParseDate(a.created_at)?.getTime() ?? 0;
        return db - da;
      });

      setItems(sorted);
      setSelected(sorted[0] || null);
    } catch (e: any) {
      setError(String(e?.message || e));
      setItems([]);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const selectedAnalysis = useMemo(() => selected?.analysis ?? null, [selected]);

  return (
    <div className="rah-page">
      <div className="rah-header">
        <h2 className="rah-title">Resume Analysis</h2>
        <div className="rah-actions">
          <button className="rah-btn" onClick={() => navigate('/resume-analysis')}>
            New analysis
          </button>
          <button className="rah-btn rah-btn--ghost" onClick={fetchHistory}>
            Refresh
          </button>
        </div>
      </div>

      {loading ? <div className="rah-muted">Loading resume analyses…</div> : null}
      {error ? <div className="rah-error">{error}</div> : null}

      {!loading && !error && items.length === 0 ? (
        <div className="rah-empty">
          No saved analyses yet.
          <button className="rah-btn" onClick={() => navigate('/resume-analysis')}>
            Run your first analysis
          </button>
        </div>
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <div className="rah-layout">
          {/* LEFT: history list */}
          <aside className="rah-list">
            {items.map((it) => {
              const d = safeParseDate(it.created_at);
              const isActive = String(selected?.id) === String(it.id);

              return (
                <button
                  key={String(it.id)}
                  className={`rah-list-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSelected(it)}
                >
                  <div className="rah-list-top">
                    <div className="rah-list-name">{it.filename || `Analysis #${it.id}`}</div>
                    {typeof it.score_overall === 'number' ? (
                      <div className="rah-list-score">{Math.round(it.score_overall)}%</div>
                    ) : null}
                  </div>
                  <div className="rah-list-date">{d ? d.toLocaleString() : it.created_at}</div>
                </button>
              );
            })}
          </aside>

          {/* RIGHT: analysis detail (reuse your existing UI blocks) */}
          <main className="rah-detail">
            {!selectedAnalysis ? (
              <div className="rah-muted">Select an analysis to view.</div>
            ) : (
              <div className="ra-results-container">
                {selectedAnalysis.summary && (
                  <div className="ra-card ra-card--summary">
                    <h2 className="ra-card-title">Summary</h2>
                    <p className="ra-text">{safeString(selectedAnalysis.summary)}</p>
                  </div>
                )}

                {selectedAnalysis.best_roadmap_id && (
                  <div className="ra-card ra-card--track">
                    <h2 className="ra-card-title">Recommended Track</h2>
                    <div className="ra-track-info">
                      <div className="ra-track-main">
                        <span className="ra-pill-large">
                          {safeString(selectedAnalysis.best_roadmap_id).replace('-', ' ').toUpperCase()}
                        </span>
                        {selectedAnalysis.roadmap_confidence ? (
                          <span className="ra-confidence">
                            {safeNumber(selectedAnalysis.roadmap_confidence)}% Match
                          </span>
                        ) : null}
                      </div>
                      {selectedAnalysis.roadmap_reason ? (
                        <p className="ra-text ra-text--secondary">{safeString(selectedAnalysis.roadmap_reason)}</p>
                      ) : null}
                    </div>

                    <button
                      className="ra-btn-primary"
                      onClick={() => navigate(`/roadmaps/${selectedAnalysis.best_roadmap_id}`)}
                    >
                      Explore Full Roadmap →
                    </button>
                  </div>
                )}

                <div className="ra-grid-2">
                  {selectedAnalysis.strengths && safeStringArray(selectedAnalysis.strengths).length > 0 ? (
                    <div className="ra-card">
                      <h3 className="ra-card-title">Strengths</h3>
                      <ul className="ra-list">
                        {safeStringArray(selectedAnalysis.strengths).map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {selectedAnalysis.weaknesses && safeStringArray(selectedAnalysis.weaknesses).length > 0 ? (
                    <div className="ra-card">
                      <h3 className="ra-card-title">Areas to Improve</h3>
                      <ul className="ra-list">
                        {safeStringArray(selectedAnalysis.weaknesses).map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {selectedAnalysis.recommended_roles?.length ? (
                  <div className="ra-card">
                    <h3 className="ra-card-title">Recommended Roles</h3>
                    <div className="ra-roles-list">
                      {selectedAnalysis.recommended_roles.map((r: any, i: number) => (
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
                ) : null}

                {safeStringArray(selectedAnalysis.skills_gaps).length ? (
                  <div className="ra-card">
                    <h3 className="ra-card-title">Skills to Develop</h3>
                    <div className="ra-skills-grid">
                      {safeStringArray(selectedAnalysis.skills_gaps).map((g, i) => (
                        <div key={i} className="ra-skill-tag">{g}</div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedAnalysis.projects_to_build?.length ? (
                  <div className="ra-card">
                    <h3 className="ra-card-title">Projects to Build</h3>
                    <div className="ra-projects-list">
                      {selectedAnalysis.projects_to_build.map((p: any, i: number) => (
                        <div key={i} className="ra-project-item">
                          <h4 className="ra-project-name">{safeString(p.project, 'Project')}</h4>
                          <p className="ra-project-desc">{safeString(p.what_it_proves)}</p>
                          {safeStringArray(p.stack_suggestion).length ? (
                            <div className="ra-tech-stack">
                              <strong>Stack:</strong>
                              <div className="ra-tech-list">
                                {safeStringArray(p.stack_suggestion).map((tech, j) => (
                                  <span key={j} className="ra-tech-badge">{tech}</span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {safeStringArray(selectedAnalysis.resume_improvements).length ? (
                  <div className="ra-card">
                    <h3 className="ra-card-title">Resume Tips</h3>
                    <ul className="ra-list">
                      {safeStringArray(selectedAnalysis.resume_improvements).map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {selectedAnalysis.next_12_weeks_plan?.length ? (
                  <div className="ra-card">
                    <h3 className="ra-card-title">12-Week Action Plan</h3>
                    <div className="ra-timeline">
                      {selectedAnalysis.next_12_weeks_plan.map((w: any, i: number) => (
                        <div key={i} className="ra-timeline-item">
                          <div className="ra-timeline-period">{safeString(w.weeks, 'Week')}</div>
                          {Array.isArray(w.actions) && w.actions.length ? (
                            <ul className="ra-timeline-actions">
                              {w.actions.map((a: any, j: number) => (
                                <li key={j}>{safeString(a)}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default ResumeAnalysisSection;
