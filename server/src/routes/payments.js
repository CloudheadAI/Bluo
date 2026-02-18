import { Router } from 'express';
import env from '../config/env.js';

const router = Router();

/** Map plan tiers to Stripe price IDs */
const priceMap = {
  pro: env.stripePriceProMonthly,
  premium: env.stripePricePremiumMonthly,
};

/**
 * POST /api/payments/create-checkout-session
 * Creates a Stripe Checkout session for a subscription upgrade.
 */
router.post('/create-checkout-session', async (req, res) => {
  const { tier } = req.body;

  if (!tier || !priceMap[tier]) {
    return res.status(400).json({ error: 'Invalid subscription tier' });
  }

  if (!env.stripeSecretKey) {
    return res.status(503).json({ error: 'Payment service not configured' });
  }

  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(env.stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceMap[tier], quantity: 1 }],
      success_url: `${env.clientUrl}/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.clientUrl}/subscription`,
    });

    return res.json({
      id: session.id,
      url: session.url,
      planId: `plan-${tier}`,
      tier,
      status: 'open',
    });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

/**
 * GET /api/payments/verify-session/:sessionId
 * Verifies a Stripe Checkout session and returns its status.
 */
router.get('/verify-session/:sessionId', async (req, res) => {
  if (!env.stripeSecretKey) {
    return res.status(503).json({ error: 'Payment service not configured' });
  }

  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(env.stripeSecretKey);

    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    return res.json({
      id: session.id,
      url: '',
      planId: `plan-${session.metadata?.tier || 'pro'}`,
      tier: session.metadata?.tier || 'pro',
      status: session.status === 'complete' ? 'complete' : 'open',
    });
  } catch (err) {
    console.error('Session verification error:', err);
    return res.status(500).json({ error: 'Failed to verify session' });
  }
});

export default router;
