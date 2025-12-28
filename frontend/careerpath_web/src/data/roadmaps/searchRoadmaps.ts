import { roadmapRegistry } from './roadmapRegistry';
import type { RoadmapData, RoadmapNodeData } from '../../types/roadmap';

export interface RoadmapSearchHit {
  roadmap: RoadmapData;
  matchingNodes: RoadmapNodeData[];
}

// Find roadmaps whose node titles contain the query (case-insensitive).
 
export function searchRoadmapsByNodeTitle(query: string): RoadmapSearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const slugs = Object.keys(roadmapRegistry);

  const results: RoadmapSearchHit[] = [];

  for (const slug of slugs) {
    const roadmap = roadmapRegistry[slug];
    if (!roadmap) continue;

    const matchingNodes = roadmap.nodes.filter((node) =>
      node.title.toLowerCase().includes(q)
    );

    if (matchingNodes.length > 0) {
      results.push({ roadmap, matchingNodes });
    }
  }

  return results;
}
