import type { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    tier: 'free',
    name: 'Free',
    price: 0,
    features: ['Up to 10 posts/day', 'Basic profile customization', 'Standard feed'],
    aiFeatures: ['5 AI text suggestions/day'],
    storageLimit: '500 MB',
  },
  {
    id: 'plan-pro',
    tier: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Unlimited posts',
      'Advanced profile customization',
      'Priority feed placement',
      'Analytics dashboard',
    ],
    aiFeatures: [
      '50 AI text suggestions/day',
      'AI image style suggestions',
      'Content optimization tips',
    ],
    storageLimit: '10 GB',
    highlighted: true,
  },
  {
    id: 'plan-premium',
    tier: 'premium',
    name: 'Premium',
    price: 24.99,
    features: [
      'Unlimited posts',
      'Full profile customization',
      'Priority feed & discovery',
      'Advanced analytics',
      'Verified badge',
    ],
    aiFeatures: [
      'Unlimited AI text suggestions',
      'AI image generation & editing',
      'Advanced content optimization',
      'Trend prediction',
      'Audience insights',
    ],
    storageLimit: '100 GB',
  },
];
