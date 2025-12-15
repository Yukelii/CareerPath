import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { RoadmapCanvas } from '../components/RoadmapCanvas';
import { RoadmapPanel } from '../components/RoadmapPanel';
import { RoadmapNodeData, NodeStatus } from '../types/roadmap';
import { getRoadmapBySlug } from '../data/roadmaps/roadmapRegistry';
import './RoadmapPage.css';

export const RoadmapPage: React.FC = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();

  // Get roadmap data from registry
  const roadmap = roadmapId ? getRoadmapBySlug(roadmapId) : undefined;

  // Local state
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeData | null>(null);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus['status']>>({});

  // NEW: hydration flag (prevents overwriting saved progress on first render)
  const [hydrated, setHydrated] = useState(false);

  // Load progress from localStorage when roadmapId changes
  useEffect(() => {
    if (!roadmapId) return;

    setHydrated(false);     // important when switching roadmaps
    setNodeStatuses({});    // prevents showing previous roadmap’s statuses briefly

    const storageKey = `careerpath:progress:${roadmapId}`;
    const savedProgress = localStorage.getItem(storageKey);

    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setNodeStatuses(parsed);
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }

    setHydrated(true);
  }, [roadmapId]);

  // Save progress to localStorage whenever it changes (ONLY after hydration)
  useEffect(() => {
    if (!roadmapId) return;
    if (!hydrated) return;

    const storageKey = `careerpath:progress:${roadmapId}`;
    localStorage.setItem(storageKey, JSON.stringify(nodeStatuses));
  }, [nodeStatuses, roadmapId, hydrated]);

  // Handle node click
  const handleNodeClick = (node: RoadmapNodeData) => {
    setSelectedNode(node);
  };

  // Handle panel close
  const handlePanelClose = () => {
    setSelectedNode(null);
  };

  // Handle status change
  const handleStatusChange = (nodeId: string, status: NodeStatus['status']) => {
    setNodeStatuses((prev) => ({
      ...prev,
      [nodeId]: status,
    }));
  };

  // If roadmap slug is invalid, redirect to home
  if (!roadmap) {
    return <Navigate to="/" replace />;
  }

  // Calculate progress
  const total = roadmap.nodes.length;
  const done = Object.values(nodeStatuses).filter((s) => s === 'done').length;
  const skipped = Object.values(nodeStatuses).filter((s) => s === 'skip').length;
  const pending = total - done - skipped;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="roadmap-page-wrapper">
      <Header userName="Zaidy" userImage="https://via.placeholder.com/40" />

      {/* Blur overlay when panel is open */}
      {selectedNode && <div className="roadmap-blur-overlay" onClick={handlePanelClose} />}

      <div className={`roadmap-page-container ${selectedNode ? 'blurred' : ''}`}>
        <div className="roadmap-canvas-wrapper">
          <RoadmapCanvas
            title={roadmap.title}
            subtitle={roadmap.subtitle}
            nodes={roadmap.nodes}
            edges={roadmap.edges}
            nodeStatuses={nodeStatuses}
            done={done}
            total={total}
            pending={pending}
            percent={percent}
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>

      {/* Right slide panel */}
      <RoadmapPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={handlePanelClose}
        currentStatus={selectedNode ? nodeStatuses[selectedNode.id] || 'pending' : 'pending'}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
