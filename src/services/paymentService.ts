import type { CheckoutSession, SubscriptionTier } from '../types';
import { subscriptionPlans } from './mockData';

const API_BASE = import.meta.env.VITE_API_URL || '';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Creates a checkout session for a subscription plan.
 * In production, this calls the backend which creates a Stripe Checkout session.
 * In demo mode (no API_URL), it returns a mock session.
 */
export async function createCheckoutSession(
  tier: SubscriptionTier
): Promise<CheckoutSession> {
  const plan = subscriptionPlans.find((p) => p.tier === tier);
  if (!plan) throw new Error('Invalid plan selected');

  if (plan.price === 0) {
    return {
      id: `cs_free_${Date.now()}`,
      url: '',
      planId: plan.id,
      tier: plan.tier,
      status: 'complete',
    };
  }

  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: plan.id, tier: plan.tier }),
    });
    if (!res.ok) throw new Error('Failed to create checkout session');
    return res.json();
  }

  // Demo mode: simulate checkout
  await delay(600);
  return {
    id: `cs_demo_${Date.now()}`,
    url: `#checkout-demo-${plan.tier}`,
    planId: plan.id,
    tier: plan.tier,
    status: 'complete',
  };
}

/**
 * Verifies a checkout session status.
 * In production, this validates with the backend/Stripe.
 */
export async function verifyCheckoutSession(
  sessionId: string
): Promise<CheckoutSession> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/payments/verify-session/${sessionId}`);
    if (!res.ok) throw new Error('Failed to verify session');
    return res.json();
  }

  // Demo mode
  await delay(300);
  return {
    id: sessionId,
    url: '',
    planId: 'plan-pro',
    tier: 'pro',
    status: 'complete',
  };
}
