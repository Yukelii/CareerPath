import React, { useState } from 'react';
import { gameDevNodes, gameDevEdges } from '../data/gameDevRoadmapData';
import { RoadmapNodeData } from '../types/gameDevRoadmap';
import './RoadmapCanvas.css';

interface RoadmapCanvasProps {
  onNodeClick: (node: RoadmapNodeData) => void;
}

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({ onNodeClick }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // CANVAS DIMENSIONS - CUSTOMIZE HERE
  const canvasWidth = 1200;
  const canvasHeight = 1000;

  // Calculate SVG line paths
  const renderEdges = () => {
    return gameDevEdges.map((edge) => {
      const sourceNode = gameDevNodes.find((n) => n.id === edge.source);
      const targetNode = gameDevNodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      // EDGE STYLING - CUSTOMIZE HERE
      return (
        <line
          key={edge.id}
          x1={sourceNode.position.x + 75}
          y1={sourceNode.position.y + 40}
          x2={targetNode.position.x + 75}
          y2={targetNode.position.y}
          stroke="rgba(200, 200, 200, 0.4)"
          strokeWidth="2"
          className="roadmap-edge"
        />
      );
    });
  };

  // Render nodes as clickable boxes
  const renderNodes = () => {
    return gameDevNodes.map((node) => (
      <g key={node.id}>
        <rect
          x={node.position.x}
          y={node.position.y}
          width="150"
          height="40"
          rx="8"
          fill={node.color}
          stroke={hoveredNode === node.id ? '#333' : 'rgba(0,0,0,0.1)'}
          strokeWidth={hoveredNode === node.id ? '2' : '1'}
          className="roadmap-node"
          onClick={() => onNodeClick(node)}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer' }}
        />
        <text
          x={node.position.x + 75}
          y={node.position.y + 22}
          textAnchor="middle"
          dominantBaseline="middle"
          className="roadmap-node-text"
          onClick={() => onNodeClick(node)}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer', pointerEvents: 'none' }}
        >
          {node.title}
        </text>
      </g>
    ));
  };

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      className="roadmap-canvas"
      style={{ border: '1px solid #ccc', background: '#f9f9f9' }}
    >
      {/* Render edges first (so they appear behind nodes) */}
      {renderEdges()}
      
      {/* Render nodes on top */}
      {renderNodes()}
    </svg>
  );
};
