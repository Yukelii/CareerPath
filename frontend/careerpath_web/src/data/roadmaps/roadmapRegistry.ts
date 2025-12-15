import { RoadmapData } from '../../types/roadmap';
import { gameDevRoadmap } from './gameDevRoadmap';
import { frontEndRoadmap } from './frontEndRoadmap';
import { backEndRoadmap } from './backEndRoadmap';
import { softwareArchRoadmap } from './softwareArchRoadmap';
import { uxDesignRoadmap } from './uxDesignRoadmap';
import { cyberSecurityRoadmap } from './cyberSecurityRoadmap';

// Master registry: maps slug -> RoadmapData
export const roadmapRegistry: Record<string, RoadmapData> = {
  'game-dev': gameDevRoadmap,
  'front-end': frontEndRoadmap,
  'back-end': backEndRoadmap,
  'software-architect': softwareArchRoadmap,
  'ux-design': uxDesignRoadmap,
  'cyber-security': cyberSecurityRoadmap,
};

// Helper function: get roadmap by slug
export const getRoadmapBySlug = (slug: string): RoadmapData | undefined => {
  return roadmapRegistry[slug];
};

// Helper function: get all roadmap slugs (for dropdowns, etc.)
export const getAllRoadmapSlugs = (): string[] => {
  return Object.keys(roadmapRegistry);
};
