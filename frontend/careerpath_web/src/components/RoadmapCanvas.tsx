import React, { useMemo, useState } from 'react';
import { RoadmapNodeData, RoadmapEdgeData, NodeStatus } from '../types/roadmap';
import './RoadmapCanvas.css';

interface RoadmapCanvasProps {
  title: string;
  subtitle: string;
  nodes: RoadmapNodeData[];
  edges: RoadmapEdgeData[];
  nodeStatuses: Record<string, NodeStatus['status']>;
  done: number;
  total: number;
  pending: number;
  percent: number;
  onNodeClick: (node: RoadmapNodeData) => void;

  // NEW (optional): allow taller/smaller canvases per-career if you want
  canvasHeight?: number;

  // NEW (optional): if set, SVG stays inside a scrollable area (prevents super tall pages)
  maxViewportHeight?: number; // e.g. 700
}

type HandlePosition = 'left' | 'right' | 'top' | 'bottom';

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({
  title,
  subtitle,
  nodes,
  edges,
  nodeStatuses,
  done,
  total,
  pending,
  percent,
  onNodeClick,
  canvasHeight: canvasHeightProp,
  maxViewportHeight,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  // CANVAS DIMENSIONS
  const canvasWidth = 1200;

  // match your node size
  const NODE_WIDTH = 150;
  const NODE_HEIGHT = 40;

  // extra space at the bottom so the last node isn't glued to the edge
  const EXTRA_PADDING = 200;

  // Compute required height from your node positions
  const computedCanvasHeight = useMemo(() => {
    if (!nodes?.length) return 600; // fallback if empty
    const maxY = Math.max(...nodes.map((n) => n.position.y));
    return maxY + NODE_HEIGHT + EXTRA_PADDING;
  }, [nodes]);

  // Use override if provided; otherwise use computed height
  const canvasHeight = canvasHeightProp ?? computedCanvasHeight;

  // ----- NEW: helpers for angled edges -----
  const getAnchorPoint = (node: RoadmapNodeData, pos: HandlePosition) => {
    const { x, y } = node.position;
    switch (pos) {
      case 'left':
        return { x: x, y: y + NODE_HEIGHT / 2 };
      case 'right':
        return { x: x + NODE_WIDTH, y: y + NODE_HEIGHT / 2 };
      case 'top':
        return { x: x + NODE_WIDTH / 2, y: y };
      case 'bottom':
      default:
        return { x: x + NODE_WIDTH / 2, y: y + NODE_HEIGHT };
    }
  };

  // Decide which side to connect to if node.sourcePosition/targetPosition is not provided.
  const autoPort = (from: RoadmapNodeData, to: RoadmapNodeData): HandlePosition => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;

    // If more horizontal separation: connect left/right; else connect top/bottom
    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx >= 0 ? 'right' : 'left';
    }
    return dy >= 0 ? 'bottom' : 'top';
  };

  // Render edges (NOW: path instead of line)
  const renderEdges = () => {
    return edges.map((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      // If you added these optional fields in your RoadmapNodeData, they’ll be used.
      // Otherwise it falls back to auto selection.
      const sourcePos = (sourceNode as any).sourcePosition as HandlePosition | undefined;
      const targetPos = (targetNode as any).targetPosition as HandlePosition | undefined;

      const sPort: HandlePosition = sourcePos ?? autoPort(sourceNode, targetNode);
      const tPort: HandlePosition = targetPos ?? autoPort(targetNode, sourceNode);

      const a = getAnchorPoint(sourceNode, sPort);
      const b = getAnchorPoint(targetNode, tPort);

      // If you extended RoadmapEdgeData with edge.type, this will respect it.
      // Default is "elbow" so you get angled lines like your reference.
      const edgeType = (edge as any).type as ('straight' | 'elbow') | undefined;

      if (edgeType === 'straight') {
        const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
        return (
          <path
            key={edge.id}
            d={d}
            fill="none"
            stroke="rgba(0, 0, 0, 0.4)"
            strokeWidth="2"
            className="roadmap-edge"
          />
        );
      }

      // Elbow path: go horizontally to a midX, then vertically, then horizontally into target.
      const midX = (a.x + b.x) / 2;
      const d = `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`;

      return (
        <path
          key={edge.id}
          d={d}
          fill="none"
          stroke="rgba(0, 0, 0, 0.4)"
          strokeWidth="2"
          className="roadmap-edge"
        />
      );
    });
  };

  // Render nodes
  const renderNodes = () => {
    return nodes.map((node) => (
      <g key={node.id}>
        <rect
          x={node.position.x}
          y={node.position.y}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
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
          x={node.position.x + NODE_WIDTH / 2}
          y={node.position.y + NODE_HEIGHT / 2 + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="roadmap-node-text"
          // Keep pointerEvents none so rect handles click/hover
          style={{ cursor: 'pointer', pointerEvents: 'none' }}
        >
          {node.title}
        </text>

        {/* Optional: tiny status dot (uses your nodeStatuses but does not change behavior) */}
        {nodeStatuses?.[node.id] && (
          <circle
            cx={node.position.x + NODE_WIDTH - 10}
            cy={node.position.y + 10}
            r={4}
            fill={
              nodeStatuses[node.id] === 'done'
                ? '#2e7d32'
                : nodeStatuses[node.id] === 'in-progress'
                  ? '#f9a825'
                  : nodeStatuses[node.id] === 'skip'
                    ? '#757575'
                    : '#bdbdbd'
            }
            opacity={0.9}
          />
        )}
      </g>
    ));
  };

  const svg = (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      className="roadmap-canvas"
      style={{ border: '1px solid #ccc', background: '#f9f9f9' }}
    >
      {renderEdges()}
      {renderNodes()}
    </svg>
  );

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e9e9e9',
          borderRadius: 10,
          padding: '16px 18px',
          marginBottom: 12,
        }}
      >
        {/* Top row: breadcrumb + bookmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: '#7a7a7a' }}>All Roadmaps</div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>{title}</div>
            <div style={{ fontSize: 13, color: '#777', marginTop: 6 }}>{subtitle}</div>
          </div>

          <button
            onClick={() => setBookmarked((b) => !b)}
            aria-label="Bookmark roadmap"
            title="Bookmark roadmap"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid #e5e5e5',
              background: '#fff',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            {bookmarked ? '★' : '☆'}
          </button>
        </div>

        {/* Bottom row: progress + track progress */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 6,
                background: '#fff2a8',
                color: '#6c5600',
              }}
            >
              {percent}% DONE
            </span>

            <span style={{ fontSize: 13, color: '#4f4f4f' }}>
              {done} of {total} Done
            </span>

            <span style={{ fontSize: 13, color: '#888' }}>· {pending} Pending</span>
          </div>

          <button
            style={{
              fontSize: 12,
              color: '#6a6a6a',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Track Progress
          </button>
        </div>
      </div>

      {/* SVG CANVAS */}
      {maxViewportHeight ? (
        <div style={{ maxHeight: maxViewportHeight, overflowY: 'auto', overflowX: 'auto' }}>
          {svg}
        </div>
      ) : (
        svg
      )}
    </div>
  );
};
