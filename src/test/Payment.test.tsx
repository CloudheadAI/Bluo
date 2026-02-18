import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiError } from '../services/api';

describe('Unified API Client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('ApiError has correct status and message', () => {
    const err = new ApiError(404, 'Not found');
    expect(err.status).toBe(404);
    expect(err.message).toBe('Not found');
    expect(err.name).toBe('ApiError');
    expect(err instanceof Error).toBe(true);
  });

  it('throws ApiError on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    } as Response);

    const { auth } = await import('../services/api');
    await expect(auth.login('bad@email.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });

  it('throws ApiError on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('fetch failed'));

    const { posts } = await import('../services/api');
    await expect(posts.list()).rejects.toThrow('fetch failed');
  });
});
