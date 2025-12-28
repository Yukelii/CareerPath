import React, { useState } from 'react';
import './GuideModal.css';
import { Guide } from '../types/roadmap';

interface GuideModalProps {
  guide: Guide | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleCompletion: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  guide,
  isOpen,
  onClose,
  isCompleted,
  onToggleCompletion,
}) => {
  const [confirmDialog, setConfirmDialog] = useState(false);

  if (!isOpen || !guide) return null;

  const handleGoClick = () => {
    window.open(guide.url, '_blank', 'noopener,noreferrer');
  };

  const handleDoneClick = () => {
    setConfirmDialog(true);
  };

  const handleConfirm = () => {
    onToggleCompletion();
    setConfirmDialog(false);
  };

  const difficultyLabel =
    guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1);

  return (
    <>
      <div className="guide-modal-backdrop" onClick={onClose} />

      <div className="guide-modal" role="dialog" aria-modal="true">
        <div className="guide-modal-header">
          <h2 className="guide-modal-title">{guide.title}</h2>

          <div className="guide-modal-header-right">
            <span className={`guide-modal-type type-${guide.type}`}>{guide.type}</span>
            <button
              className="guide-modal-close"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="guide-modal-description">{guide.description}</p>

        <div className="guide-modal-details">
          <div className="guide-modal-detail-item">
            <span className="guide-modal-detail-label">Duration:</span>
            <span className="guide-modal-detail-value">{guide.duration}</span>
          </div>

          <div className="guide-modal-detail-item">
            <span className="guide-modal-detail-label">Difficulty:</span>
            <span className={`guide-modal-detail-value difficulty-${guide.difficulty}`}>
              {difficultyLabel}
            </span>
          </div>
        </div>

        {guide.tags && guide.tags.length > 0 && (
          <div className="guide-modal-tags">
            {guide.tags.map((tag, idx) => (
              <span key={`${tag}-${idx}`} className="guide-modal-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="guide-modal-actions">
          <button
            className={`guide-modal-btn btn-done ${isCompleted ? 'btn-completed' : ''}`}
            onClick={handleDoneClick}
            type="button"
          >
            {isCompleted ? '✓ Done' : 'Mark As Done'}
          </button>

          <button className="guide-modal-btn btn-go" onClick={handleGoClick} type="button">
            Go →
          </button>
        </div>
      </div>

      {confirmDialog && (
        <>
          <div className="guide-modal-backdrop" onClick={() => setConfirmDialog(false)} />

          <div className="guide-confirmation-dialog" role="dialog" aria-modal="true">
            <h3>Confirm Action</h3>
            <p>{isCompleted ? 'Mark this guide as not done?' : 'Mark this guide as completed?'}</p>

            <div className="guide-confirmation-actions">
              <button
                className="guide-confirmation-btn btn-cancel"
                onClick={() => setConfirmDialog(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="guide-confirmation-btn btn-confirm"
                onClick={handleConfirm}
                type="button"
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
