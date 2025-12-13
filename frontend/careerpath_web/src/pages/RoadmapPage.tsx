import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { RoadmapCanvas } from '../components/RoadmapCanvas';
import { RoadmapPanel } from '../components/RoadmapPanel';
import { RoadmapNodeData, NodeStatus } from '../types/gameDevRoadmap';
import './RoadmapPage.css';

export const RoadmapPage: React.FC = () => {
  const { careerId } = useParams();
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeData | null>(null);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus['status']>>({});

  const handleNodeClick = (node: RoadmapNodeData) => {
    setSelectedNode(node);
  };

  const handlePanelClose = () => {
    setSelectedNode(null);
  };

  const handleStatusChange = (nodeId: string, status: NodeStatus['status']) => {
    setNodeStatuses((prev) => ({
      ...prev,
      [nodeId]: status,
    }));
    console.log(`Node ${nodeId} status: ${status}`);
  };

  return (
    <div className="roadmap-page-wrapper">
      <Header userName="Zaidy" userImage="https://via.placeholder.com/40" />
      
      {/* Blur overlay when panel is open */}
      {selectedNode && <div className="roadmap-blur-overlay" onClick={handlePanelClose} />}
      
      <div className={`roadmap-page-container ${selectedNode ? 'blurred' : ''}`}>
        <div className="roadmap-canvas-wrapper">
          <h2 className="roadmap-page-title">Game Developer Roadmap</h2>
          <RoadmapCanvas onNodeClick={handleNodeClick} />
        </div>
      </div>

      {/* Right slide panel */}
      <RoadmapPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={handlePanelClose}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
