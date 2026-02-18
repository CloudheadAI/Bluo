import { useAuth } from '../../contexts/AuthContext';
import { subscriptionPlans } from '../../services/mockData';
import { Button } from '../common';
import type { SubscriptionTier } from '../../types';

export function SubscriptionPlans() {
  const { user, updateSubscription } = useAuth();
  const currentTier = user?.subscriptionTier || 'free';

  const handleSelect = (tier: SubscriptionTier) => {
    updateSubscription(tier);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-500 text-sm">
          Unlock AI tools and premium features to supercharge your content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => {
          const isCurrent = plan.tier === currentTier;
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
                disabled={isCurrent}
              >
                {isCurrent ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
