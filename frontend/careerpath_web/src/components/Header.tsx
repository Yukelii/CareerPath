import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import {
  searchRoadmapsByNodeTitle,
  RoadmapSearchHit,
} from '../data/roadmaps/searchRoadmaps';

interface HeaderProps {
  userName?: string;
  userImage?: string;
}

interface SearchSuggestion {
  label: string;      // "Figma / UX Design"
  roadmapId: string;  // "ux-design"
  nodeId: string;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Zaidy',
  userImage = 'https://via.placeholder.com/40',
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Recompute suggestions when user types
  useEffect(() => {
    const q = searchValue.trim();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const hits: RoadmapSearchHit[] = searchRoadmapsByNodeTitle(q);

    const next: SearchSuggestion[] = [];
    hits.forEach((hit) => {
      hit.matchingNodes.forEach((node) => {
        next.push({
          label: `${node.title} / ${hit.roadmap.title}`,
          roadmapId: hit.roadmap.id,
          nodeId: node.id,
        });
      });
    });

    setSuggestions(next);
    setShowSuggestions(true);
  }, [searchValue]);

  const handleSearchIconClick = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
  };

  const handleSuggestionClick = (s: SearchSuggestion) => {
    navigate(`/roadmap/${s.roadmapId}`);
    setShowSuggestions(false);
  };

  const goToAccount = (section: 'profile' | 'settings' | 'progress') => {
    navigate(`/account/${section}`);
  };

  return (
    <Navbar bg="dark" expand="lg" className="header-navbar px-4">
      <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
        Career Path
      </Navbar.Brand>

      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Compact search area – fixed width so header does not stretch */}
        <div className="header-search-shell">
          {searchOpen && (
            <div className="header-search-panel">
              <InputGroup className="header-search-input-group">
                <Form.Control
                  ref={inputRef}
                  size="sm"
                  placeholder="Search node or topic..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => suggestions.length && setShowSuggestions(true)}
                />
              </InputGroup>

              {showSuggestions && (
                <div className="header-search-dropdown">
                  <div className="header-search-current">
                    {searchValue || '\u00A0'}
                  </div>

                  <ul className="header-search-list">
                    {suggestions.length === 0 && searchValue.trim() && (
                      <li className="header-search-item header-search-empty">
                        No nodes found.
                      </li>
                    )}

                    {suggestions.map((sugg) => (
                      <li
                        key={`${sugg.roadmapId}-${sugg.nodeId}`}
                        className="header-search-item"
                        onClick={() => handleSuggestionClick(sugg)}
                      >
                        {sugg.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Search Icon */}
          <button
            type="button"
            className="btn btn-link text-light p-0"
            aria-label="Search"
            onClick={handleSearchIconClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* User menu */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="d-flex align-items-center gap-2 text-light text-decoration-none p-0"
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
            <Dropdown.Item onClick={() => goToAccount('profile')}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => goToAccount('settings')}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => goToAccount('progress')}>
              Progress
            </Dropdown.Item>
            <Dropdown.Item href="#assessment">Assessment</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#logout" className="text-danger">
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};
