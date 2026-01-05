import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoadmapSection } from '../components/RoadmapSection';
import { defaultProgressRepository } from '../data/repositories/progressRepository';

// Slug-based career IDs
const CAREERS = [
  { id: 'front-end', title: 'Front-end Developer' },
  { id: 'game-dev', title: 'Game Developer' },
  { id: 'software-architect', title: 'Software Architect' },
  { id: 'back-end', title: 'Back-end Developer' },
  { id: 'ux-design', title: 'UX Designer' },
  { id: 'cyber-security', title: 'Cyber Security' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // store bookmarked roadmap IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [loadingBookmarks, setLoadingBookmarks] = useState(true);

  const bookmarkedMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    bookmarkedIds.forEach((id) => (map[id] = true));
    return map;
  }, [bookmarkedIds]);

  const handleCardClick = (careerId: string) => {
    // must match your router + Header (plural) [file:435][file:455]
    navigate(`/roadmaps/${careerId}`);
  };

  // Load bookmarks from backend on homepage load
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingBookmarks(true);
      try {
        const bookmarks = await defaultProgressRepository.fetchBookmarkedRoadmaps();
        if (cancelled) return;

        const ids = new Set(bookmarks.map((b: any) => b.roadmap_id));
        setBookmarkedIds(ids);
      } catch (err) {
        console.error('Failed to load bookmarks:', err);
        if (!cancelled) setBookmarkedIds(new Set());
      } finally {
        if (!cancelled) setLoadingBookmarks(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleBookmarkToggle = async (careerId: string) => {
    // optimistic UI
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(careerId)) next.delete(careerId);
      else next.add(careerId);
      return next;
    });

    try {
      const isNowBookmarked = await defaultProgressRepository.toggleBookmark(careerId);

      // ensure state matches backend response
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (isNowBookmarked) next.add(careerId);
        else next.delete(careerId);
        return next;
      });
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);

      // revert optimistic change if request failed
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (next.has(careerId)) next.delete(careerId);
        else next.add(careerId);
        return next;
      });
    }
  };

  return (
    <>
      {/* Roadmap cards FIRST */}
      <RoadmapSection
        careers={CAREERS}
        onCardClick={handleCardClick}
        isBookmarkedMap={bookmarkedMap}
        onBookmarkToggle={handleBookmarkToggle}
        bookmarksLoading={loadingBookmarks}
      />

      {/* Guides banner */}
      <section className="home-guides-section">
        <div className="home-guides-container">
          <h2 className="home-guides-title">Guides</h2>
          <p className="home-guides-subtitle">
            Explore guides, tutorials, projects, and websites tailored for your chosen career.
          </p>

          <button className="home-guides-cta-btn" onClick={() => navigate('/guides')}>
            View All Guides →
          </button>
        </div>
      </section>

      {/* Resume Analyzer banner */}
      <section className="home-resume-section">
        <div className="home-resume-container">
          <h2 className="home-resume-title">Resume Analyzer</h2>
          <p className="home-resume-subtitle">
            Upload your resume to get strengths, weaknesses, and a recommended CareerPath track with a 12-week plan.
          </p>

          <button className="home-resume-cta-btn" onClick={() => navigate('/resume-analysis')}>
            Analyze My Resume →
          </button>
        </div>
      </section>
    </>
  );
};
