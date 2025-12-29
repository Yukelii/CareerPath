import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { searchRoadmapsByNodeTitle, RoadmapSearchHit } from '../data/roadmaps/searchRoadmaps';

interface SearchSuggestion {
  label: string;
  roadmapId: string;
  nodeId: string;
}

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  program?: string;
  section?: string;
}

export const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCurrentUser = useCallback(async () => {
    const controller = new AbortController();

    try {
      setUserLoading(true);

      // If you use CRA proxy, this relative URL is correct.
      const res = await fetch('/api/users/me', {
        credentials: 'include',
        signal: controller.signal,
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data: CurrentUser = await res.json();
      setUser(data);
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name !== 'AbortError') {
        console.error('Error fetching user:', err);
      }
      setUser(null);
    } finally {
      setUserLoading(false);
    }

    return () => controller.abort();
  }, []);

  // 1) Re-fetch user whenever route changes (login/logout navigations update Header immediately)
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser, location.key]);

  // 2) Re-fetch when tab/window becomes active (helps when cookie changes)
  useEffect(() => {
    const onFocus = () => fetchCurrentUser();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchCurrentUser]);

  // 3) Optional: allow other pages to force-refresh Header after login/logout
  useEffect(() => {
    const onAuthChanged = () => fetchCurrentUser();
    window.addEventListener('auth-changed', onAuthChanged);
    return () => window.removeEventListener('auth-changed', onAuthChanged);
  }, [fetchCurrentUser]);

  // Suggestions recompute
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
          label: `${node.title} (${hit.roadmap.title})`,
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
    }
  };

  const handleSuggestionClick = (s: SearchSuggestion) => {
    navigate(`/roadmaps/${s.roadmapId}`);
    setShowSuggestions(false);
  };

  const goToAccount = (section: string) => {
    navigate(`/account/${section}`);
  };

  const handleLogoutClick = () => {
    // Instantly update UI (no waiting)
    setUser(null);
    setUserLoading(false);
    navigate('/logout');
  };

  return (
    <Navbar bg="dark" expand="xxl" className="header-navbar px-5">
      <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
        Career Path
      </Navbar.Brand>

      <div className="ms-auto d-flex align-items-center gap-3">
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
                  <div className="header-search-current">{searchValue}</div>
                  <ul className="header-search-list">
                    {suggestions.length === 0 && searchValue.trim() ? (
                      <li className="header-search-item header-search-empty">
                        No nodes found.
                      </li>
                    ) : (
                      suggestions.map((sugg) => (
                        <li
                          key={`${sugg.roadmapId}-${sugg.nodeId}`}
                          className="header-search-item"
                          onClick={() => handleSuggestionClick(sugg)}
                        >
                          {sugg.label}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

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
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {userLoading ? (
          <span className="text-light">Loading...</span>
        ) : user ? (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center gap-2 text-light text-decoration-none p-0"
              id="user-dropdown"
            >
              <span className="fw-5">{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => goToAccount('profile')}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => goToAccount('settings')}>Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => goToAccount('progress')}>Progress</Dropdown.Item>
              <Dropdown.Item href="/assessment">Assessment</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogoutClick} className="text-danger">
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <button onClick={() => navigate('/login')} className="button">
            Log in
          </button>
        )}
      </div>
    </Navbar>
  );
};
