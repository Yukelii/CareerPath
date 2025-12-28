import React, { useMemo, useState } from 'react';
import {
  RoadmapNodeData,
  RoadmapEdgeData,
  NodeStatus,
  RoadmapGroupData,
  CanvasTextData,
} from '../types/roadmap';
import './RoadmapCanvas.css';

interface RoadmapCanvasProps {
  title: string;
  subtitle?: string;
  nodes: RoadmapNodeData[];
  edges: RoadmapEdgeData[];
  groups?: RoadmapGroupData[];
  canvasTexts?: CanvasTextData[];
  nodeStatuses?: Record<string, NodeStatus['status']>;
  done?: number;
  total?: number;
  pending?: number;
  percent?: number;
  onNodeClick?: (node: RoadmapNodeData) => void;
  canvasHeight?: number;
  maxViewportHeight?: number;
  bookmarked?: boolean;
  onBookmarkToggle?: () => void;
  bookmarkLoading?: boolean;
}

type HandlePosition = 'left' | 'right' | 'top' | 'bottom';

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({
  title,
  subtitle = '',
  nodes,
  edges,
  groups = [],
  canvasTexts = [],
  nodeStatuses = {},
  done = 0,
  total = 0,
  pending = 0,
  percent = 0,
  onNodeClick = () => {},
  canvasHeight: canvasHeightProp,
  maxViewportHeight,
  bookmarked = false,
  onBookmarkToggle = () => {},
  bookmarkLoading = false,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const canvasWidth = 1200;
  const EXTRA_PADDING = 200;

  const NODE_SIZES = {
    sm: { w: 110, h: 30 },
    md: { w: 150, h: 40 },
    lg: { w: 190, h: 52 },
  } as const;

  const getNodeSize = (node: RoadmapNodeData) => {
    const key = node.size ?? 'md';
    return NODE_SIZES[key];
  };

  const computedCanvasHeight = useMemo(() => {
    if (!nodes?.length) return 600;
    const maxBottom = Math.max(...nodes.map((n) => n.position.y + getNodeSize(n).h));
    return maxBottom + EXTRA_PADDING;
  }, [nodes]);

  const canvasHeight = canvasHeightProp ?? computedCanvasHeight;

  const sortedNodes = useMemo(() => {
    // Deterministic “first”: top-to-bottom then left-to-right
    return [...nodes].sort((a, b) => {
      const dy = a.position.y - b.position.y;
      if (dy !== 0) return dy;
      const dx = a.position.x - b.position.x;
      if (dx !== 0) return dx;
      return a.id.localeCompare(b.id);
    });
  }, [nodes]);

  const getAnchorPoint = (node: RoadmapNodeData, pos: HandlePosition) => {
    const { x, y } = node.position;
    const { w, h } = getNodeSize(node);

    switch (pos) {
      case 'left':
        return { x, y: y + h / 2 };
      case 'right':
        return { x: x + w, y: y + h / 2 };
      case 'top':
        return { x: x + w / 2, y };
      case 'bottom':
      default:
        return { x: x + w / 2, y: y + h };
    }
  };

  const autoPort = (from: RoadmapNodeData, to: RoadmapNodeData): HandlePosition => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 'right' : 'left';
    return dy >= 0 ? 'bottom' : 'top';
  };

  const renderGroups = () =>
    groups.map((g) => {
      const rx = g.rx ?? 10;
      const stroke = g.stroke ?? '#000';
      const strokeWidth = g.strokeWidth ?? 1;

      const fillRaw = g.fill ?? 'transparent';
      const fill = fillRaw === 'solid' ? 'rgba(0,0,0,0.035)' : fillRaw;

      const title = g.title?.trim();
      const titleFontSize = g.titleFontSize ?? 14;
      const titleColor = g.titleColor ?? '#333';
      const titlePosition = g.titlePosition ?? 'top';
      const titleAlign = g.titleAlign ?? 'middle';

      if (g.bounds) {
        const { x, y, width, height } = g.bounds;

        const titleX =
          titleAlign === 'start'
            ? x + 10
            : titleAlign === 'end'
            ? x + width - 10
            : x + width / 2;

        const titleY =
          titlePosition === 'bottom'
            ? y + height - (titleFontSize / 2 + 8)
            : y + titleFontSize / 2 + 8;

        return (
          <g key={g.id} style={{ pointerEvents: 'none' }}>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={rx}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            {title && (
              <text
                x={titleX}
                y={titleY}
                fontSize={titleFontSize}
                fontWeight={700}
                fill={titleColor}
                textAnchor={titleAlign}
                dominantBaseline="middle"
              >
                {title}
              </text>
            )}
          </g>
        );
      }

      const groupNodes = g.nodeIds
        .map((id) => nodes.find((n) => n.id === id))
        .filter(Boolean) as RoadmapNodeData[];

      if (!groupNodes.length) return null;

      const pad = g.padding ?? 12;

      const minX = Math.min(...groupNodes.map((n) => n.position.x));
      const minY = Math.min(...groupNodes.map((n) => n.position.y));
      const maxX = Math.max(...groupNodes.map((n) => n.position.x + getNodeSize(n).w));
      const maxY = Math.max(...groupNodes.map((n) => n.position.y + getNodeSize(n).h));

      const x = minX - pad;
      const y = minY - pad;
      const width = maxX - minX + pad * 2;
      const height = maxY - minY + pad * 2;

      const titleX =
        titleAlign === 'start'
          ? x + 10
          : titleAlign === 'end'
          ? x + width - 10
          : x + width / 2;

      const titleY =
        titlePosition === 'bottom'
          ? y + height - (titleFontSize / 2 + 8)
          : y + titleFontSize / 2 + 8;

      return (
        <g key={g.id} style={{ pointerEvents: 'none' }}>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={rx}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          {title && (
            <text
              x={titleX}
              y={titleY}
              fontSize={titleFontSize}
              fontWeight={700}
              fill={titleColor}
              textAnchor={titleAlign}
              dominantBaseline="middle"
            >
              {title}
            </text>
          )}
        </g>
      );
    });

  const renderCanvasTexts = () =>
    canvasTexts.map((t) => (
      <text
        key={t.id}
        x={t.position.x}
        y={t.position.y}
        fontSize={t.fontSize ?? 12}
        fontWeight={t.fontWeight ?? 400}
        fill={t.color ?? '#333'}
        textAnchor={t.textAnchor ?? 'start'}
        style={{ pointerEvents: 'none' }}
      >
        {t.text}
      </text>
    ));

  const renderEdges = () =>
    edges.map((edge, idx) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return null;

      const sPort =
        edge.sourcePosition ?? sourceNode.sourcePosition ?? autoPort(sourceNode, targetNode);

      const tPort =
        edge.targetPosition ?? targetNode.targetPosition ?? autoPort(targetNode, sourceNode);

      const a = getAnchorPoint(sourceNode, sPort);
      const b = getAnchorPoint(targetNode, tPort);

      const edgeType = edge.type as 'straight' | 'elbow' | undefined;

      const edgeKey = `${edge.id}-${edge.source}-${edge.target}-${idx}`;

      if (edgeType === 'straight') {
        return (
          <path
            key={edgeKey}
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            fill="none"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth={2}
            className="roadmap-edge"
            style={{ pointerEvents: 'none' }}
          />
        );
      }

      const midX = (a.x + b.x) / 2;
      return (
        <path
          key={edgeKey}
          d={`M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`}
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth={2}
          className="roadmap-edge"
          style={{ pointerEvents: 'none' }}
        />
      );
    });

  const renderNodes = () =>
    nodes.map((node) => {
      const { w, h } = getNodeSize(node);

      return (
        <g key={node.id}>
          <rect
            x={node.position.x}
            y={node.position.y}
            width={w}
            height={h}
            rx={8}
            fill={node.color}
            stroke={hoveredNode === node.id ? '#333' : 'rgba(0,0,0,0.1)'}
            strokeWidth={hoveredNode === node.id ? 2 : 1}
            className="roadmap-node"
            onClick={() => onNodeClick(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}
          />

          <foreignObject
            x={node.position.x + 3}
            y={node.position.y + 3}
            width={w - 6}
            height={h - 6}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 12,
                wordWrap: 'break-word',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {node.title}
            </div>
          </foreignObject>

          {nodeStatuses[node.id] && (
            <circle
              cx={node.position.x + w - 10}
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
              style={{ pointerEvents: 'none' }}
            />
          )}
        </g>
      );
    });

  const handleBookmarkToggle = async () => {
    onBookmarkToggle();
  };

  const handleTrackProgress = () => {
    if (!sortedNodes.length) return;

    // unfinished = not done and not skip; undefined counts as unfinished
    const firstUnfinished =
      sortedNodes.find((n) => {
        const s = nodeStatuses[n.id]; // may be undefined
        return s !== 'done' && s !== 'skip';
      }) ?? sortedNodes[0];

    onNodeClick(firstUnfinished);
  };

  const svg = (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      className="roadmap-canvas"
      style={{ border: '1px solid #ccc', background: '#f9f9f9' }}
    >
      <text
        x={canvasWidth / 2}
        y={40}
        textAnchor="middle"
        fontSize={24}
        fontWeight="bold"
        fill="#333"
      >
        {title}
      </text>

      {renderGroups()}
      {renderEdges()}
      {renderNodes()}
      {renderCanvasTexts()}
    </svg>
  );

  return (
    <div>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e9e9e9',
          borderRadius: 10,
          padding: '16px 18px',
          marginBottom: 12,
        }}
      >
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
            {subtitle && (
              <div style={{ fontSize: 13, color: '#777', marginTop: 6 }}>{subtitle}</div>
            )}
          </div>

          <button
            onClick={handleBookmarkToggle}
            disabled={bookmarkLoading}
            aria-label="Bookmark roadmap"
            title={bookmarked ? 'Remove bookmark' : 'Bookmark roadmap'}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: bookmarked ? '1px solid #f9a825' : '1px solid #e5e5e5',
              background: bookmarked ? 'rgba(249, 168, 37, 0.1)' : '#fff',
              cursor: bookmarkLoading ? 'not-allowed' : 'pointer',
              display: 'grid',
              placeItems: 'center',
              fontSize: 18,
              lineHeight: 1,
              opacity: bookmarkLoading ? 0.6 : 1,
              transition: 'all 200ms ease',
            }}
            type="button"
          >
            {bookmarked ? '★' : '☆'}
          </button>
        </div>

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
            type="button"
            onClick={handleTrackProgress}
            disabled={!sortedNodes.length}
          >
            Track Progress
          </button>
        </div>
      </div>

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

export default RoadmapCanvas;
