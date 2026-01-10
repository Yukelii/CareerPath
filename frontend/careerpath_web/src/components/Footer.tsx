import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="cp-footer">
      <div className="cp-footer-inner">
        <div className="cp-footer-grid">
          {/* Brand / short description */}
          <div className="cp-footer-col">
            <div className="cp-footer-brand" onClick={() => navigate('/')}>
              CareerPath
            </div>
            <p className="cp-footer-desc">
              A student-built roadmap platform that helps learners explore roles, track progress,
              and discover curated resources faster.
            </p>

            <div className="cp-footer-tags">
              <span className="cp-footer-tag">Roadmaps</span>
              <span className="cp-footer-tag">Guides</span>
              <span className="cp-footer-tag">Resume Analyzer</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="cp-footer-col">
            <div className="cp-footer-heading">Quick links</div>
            <button className="cp-footer-link" onClick={() => navigate('/roadmaps')}>
              Browse Roadmaps
            </button>
            <button className="cp-footer-link" onClick={() => navigate('/guides')}>
              Guides
            </button>
            <button className="cp-footer-link" onClick={() => navigate('/resume-analysis')}>
              Resume Analyzer
            </button>
          </div>

          {/* Developed by */}
          <div className="cp-footer-col">
            <div className="cp-footer-heading">Developed by</div>
            <ul className="cp-footer-list">
              <li>Adrian Neil Bagnas</li>
              <li>Vash Myk Flordeliz</li>
              <li>Luyhien Chauncey Sidlacan</li>
            </ul>

            <div className="cp-footer-mini">
              Built with care, iteration, and lots of debugging.
            </div>
          </div>
        </div>

        <div className="cp-footer-bottom">
          <div className="cp-footer-copy">© {year} CareerPath. All rights reserved.</div>
          <div className="cp-footer-bottom-links">
            <span className="cp-footer-bottom-pill" role="note">
              CVSU • Computer Science
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
