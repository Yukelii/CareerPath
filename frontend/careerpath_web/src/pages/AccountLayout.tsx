import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Settings, BarChart3 } from 'lucide-react';
import './AccountLayout.css';

export const AccountLayout: React.FC = () => {
  return (
    <div className="account-layout">
      <aside className="account-sidebar">
        <Nav className="flex-column account-nav">
          <Nav.Link
            as={NavLink}
            to="profile"
            className="account-link"
          >
            <span className="account-link-inner">
              <User className="account-link-icon" size={18} />
              <span className="account-link-text">Profile</span>
            </span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="settings"
            className="account-link"
          >
            <span className="account-link-inner">
              <Settings className="account-link-icon" size={18} />
              <span className="account-link-text">Settings</span>
            </span>
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="progress"
            className="account-link"
          >
            <span className="account-link-inner">
              <BarChart3 className="account-link-icon" size={18} />
              <span className="account-link-text">Progress</span>
            </span>
          </Nav.Link>
        </Nav>
      </aside>

      <main className="account-content">
        <Outlet />
      </main>
    </div>
  );
};
