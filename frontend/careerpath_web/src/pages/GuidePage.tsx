import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuidePage.css';

import {GuideCard} from '../components/GuideCard';
import {GuideModal} from '../components/GuideModal';

import { getGuidesByCareer } from '../data/guides/guidesData';
import defaultGuideRepository from '../data/repositories/guideRepository';

import type { Guide, GuideCompletionMap } from '../types/roadmap';

export const GuidePage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCareer, setSelectedCareer] = useState<string>('front-end');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const [guideCompletion, setGuideCompletion] = useState<GuideCompletionMap>({});
  const [loading, setLoading] = useState(true);

  const careers = [
    { id: 'front-end', label: 'Front-end Developer' },
    { id: 'back-end', label: 'Back-end Developer' },
    { id: 'game-dev', label: 'Game Developer' },
    { id: 'ux-design', label: 'UX Designer' },
    { id: 'cyber-security', label: 'Cyber Security Expert' },
    { id: 'software-architect', label: 'Software Architect' },
  ];

  const guides = useMemo(() => getGuidesByCareer(selectedCareer), [selectedCareer]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const map = await defaultGuideRepository.loadGuideCompletion();
        if (!cancelled) setGuideCompletion(map);
      } catch (e) {
        console.error('Failed to load guide completion:', e);
        if (!cancelled) setGuideCompletion({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleGuideSelect = (guide: Guide) => setSelectedGuide(guide);

  const isGuideCompleted = (guideId: string) => guideCompletion[guideId]?.completed ?? false;

  const handleToggleCompletion = async () => {
    if (!selectedGuide) return;

    try {
      const nextCompleted = !isGuideCompleted(selectedGuide.id);
      const updated = await defaultGuideRepository.setGuideCompletion(selectedGuide.id, nextCompleted);
      setGuideCompletion(updated);
    } catch (e) {
      console.error('Failed to update guide completion:', e);
    }
  };

  return (
    <div className="guide-page">
      <div className="guide-page-header">
        <button className="guide-page-back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>

        <div>
          <h1 className="guide-page-title">Learning Resources</h1>
          <p className="guide-page-subtitle">
            Guides, tutorials, projects, and websites to develop your skills
          </p>
        </div>
      </div>

      <div className="guide-page-career-selector">
        <div className="guide-page-careers-grid">
          {careers.map((career) => (
            <button
              key={career.id}
              className={`guide-page-career-btn ${selectedCareer === career.id ? 'active' : ''}`}
              onClick={() => setSelectedCareer(career.id)}
            >
              {career.label}
            </button>
          ))}
        </div>
      </div>

      <div className="guide-page-content">
        {loading ? (
          <div style={{ padding: 16 }}>Loading guides progress...</div>
        ) : (
          <div className="guide-page-guides-grid">
            {guides.map((guide) => (
              <div key={guide.id} className="guide-page-guide-item">
                <GuideCard guide={guide} onClick={() => handleGuideSelect(guide)} isCompleted={isGuideCompleted(guide.id)} />
                {isGuideCompleted(guide.id) && <div className="guide-page-completed-badge" />}
              </div>
            ))}
          </div>
        )}
      </div>

      <GuideModal
        guide={selectedGuide}
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        isCompleted={selectedGuide ? isGuideCompleted(selectedGuide.id) : false}
        onToggleCompletion={handleToggleCompletion}
      />
    </div>
  );
};

export default GuidePage;
