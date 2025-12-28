import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './ProgressSection.css';

import { getRoadmapBySlug } from '../data/roadmaps/roadmapRegistry';

import {
  defaultProgressRepository,
  type BookmarkedRoadmap,
  type ProgressSummaryItem,
} from '../data/repositories/progressRepository';

import defaultGuideRepository from '../data/repositories/guideRepository';

import { guidesDatabase } from '../data/guides/guidesData';

import type { GuideCompletionMap } from '../types/roadmap';

type ProgressDisplay = ProgressSummaryItem & {
  roadmapTitle: string;
  totalNodes: number;
};

type BookmarkDisplay = BookmarkedRoadmap & {
  roadmapTitle: string;
};

type CurrentUser = {
  id: number;
  name: string;
  email: string;
  program?: string;
  section?: string;
};

type GuideProgressDisplay = {
  careerId: string;
  careerLabel: string;
  completed: number;
  total: number;
};

const safeParseDate = (raw: string) => {
  const normalized = raw.includes(' ') ? raw.replace(' ', 'T') : raw;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
};

const careers = [
  { id: 'front-end', label: 'Front-end Developer' },
  { id: 'back-end', label: 'Back-end Developer' },
  { id: 'game-dev', label: 'Game Developer' },
  { id: 'ux-design', label: 'UX Designer' },
  { id: 'cyber-security', label: 'Cyber Security Expert' },
  { id: 'software-architect', label: 'Software Architect' },
];

export const ProgressSection: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [progressList, setProgressList] = useState<ProgressDisplay[]>([]);
  const [bookmarkList, setBookmarkList] = useState<BookmarkDisplay[]>([]);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [guideProgress, setGuideProgress] = useState<GuideProgressDisplay[]>([]);
  const [guideLoading, setGuideLoading] = useState(true);

  const openRoadmap = (roadmapId: string) => navigate(`/roadmap/${roadmapId}`);
  const openGuides = () => navigate('/guides');

  const fetchCurrentUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const res = await fetch('/api/users/me', { credentials: 'include' });
      if (!res.ok) throw new Error(`Failed /api/users/me: ${res.status}`);
      const data: CurrentUser = await res.json();
      setUser(data);
    } catch (e) {
      console.error(e);
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  }, []);

  const computeProgressList = useCallback(async () => {
    setLoading(true);
    try {
      const summary = await defaultProgressRepository.fetchProgressSummary();
      const progressDisplay: ProgressDisplay[] = summary
        .map((item) => {
          const roadmap = getRoadmapBySlug(item.roadmap_id);
          const totalNodes = roadmap?.nodes.length ?? item.total_tracked ?? 0;
          return {
            ...item,
            roadmapTitle: roadmap?.title || item.roadmap_id,
            totalNodes,
          };
        })
        .sort((a, b) => {
          const aPercent =
            a.totalNodes === 0 ? 0 : Math.round((a.done_count / a.totalNodes) * 100);
          const bPercent =
            b.totalNodes === 0 ? 0 : Math.round((b.done_count / b.totalNodes) * 100);
          if (bPercent !== aPercent) return bPercent - aPercent;
          if (b.done_count !== a.done_count) return b.done_count - a.done_count;
          return b.total_tracked - a.total_tracked;
        });
      setProgressList(progressDisplay);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      setProgressList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const computeBookmarkList = useCallback(async () => {
    try {
      const bookmarks = await defaultProgressRepository.fetchBookmarkedRoadmaps();
      const bookmarkDisplay: BookmarkDisplay[] = bookmarks
        .map((item) => {
          const roadmap = getRoadmapBySlug(item.roadmap_id);
          return { ...item, roadmapTitle: roadmap?.title || item.roadmap_id };
        })
        .sort((a, b) => {
          const db = safeParseDate(b.created_at)?.getTime() ?? 0;
          const da = safeParseDate(a.created_at)?.getTime() ?? 0;
          return db - da;
        });
      setBookmarkList(bookmarkDisplay);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      setBookmarkList([]);
    }
  }, []);

  const computeGuideProgress = useCallback(async () => {
    setGuideLoading(true);
    try {
      const completion: GuideCompletionMap = await defaultGuideRepository.loadGuideCompletion();

      // Build guide progress for each career
      const progressDisplay: GuideProgressDisplay[] = careers.map((career) => {
        // Get all guides for this career from guidesDatabase
        const careerGuides = guidesDatabase[career.id] || [];
        const totalGuides = careerGuides.length;

        // Count completed guides by checking which guide IDs are marked as completed
        const completedCount = careerGuides.filter((guide) => {
          return completion[guide.id]?.completed === true;
        }).length;

        return {
          careerId: career.id,
          careerLabel: career.label,
          completed: completedCount,
          total: totalGuides,
        };
      });

      setGuideProgress(progressDisplay);
    } catch (error) {
      console.error('Failed to fetch guide progress:', error);
      setGuideProgress([]);
    } finally {
      setGuideLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    computeProgressList();
    computeBookmarkList();
    computeGuideProgress();
  }, [fetchCurrentUser, computeProgressList, computeBookmarkList, computeGuideProgress]);

  useEffect(() => {
    const onFocus = () => {
      fetchCurrentUser();
      computeProgressList();
      computeBookmarkList();
      computeGuideProgress();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchCurrentUser, computeProgressList, computeBookmarkList, computeGuideProgress]);

  return (
    <div className="progress-section-container">
      <h2 className="progress-section-title">Progress</h2>

      {userLoading ? (
        <div className="progress-user-card">
          <div className="progress-user-avatar">Z</div>
          <div className="progress-user-info">
            <div className="progress-user-name">Loading…</div>
            <div className="progress-user-email"></div>
          </div>
        </div>
      ) : (
        <div className="progress-user-card">
          <div className="progress-user-avatar">{user?.name?.charAt(0).toUpperCase() || '?'}</div>
          <div className="progress-user-info">
            <div className="progress-user-name">{user?.name || 'Unknown user'}</div>
            <div className="progress-user-email">{user?.email || ''}</div>
          </div>
        </div>
      )}

      {loading || guideLoading ? (
        <div style={{ padding: '1rem', color: '#999' }}>Loading progress…</div>
      ) : (
        <>
          {/* TWO-COLUMN LAYOUT: BOOKMARKS (LEFT) + LEARNING MATERIALS (RIGHT) */}
          <div className="progress-top-sections">
            {/* BOOKMARKS SECTION - LEFT */}
            <div className="progress-section-group">
              <h3 className="progress-section-heading">Bookmarks</h3>

              {bookmarkList.length === 0 ? (
                <div className="progress-empty-state">No bookmarks yet.</div>
              ) : (
                <div className="progress-bookmarks-list">
                  {bookmarkList.map((b, idx) => {
                    const d = safeParseDate(b.created_at);
                    return (
                      <div
                        key={idx}
                        className="progress-bookmark-card"
                        onClick={() => openRoadmap(b.roadmap_id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openRoadmap(b.roadmap_id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="progress-bookmark-title">★ {b.roadmapTitle}</div>
                        <div className="progress-bookmark-date">
                          Bookmarked {d ? d.toLocaleDateString() : 'Unknown date'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* LEARNING MATERIALS SECTION - RIGHT */}
            <div className="progress-section-group">
              <h3 className="progress-section-heading">Learning Materials</h3>

              {guideProgress.length === 0 ? (
                <div className="progress-empty-state">
                  No learning progress yet.
                  <button
                    className="progress-empty-action-btn"
                    onClick={openGuides}
                  >
                    Browse Learning Resources
                  </button>
                </div>
              ) : (
                <div className="progress-guides-list">
                  {guideProgress.map((gp, idx) => {
                    const percent = gp.total === 0 ? 0 : Math.round((gp.completed / gp.total) * 100);
                    return (
                      <div
                        key={idx}
                        className="progress-guide-card"
                        onClick={openGuides}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openGuides();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="progress-guide-header">
                          <div className="progress-guide-title">{gp.careerLabel}</div>
                          <div className="progress-guide-percent">{percent}%</div>
                        </div>
                        <div className="progress-guide-bar">
                          <div
                            className="progress-guide-bar-fill"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <div className="progress-guide-stat">
                          {gp.completed} / {gp.total} guides completed
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* YOUR ROADMAPS SECTION - FULL WIDTH BELOW */}
          <div className="progress-section-group">
            <h3 className="progress-section-heading">Your roadmaps</h3>

            {progressList.length === 0 ? (
              <div className="progress-empty-state">
                No progress yet. Start a roadmap and mark nodes to see it here.
                <button
                  className="progress-empty-action-btn"
                  onClick={() => navigate('/')}
                >
                  Browse roadmaps
                </button>
              </div>
            ) : (
              <div className="progress-roadmaps-list">
                {progressList.map((p, idx) => {
                  const percent =
                    p.totalNodes === 0 ? 0 : Math.round((p.done_count / p.totalNodes) * 100);
                  return (
                    <div
                      key={idx}
                      className="progress-roadmap-card"
                      onClick={() => openRoadmap(p.roadmap_id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openRoadmap(p.roadmap_id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="progress-roadmap-header">
                        <div className="progress-roadmap-title">{p.roadmapTitle}</div>
                        <div className="progress-roadmap-percent">{percent}%</div>
                      </div>
                      <div className="progress-roadmap-bar">
                        <div
                          className="progress-roadmap-bar-fill"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="progress-roadmap-stat">
                        {percent}% done {p.done_count} / {p.totalNodes} done
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressSection;
