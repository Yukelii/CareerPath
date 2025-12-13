export interface RoadmapNodeData {
  id: string;
  title: string;
  description: string;
  level: 'intro' | 'core' | 'advanced' | 'optional' | 'white'; // add 'white'
  resources: {
    type: 'article' | 'video' | 'feed' | 'official' | 'opensource';
    label: string;
    url?: string;
  }[];
  position: { x: number; y: number };
  color: string; // HEX color code
}

export interface RoadmapEdgeData {
  id: string;
  source: string;
  target: string;
}

export interface NodeStatus {
  nodeId: string;
  status: 'pending' | 'in-progress' | 'done' | 'skip';
}
