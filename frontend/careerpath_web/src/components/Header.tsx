import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Menu, User } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'Zaidy', 
  userImage = 'https://via.placeholder.com/40' 
}) => {
  return (
    <Navbar bg="dark" expand="lg" className="header-navbar px-4">
      <Navbar.Brand href="/" className="fw-bold fs-4">
        Career Path
      </Navbar.Brand>
      
      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Search Icon */}
        <button className="btn btn-link text-dark p-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>

        {/* User Greeting and Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle 
            variant="link" 
            className="d-flex align-items-center gap-2 text-dark text-decoration-none p-0"
            id="user-dropdown"
          >
            <span className="fw-500">{userName}</span>
            <img 
              src={userImage} 
              alt="Profile" 
              className="rounded-circle" 
              width="32" 
              height="32"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
            <Dropdown.Item href="#progress">Progress</Dropdown.Item>
            <Dropdown.Item href="#assessment">Assessment</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#logout" className="text-danger">Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};
