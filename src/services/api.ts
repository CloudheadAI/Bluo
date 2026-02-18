import type {
  User,
  Post,
  Comment,
  Notification,
  Conversation,
  Achievement,
  LeaderboardEntry,
  Story,
  AITextSuggestion,
  AIImageSuggestion,
  AIContentOptimization,
  CheckoutSession,
  SubscriptionTier,
} from '../types';

// ─── Configuration ─────────────────────────────────────────

const TIMEOUT_MS = 10_000;

let authToken = '';

export function setAuthToken(token: string) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = '';
}

function getApiBase(): string {
  return import.meta.env.VITE_API_URL ?? '';
}

// ─── HTTP Client ───────────────────────────────────────────

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

    const res = await fetch(`${getApiBase()}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new ApiError(
        res.status,
        (data as { error?: string }).error || `Request failed (${res.status})`,
      );
    }

    if (res.status === 204) return undefined as T;
    return res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(0, 'Request timed out');
    }
    throw new ApiError(0, err instanceof Error ? err.message : 'Network error');
  } finally {
    clearTimeout(timer);
  }
}

const get = <T>(path: string) => request<T>('GET', path);
const post = <T>(path: string, body?: unknown) => request<T>('POST', path, body);
const patch = <T>(path: string, body?: unknown) => request<T>('PATCH', path, body);

// ─── Auth ──────────────────────────────────────────────────

interface AuthResponse {
  user: User;
  token: string;
}

export const auth = {
  login: (email: string, password: string) =>
    post<AuthResponse>('/api/auth/login', { email, password }),

  register: (username: string, email: string, password: string) =>
    post<AuthResponse>('/api/auth/register', { username, email, password }),

  resetPassword: (email: string) =>
    post<void>('/api/auth/reset-password', { email }),
};

// ─── Posts ─────────────────────────────────────────────────

export const posts = {
  list: () => get<Post[]>('/api/posts'),

  create: (content: string) => post<Post>('/api/posts', { content }),

  like: (postId: string) =>
    post<{ isLiked: boolean; likes: number }>(`/api/posts/${encodeURIComponent(postId)}/like`),

  share: (postId: string) =>
    post<{ isShared: boolean; shares: number }>(`/api/posts/${encodeURIComponent(postId)}/share`),

  addComment: (postId: string, content: string) =>
    post<Comment>(`/api/posts/${encodeURIComponent(postId)}/comments`, { content }),
};

// ─── Notifications ─────────────────────────────────────────

export const notifications = {
  list: () => get<Notification[]>('/api/notifications'),

  markRead: (id: string) =>
    patch<void>(`/api/notifications/${encodeURIComponent(id)}/read`),

  markAllRead: () => patch<void>('/api/notifications/read-all'),
};

// ─── Messages ──────────────────────────────────────────────

export const messages = {
  conversations: () => get<Conversation[]>('/api/messages/conversations'),
};

// ─── Gamification ──────────────────────────────────────────

export const gamification = {
  achievements: () => get<Achievement[]>('/api/gamification/achievements'),
  leaderboard: () => get<LeaderboardEntry[]>('/api/gamification/leaderboard'),
  addPoints: (amount: number) =>
    post<{ points: number }>('/api/gamification/points', { amount }),
};

// ─── Stories ───────────────────────────────────────────────

export const stories = {
  list: () => get<Story[]>('/api/stories'),

  create: (content: string) => post<Story>('/api/stories', { content }),

  markViewed: (storyId: string) =>
    post<void>(`/api/stories/${encodeURIComponent(storyId)}/view`),
};

// ─── AI ────────────────────────────────────────────────────

export const ai = {
  textSuggestions: (prompt: string, type: 'caption' | 'hashtag' | 'idea') =>
    post<AITextSuggestion[]>('/api/ai/text-suggestions', { prompt, type }),

  imageSuggestions: () => get<AIImageSuggestion[]>('/api/ai/image-suggestions'),

  contentOptimizations: (content: string) =>
    post<AIContentOptimization[]>('/api/ai/content-optimizations', { content }),
};

// ─── Payments ──────────────────────────────────────────────

export const payments = {
  createCheckout: (tier: SubscriptionTier) =>
    post<CheckoutSession>('/api/payments/create-checkout-session', { tier }),

  verifySession: (sessionId: string) =>
    get<CheckoutSession>(`/api/payments/verify-session/${encodeURIComponent(sessionId)}`),
};
