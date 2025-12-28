import type { NodeStatus } from '../../types/roadmap';

/**
 * Map of nodeId -> status
 */
export type NodeStatusMap = Record<string, NodeStatus['status']>;

export type ProgressSummaryItem = {
  roadmap_id: string;
  total_tracked: number;
  done_count: number;
};

export type BookmarkedRoadmap = {
  roadmap_id: string;
  created_at: string;
};

export interface ProgressRepository {
  fetchNodeStatuses(roadmapId: string): Promise<NodeStatusMap>;

  updateNodeStatus(
    roadmapId: string,
    nodeId: string,
    status: NodeStatus['status']
  ): Promise<void>;

  fetchProgressSummary(): Promise<ProgressSummaryItem[]>;

  deleteNodeStatus(roadmapId: string, nodeId: string): Promise<void>;

  fetchBookmarkedRoadmaps(): Promise<BookmarkedRoadmap[]>;

  checkBookmark(roadmapId: string): Promise<boolean>;

  toggleBookmark(roadmapId: string): Promise<boolean>;
}

/**
 * API-based implementation (calls backend)
 *
 * Development (CRA):
 * - Use relative URLs (e.g. /api/...) so CRA can proxy to the backend via package.json "proxy". [web:19]
 *
 * Optional:
 * - You can still override with REACT_APP_API_BASE_URL for non-proxy environments. [web:102]
 */
export class ApiProgressRepository implements ProgressRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.REACT_APP_API_BASE_URL || '') {
    this.baseUrl = baseUrl;
  }

  private url(path: string) {
    // If baseUrl is '', return relative path like '/api/...'
    // If baseUrl is 'http://host:port', return absolute URL.
    return this.baseUrl ? `${this.baseUrl}${path}` : path;
  }

  async fetchNodeStatuses(roadmapId: string): Promise<NodeStatusMap> {
    const response = await fetch(
      this.url(`/api/progress/${encodeURIComponent(roadmapId)}`),
      { credentials: 'include' }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to fetch progress: ${response.status} ${response.statusText} ${text}`
      );
    }

    return response.json();
  }

  async updateNodeStatus(
    roadmapId: string,
    nodeId: string,
    status: NodeStatus['status']
  ): Promise<void> {
    const response = await fetch(
      this.url(
        `/api/progress/${encodeURIComponent(roadmapId)}/nodes/${encodeURIComponent(nodeId)}`
      ),
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to update progress: ${response.status} ${response.statusText} ${text}`
      );
    }
  }

  async fetchProgressSummary(): Promise<ProgressSummaryItem[]> {
    const response = await fetch(this.url(`/api/progress/summary`), {
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to fetch summary: ${response.status} ${response.statusText} ${text}`
      );
    }

    return response.json();
  }

  async deleteNodeStatus(roadmapId: string, nodeId: string): Promise<void> {
    const response = await fetch(
      this.url(
        `/api/progress/${encodeURIComponent(roadmapId)}/nodes/${encodeURIComponent(nodeId)}`
      ),
      { method: 'DELETE', credentials: 'include' }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to delete progress: ${response.status} ${response.statusText} ${text}`
      );
    }
  }

  async fetchBookmarkedRoadmaps(): Promise<BookmarkedRoadmap[]> {
    const response = await fetch(this.url(`/api/bookmarks`), {
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to fetch bookmarks: ${response.status} ${response.statusText} ${text}`
      );
    }

    return response.json();
  }

  async checkBookmark(roadmapId: string): Promise<boolean> {
    const response = await fetch(
      this.url(`/api/bookmarks/${encodeURIComponent(roadmapId)}/check`),
      { credentials: 'include' }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to check bookmark: ${response.status} ${response.statusText} ${text}`
      );
    }

    const data: { bookmarked: boolean } = await response.json();
    return data.bookmarked;
  }

  async toggleBookmark(roadmapId: string): Promise<boolean> {
    const response = await fetch(
      this.url(`/api/bookmarks/${encodeURIComponent(roadmapId)}`),
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to toggle bookmark: ${response.status} ${response.statusText} ${text}`
      );
    }

    const data: { bookmarked: boolean } = await response.json();
    return data.bookmarked;
  }
}

// Default instance
export const defaultProgressRepository = new ApiProgressRepository();
