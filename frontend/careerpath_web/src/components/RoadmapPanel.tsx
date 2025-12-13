import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { RoadmapNodeData, NodeStatus } from '../types/gameDevRoadmap';
import './RoadmapPanel.css';

interface RoadmapPanelProps {
  node: RoadmapNodeData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (nodeId: string, status: NodeStatus['status']) => void;
}

export const RoadmapPanel: React.FC<RoadmapPanelProps> = ({
  node,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<NodeStatus['status']>('pending');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (node) {
      // Reset status when node changes
      setStatus('pending');
    }
  }, [node?.id]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        setStatus('done');
        onStatusChange(node!.id, 'done');
      } else if (e.key === 'l' || e.key === 'L') {
        setStatus('in-progress');
        onStatusChange(node!.id, 'in-progress');
      } else if (e.key === 's' || e.key === 'S') {
        setStatus('skip');
        onStatusChange(node!.id, 'skip');
      } else if (e.key === 'p' || e.key === 'P') {
        setStatus('pending');
        onStatusChange(node!.id, 'pending');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, node, onStatusChange, onClose]);

  if (!node) return null;

  const statusColors: Record<NodeStatus['status'], string> = {
    done: '#22c55e',        // green
    'in-progress': '#f59e0b', // amber
    skip: '#ef4444',        // red
    pending: '#6b7280',     // gray
  };

  return (
    <div className={`roadmap-panel ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="panel-header">
        <h3 className="panel-title">{node.title}</h3>
        <button className="panel-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="panel-content">
        {/* Description */}
        <div className="panel-section">
          <h4 className="panel-section-title">Overview</h4>
          <p className="panel-description">{node.description}</p>
        </div>

        {/* Resources */}
        <div className="panel-section">
          <h4 className="panel-section-title">📚 Free Resources</h4>
          <ul className="panel-resources-list">
            {node.resources.map((resource, idx) => (
              <li key={idx} className="resource-item">
                <span className="resource-type">{resource.type}</span>
                <a href={resource.url || '#'} target="_blank" rel="noopener noreferrer" className="resource-link">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Status Dropdown */}
        <div className="panel-section">
          <h4 className="panel-section-title">Progress Status</h4>
          <div className="status-dropdown-wrapper">
            <button
              className="status-dropdown-btn"
              style={{ borderColor: statusColors[status] }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span
                className="status-badge"
                style={{ backgroundColor: statusColors[status] }}
              />
              <span>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</span>
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="status-dropdown-menu">
                <button
                  className="status-option"
                  onClick={() => {
                    setStatus('done');
                    onStatusChange(node.id, 'done');
                    setDropdownOpen(false);
                  }}
                >
                  ✓ Done (D)
                </button>
                <button
                  className="status-option"
                  onClick={() => {
                    setStatus('in-progress');
                    onStatusChange(node.id, 'in-progress');
                    setDropdownOpen(false);
                  }}
                >
                  ⟳ In Progress (L)
                </button>
                <button
                  className="status-option"
                  onClick={() => {
                    setStatus('skip');
                    onStatusChange(node.id, 'skip');
                    setDropdownOpen(false);
                  }}
                >
                  ✕ Skip (S)
                </button>
                <button
                  className="status-option"
                  onClick={() => {
                    setStatus('pending');
                    onStatusChange(node.id, 'pending');
                    setDropdownOpen(false);
                  }}
                >
                  ⏳ Pending (P)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="panel-footer">
        <small>💡 Press D/L/S/P for quick status, Esc to close</small>
      </div>
    </div>
  );
};
