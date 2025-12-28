import type { GuideCompletionMap } from '../../types/roadmap';

export interface GuideRepository {
  loadGuideCompletion(): Promise<GuideCompletionMap>;
  setGuideCompletion(guideId: string, completed: boolean): Promise<GuideCompletionMap>;
}

type ApiGuideCompletionRow = {
  guide_id: string;
  completed: boolean;
  completed_at: string | null;
};

type ApiGuideCompletionMap = Record<string, ApiGuideCompletionRow>;

export class ApiGuideRepository implements GuideRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.REACT_APP_API_BASE_URL || '') {
    this.baseUrl = baseUrl;
  }

  private url(path: string) {
    return this.baseUrl ? `${this.baseUrl}${path}` : path;
  }

  async loadGuideCompletion(): Promise<GuideCompletionMap> {
    const res = await fetch(this.url('/api/guides/completion'), { credentials: 'include' });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Failed /api/guides/completion: ${res.status} ${res.statusText} ${text}`.trim());
    }

    const data: ApiGuideCompletionMap = await res.json();

    // Convert snake_case API into your existing frontend map shape
    const out: GuideCompletionMap = {};
    for (const [guideId, row] of Object.entries(data)) {
      out[guideId] = {
        guideId,
        completed: Boolean(row.completed),
        completedAt: row.completed_at ?? undefined,
      };
    }
    return out;
  }

  async setGuideCompletion(guideId: string, completed: boolean): Promise<GuideCompletionMap> {
    const res = await fetch(this.url(`/api/guides/${encodeURIComponent(guideId)}/completion`), {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Failed PUT /api/guides/:guideId/completion: ${res.status} ${res.statusText} ${text}`.trim()
      );
    }

    // After update, re-fetch so UI is always consistent
    return this.loadGuideCompletion();
  }
}

export const defaultGuideRepository = new ApiGuideRepository();
export default defaultGuideRepository;
