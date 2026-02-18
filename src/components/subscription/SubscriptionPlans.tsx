import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { subscriptionPlans } from '../../config/plans';
import { payments as paymentsApi } from '../../services/api';
import { Button } from '../common';
import type { SubscriptionTier } from '../../types';

export function SubscriptionPlans() {
  const { user, updateSubscription } = useAuth();
  const currentTier = user?.subscriptionTier || 'free';
  const [processingTier, setProcessingTier] = useState<SubscriptionTier | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (tier: SubscriptionTier) => {
    setError(null);
    setProcessingTier(tier);

    try {
      const session = await paymentsApi.createCheckout(tier);

      if (session.url && !session.url.startsWith('#')) {
        window.location.href = session.url;
        return;
      }

      // Demo mode or free plan: apply immediately
      updateSubscription(tier);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setProcessingTier(null);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-500 text-sm">
          Unlock AI tools and premium features to supercharge your content.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => {
          const isCurrent = plan.tier === currentTier;
          const isProcessing = processingTier === plan.tier;
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 transition-all ${
                plan.highlighted
                  ? 'border-blue-400 ring-2 ring-blue-100 shadow-lg'
                  : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm text-gray-500">/month</span>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Features
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-2">
                  AI Tools
                </p>
                <ul className="space-y-2">
                  {plan.aiFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">✨</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-400 mb-4">Storage: {plan.storageLimit}</p>

              <Button
                onClick={() => handleSelect(plan.tier)}
                variant={isCurrent ? 'secondary' : 'primary'}
                className="w-full"
                disabled={isCurrent || isProcessing}
                isLoading={isProcessing}
              >
                {isCurrent ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Payments processed securely by Stripe. By subscribing you agree to our{' '}
        <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>.
      </p>
    </div>
  );
}
