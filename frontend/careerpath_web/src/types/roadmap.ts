export type HandlePosition = 'left' | 'right' | 'top' | 'bottom';


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
  sourcePosition?: HandlePosition;
  targetPosition?: HandlePosition;
}

export interface RoadmapEdgeData {
  id: string;
  source: string;
  target: string;
  type?: 'straight' | 'elbow';
}

export interface NodeStatus {
  nodeId: string;
  status: 'pending' | 'in-progress' | 'done' | 'skip';
  
}

// Type aliases for cleaner code
export type NodeLevel = RoadmapNodeData['level'];
export type ProgressStatus = NodeStatus['status'];
export type ResourceType = RoadmapNodeData['resources'][0]['type'];

// Registry entry - each roadmap will have this shape
export interface RoadmapData {
  id: string;           // slug: 'game-dev', 'front-end', etc.
  title: string;        // 'Game Developer'
  subtitle: string;     // 'Roadmap to becoming a Game Developer in 2025'
  nodes: RoadmapNodeData[];
  edges: RoadmapEdgeData[];
}
