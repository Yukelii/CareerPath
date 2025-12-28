import React from 'react';
import { Settings } from 'lucide-react';
import './AccountSection.css';

export const SettingsSection: React.FC = () => {
  return (
    <div className="account-section">
      <div className="account-section-header">
        <Settings className="account-section-icon" size={24} />
        <h2 className="account-section-title">Settings</h2>
      </div>

      <p className="account-section-text">
        Hard-coded settings content for now.
      </p>
    </div>
  );
};
