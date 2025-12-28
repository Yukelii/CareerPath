export type HandlePosition = 'left' | 'right' | 'top' | 'bottom';
export type NodeSize = 'sm' | 'md' | 'lg';

export interface RoadmapNodeData {
  id: string;
  title: string;
  description: string;
  level: 'intro' | 'core' | 'advanced' | 'optional' | 'white';
  resources: {
    type: 'article' | 'video' | 'feed' | 'official' | 'opensource';
    label: string;
    url?: string;
  }[];
  position: { x: number; y: number };
  color: string;

  // Optional node-level defaults
  sourcePosition?: HandlePosition;
  targetPosition?: HandlePosition;

  // 3 node sizes
  size?: NodeSize;
}

export interface RoadmapEdgeData {
  id: string;
  source: string;
  target: string;
  type?: 'straight' | 'elbow';

  // per-edge port overrides
  sourcePosition?: HandlePosition;
  targetPosition?: HandlePosition;
}

export interface NodeStatus {
  nodeId: string;
  status: 'pending' | 'in-progress' | 'done' | 'skip';
}

// Containers (group boxes)
export interface RoadmapGroupData {
  id: string;
  nodeIds: string[];

  title?: string;

  // Title inside the box
  titlePosition?: 'top' | 'bottom';
  titleFontSize?: number;
  titleColor?: string;

  // NEW: center/left/right title alignment
  // (SVG uses start/middle/end)
  titleAlign?: 'start' | 'middle' | 'end';

  // Auto-fit padding (used when bounds is not provided)
  padding?: number;

  rx?: number;

  stroke?: string;
  strokeWidth?: number;
  fill?: string;

  // NEW: Manual bounds (makes the container resizable by data)
  // If provided, RoadmapCanvas uses this instead of computing from node positions.
  bounds?: { x: number; y: number; width: number; height: number };
}

// Free text anywhere on canvas (not tied to nodes)
export interface CanvasTextData {
  id: string;
  text: string;
  position: { x: number; y: number };

  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  textAnchor?: 'start' | 'middle' | 'end';
}

// Type aliases for cleaner code
export type NodeLevel = RoadmapNodeData['level'];
export type ProgressStatus = NodeStatus['status'];
export type ResourceType = RoadmapNodeData['resources'][0]['type'];

// Registry entry - each roadmap will have this shape
export interface RoadmapData {
  id: string; // slug: 'game-dev', 'front-end', etc.
  title: string;
  subtitle: string;
  nodes: RoadmapNodeData[];
  edges: RoadmapEdgeData[];

  groups?: RoadmapGroupData[];
  canvasTexts?: CanvasTextData[];
}
export interface Guide {
  id: string;
  title: string;
  description: string;
  careerId: string;
  type: 'guide' | 'tutorial' | 'project' | 'website';
  duration: string; // e.g., "1 hour", "2 days"
  difficulty: 'easy' | 'medium' | 'hard';
  url: string;
  tags?: string[];
}

export interface GuideCompletion {
  guideId: string;
  completed: boolean;
  completedAt?: string;
}

export type GuideCompletionMap = Record<string, GuideCompletion>;