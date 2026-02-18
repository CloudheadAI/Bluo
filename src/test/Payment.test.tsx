import { describe, it, expect, vi } from 'vitest';
import { createCheckoutSession } from '../services/paymentService';

describe('Payment Service', () => {
  it('returns a complete session for the free plan', async () => {
    const session = await createCheckoutSession('free');
    expect(session.status).toBe('complete');
    expect(session.tier).toBe('free');
    expect(session.planId).toBe('plan-free');
  });

  it('returns a demo session for paid plans when no API_URL is set', async () => {
    const session = await createCheckoutSession('pro');
    expect(session.id).toMatch(/^cs_demo_/);
    expect(session.tier).toBe('pro');
    expect(session.status).toBe('complete');
  });

  it('throws for invalid plan tier', async () => {
    await expect(
      createCheckoutSession('invalid' as 'pro')
    ).rejects.toThrow('Invalid plan selected');
  });

  it('calls backend API when VITE_API_URL is set', async () => {
    const mockResponse = {
      id: 'cs_live_123',
      url: 'https://checkout.stripe.com/test',
      planId: 'plan-pro',
      tier: 'pro',
      status: 'open',
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Temporarily set the env variable via import.meta.env
    const origEnv = import.meta.env.VITE_API_URL;
    import.meta.env.VITE_API_URL = 'https://api.bluo.test';

    try {
      const session = await createCheckoutSession('pro');
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.bluo.test/api/payments/create-checkout-session',
        expect.objectContaining({ method: 'POST' })
      );
      expect(session.id).toBe('cs_live_123');
    } finally {
      import.meta.env.VITE_API_URL = origEnv;
      fetchSpy.mockRestore();
    }
  });
});
