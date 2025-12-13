import React, { useState } from 'react';
import { CareerCard } from './CareerCard';
import './RoadmapSection.css';

interface Career {
  id: string;
  title: string;
}

interface RoadmapSectionProps {
  careers: Career[];
  onCardClick: (careerId: string) => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  careers,
  onCardClick,
}) => {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const handleBookmarkToggle = (id: string) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarked(newBookmarked);
  };

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
              isBookmarked={bookmarked.has(career.id)}
              onBookmarkToggle={handleBookmarkToggle}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
