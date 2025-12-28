import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { RoadmapCanvas } from '../components/RoadmapCanvas';
import { RoadmapPanel } from '../components/RoadmapPanel';
import type { NodeStatus, RoadmapNodeData } from '../types/roadmap';
import { getRoadmapBySlug } from '../data/roadmaps/roadmapRegistry';
import { defaultProgressRepository } from '../data/repositories/progressRepository';
import './RoadmapPage.css';

export const RoadmapPage: React.FC = () => {
  const { roadmapId } = useParams();

  // Get roadmap data from registry (frontend-only)
  const roadmap = roadmapId ? getRoadmapBySlug(roadmapId) : undefined;

  const [selectedNode, setSelectedNode] = useState<RoadmapNodeData | null>(null);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus['status']>>({});
  const [loading, setLoading] = useState(true);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (!roadmapId) return;

    setLoading(true);
    setNodeStatuses({});

    (async () => {
      try {
        const statuses = await defaultProgressRepository.fetchNodeStatuses(roadmapId);
        setNodeStatuses(statuses);
      } catch (error) {
        console.error('Failed to load progress:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [roadmapId]);

  useEffect(() => {
    if (!roadmapId) return;

    (async () => {
      try {
        const isBookmarked = await defaultProgressRepository.checkBookmark(roadmapId);
        setBookmarked(isBookmarked);
      } catch (error) {
        console.error('Failed to check bookmark:', error);
      }
    })();
  }, [roadmapId]);

  const handleNodeClick = (node: RoadmapNodeData) => setSelectedNode(node);

  const handlePanelClose = () => setSelectedNode(null);

  const handleStatusChange = async (nodeId: string, status: NodeStatus['status']) => {
    if (!roadmapId) return;

    try {
      await defaultProgressRepository.updateNodeStatus(roadmapId, nodeId, status);
      setNodeStatuses((prev) => ({ ...prev, [nodeId]: status }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!roadmapId) return;

    setBookmarkLoading(true);
    try {
      const newBookmarked = await defaultProgressRepository.toggleBookmark(roadmapId);
      setBookmarked(newBookmarked);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (!roadmap) return <Navigate to="/" replace />;

  const total = roadmap.nodes.length;
  const done = Object.values(nodeStatuses).filter((s) => s === 'done').length;
  const skipped = Object.values(nodeStatuses).filter((s) => s === 'skip').length;
  const pending = total - done - skipped;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="roadmap-page-wrapper">
      {selectedNode && <div className="roadmap-blur-overlay" onClick={handlePanelClose} />}

      <div className={`roadmap-page-container ${selectedNode ? 'blurred' : ''}`}>
        <div className="roadmap-canvas-wrapper">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading progress…</div>
          ) : (
            <RoadmapCanvas
              title={roadmap.title}
              subtitle={roadmap.subtitle}
              nodes={roadmap.nodes}
              edges={roadmap.edges}
              groups={roadmap.groups}
              canvasTexts={roadmap.canvasTexts}
              nodeStatuses={nodeStatuses}
              done={done}
              total={total}
              pending={pending}
              percent={percent}
              onNodeClick={handleNodeClick}
              bookmarked={bookmarked}
              onBookmarkToggle={handleBookmarkToggle}
              bookmarkLoading={bookmarkLoading}
            />
          )}
        </div>
      </div>

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
