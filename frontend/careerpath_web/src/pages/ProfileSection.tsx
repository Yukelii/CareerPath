import React from 'react';
import './ProfileSection.css';

export const ProfileSection: React.FC = () => {
  return (
    <div className="profile-section account-section">
      <h2 className="account-section-heading">Account</h2>

      <div className="account-row">
        <div className="account-row-left account-row-left--avatar">
          <div className="account-avatar-circle">ZC</div>
          <div>
            <div className="account-row-label account-row-label--name">Zaldy Co</div>
            <div className="account-row-value">
              <a className="account-link" href="mailto:zaldy.co@cvsu.edu.ph">
                zaldy.co@cvsu.edu.ph
              </a>
            </div>
          </div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change avatar</button>
        </div>
      </div>

      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Full Name</div>
          <div className="account-row-value">Zaldy Co</div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change full name</button>
        </div>
      </div>

      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Username</div>
          <div className="account-row-value">ykl1</div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change username</button>
        </div>
      </div>

      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Email</div>
          <div className="account-row-value">
            <a className="account-link" href="mailto:zaldy.co@cvsu.edu.ph">
              zaldy.co@cvsu.edu.ph
            </a>
          </div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change email</button>
        </div>
      </div>

      <h3 className="account-subheading">System</h3>

      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">You are signed in as</div>
          <div className="account-row-value">
            <a className="account-link" href="mailto:zaldy.co@cvsu.edu.ph">
              zaldy.co@cvsu.edu.ph
            </a>
          </div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Sign out</button>
        </div>
      </div>

      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Delete Account</div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Learn more</button>
        </div>
      </div>
    </div>
  );
};
