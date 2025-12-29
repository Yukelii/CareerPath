import React, { useEffect, useState } from 'react';
import './ProfileSection.css';

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  program?: string;
  section?: string;
}

export const ProfileSection: React.FC = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user from backend on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/users/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          setError('Failed to fetch user data');
          setUser(null);
          return;
        }

        const data: CurrentUser = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('An error occurred while loading your profile');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Get user avatar initials
  const getAvatarInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="profile-section account-section">
        <h2 className="account-section-heading">Account</h2>
        <p style={{ color: '#9ca3af' }}>Loading your profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-section account-section">
        <h2 className="account-section-heading">Account</h2>
        <p style={{ color: '#ef4444' }}>{error || 'Unable to load profile'}</p>
      </div>
    );
  }

  return (
    <div className="profile-section account-section">
      <h2 className="account-section-heading">Account</h2>

      {/* Avatar and Name Section */}
      <div className="account-row">
        <div className="account-row-left account-row-left--avatar">
          <div className="account-avatar-circle">
            {getAvatarInitials(user.name)}
          </div>
          <div>
            <div className="account-row-label account-row-label--name">
              {user.name}
            </div>
            <div className="account-row-value">
              <a className="account-link" href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </div>
          </div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change avatar</button>
        </div>
      </div>

      {/* Full Name */}
      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Full Name</div>
          <div className="account-row-value">{user.name}</div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Change full name</button>
        </div>
      </div>

      {/* Program */}
      {user.program && (
        <div className="account-row">
          <div className="account-row-left">
            <div className="account-row-label">Program</div>
            <div className="account-row-value">{user.program}</div>
          </div>
          <div className="account-row-right">
          </div>
        </div>
      )}

      {/* Section */}
      {user.section && (
        <div className="account-row">
          <div className="account-row-left">
            <div className="account-row-label">Section</div>
            <div className="account-row-value">{user.section}</div>
          </div>
          <div className="account-row-right">
            
          </div>
        </div>
      )}

      {/* Email */}
      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">Email</div>
          <div className="account-row-value">
            <a className="account-link" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
        </div>
        <div className="account-row-right">
        </div>
      </div>

      <h3 className="account-subheading">System</h3>

      {/* You are signed in as */}
      <div className="account-row">
        <div className="account-row-left">
          <div className="account-row-label">You are signed in as</div>
          <div className="account-row-value">
            <a className="account-link" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
        </div>
        <div className="account-row-right">
          <button className="account-row-button">Sign out</button>
        </div>
      </div>

      {/* Delete Account */}
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