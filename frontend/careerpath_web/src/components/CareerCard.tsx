import React from 'react';
import { Star } from 'lucide-react';
import './CareerCard.css';

interface CareerCardProps {
  id: string;
  title: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  id,
  title,
  isBookmarked = false,
  onBookmarkToggle,
  onClick,
}) => {
  return (
    <div
      className={`career-card ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={() => onClick?.(id)}
    >
      {}
      <button
        className="bookmark-btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle?.(id);
        }}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
      >
        <Star
          size={24}
          fill={isBookmarked ? 'currentColor' : 'none'}
          color={isBookmarked ? '#2d5f6e' : '#666'}
        />
      </button>

      {}
      <div className="career-card-content">
        <h5 className="career-card-title">{title}</h5>
      </div>
    </div>
  );
};
