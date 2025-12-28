import React from 'react';
import { CareerCard } from './CareerCard';
import './RoadmapSection.css';

interface Career {
  id: string;
  title: string;
}

interface RoadmapSectionProps {
  careers: Career[];
  onCardClick: (careerId: string) => void;

  // NEW: controlled bookmark state (from HomePage, backed by API)
  isBookmarkedMap?: Record<string, boolean>;
  onBookmarkToggle?: (careerId: string) => void;
  bookmarksLoading?: boolean;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  careers,
  onCardClick,
  isBookmarkedMap = {},
  onBookmarkToggle,
  bookmarksLoading = false,
}) => {
  return (
    <div className="roadmap-page">
      <div className="roadmap-section">
        {/* Divider + Title + Divider */}
        <div className="roadmap-heading">
          <div className="divider-line" />
          <h2 className="roadmap-title">Developer Roadmaps</h2>
          <div className="divider-line" />
        </div>

        {/* Career Cards Grid */}
        <div className="careers-grid">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              id={career.id}
              title={career.title}
              isBookmarked={!!isBookmarkedMap[career.id]}
              onBookmarkToggle={(id) => {
                if (bookmarksLoading) return;
                onBookmarkToggle?.(id);
              }}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
