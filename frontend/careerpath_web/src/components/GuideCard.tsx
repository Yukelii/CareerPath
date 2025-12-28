import React from 'react';
import './GuideCard.css';
import type { Guide } from '../types/roadmap';

interface GuideCardProps {
  guide: Guide;
  onClick: () => void;
  isCompleted?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onClick, isCompleted = false }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide':
        return '#7a8f79';
      case 'tutorial':
        return '#6b8e7f';
      case 'project':
        return '#5f7a7a';
      case 'website':
        return '#558080';
      default:
        return '#7a8f79';
    }
  };

  return (
    <div className="guide-card" style={{ backgroundColor: getTypeColor(guide.type) }} onClick={onClick}>
      <div className="guide-card-header">
        <h3 className="guide-card-title">{guide.title}</h3>
        <span className="guide-card-type">{guide.type}</span>
      </div>

      <p className="guide-card-description">{guide.description}</p>

      <div className="guide-card-meta">
        <span className="guide-card-duration">{guide.duration}</span>
        <span className={`guide-card-difficulty difficulty-${guide.difficulty}`}>{guide.difficulty}</span>

        {isCompleted && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 12,
              fontWeight: 700,
              background: 'rgba(0,0,0,0.15)',
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            Done
          </span>
        )}
      </div>
    </div>
  );
};

export default GuideCard;
