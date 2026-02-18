import { useState } from 'react';
import type { AITextSuggestion, AIContentOptimization } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { ai as aiApi } from '../../services/api';
import { Button, LoadingSpinner } from '../common';

interface AIToolsPanelProps {
  onInsert: (text: string) => void;
  content: string;
}

export function AIToolsPanel({ onInsert, content }: AIToolsPanelProps) {
  const { user } = useAuth();
  const tier = user?.subscriptionTier || 'free';
  const [activeTab, setActiveTab] = useState<'captions' | 'hashtags' | 'ideas' | 'optimize'>(
    'captions'
  );
  const [suggestions, setSuggestions] = useState<AITextSuggestion[]>([]);
  const [optimizations, setOptimizations] = useState<AIContentOptimization[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'captions' as const, label: '✍️ Captions', tier: 'free' },
    { id: 'hashtags' as const, label: '#️⃣ Hashtags', tier: 'free' },
    { id: 'ideas' as const, label: '💡 Ideas', tier: 'pro' },
    { id: 'optimize' as const, label: '📊 Optimize', tier: 'pro' },
  ];

  const tierOrder = { free: 0, pro: 1, premium: 2 };

  const isTabAvailable = (tabTier: string) => tierOrder[tier] >= tierOrder[tabTier as keyof typeof tierOrder];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'optimize') {
        const data = await aiApi.contentOptimizations(content);
        setOptimizations(data);
      } else {
        const typeMap = { captions: 'caption', hashtags: 'hashtag', ideas: 'idea' } as const;
        const data = await aiApi.textSuggestions(content, typeMap[activeTab]);
        setSuggestions(data);
      }
    } catch {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-purple-600">✨ AI Assistant</span>
        <span className="text-xs bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full">
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3" role="tablist" aria-label="AI tool categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => isTabAvailable(tab.tier) && setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-disabled={!isTabAvailable(tab.tier)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-100 text-purple-700'
                : isTabAvailable(tab.tier)
                ? 'text-gray-500 hover:bg-gray-50'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            {tab.label}
            {!isTabAvailable(tab.tier) && ' 🔒'}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <Button onClick={handleGenerate} variant="secondary" size="sm" isLoading={isLoading}>
        Generate Suggestions
      </Button>

      {/* Results */}
      {isLoading ? (
        <LoadingSpinner size="sm" />
      ) : activeTab === 'optimize' ? (
        optimizations.length > 0 && (
          <div className="mt-3 space-y-2">
            {optimizations.map((opt) => (
              <div
                key={opt.id}
                className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700"
              >
                <span className="text-xs font-medium text-purple-500 uppercase mr-2">
                  {opt.category}
                </span>
                {opt.suggestion}
              </div>
            ))}
          </div>
        )
      ) : (
        suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => onInsert(s.content)}
                className="w-full text-left bg-gray-50 hover:bg-purple-50 rounded-xl p-3 text-sm text-gray-700 transition-colors"
              >
                {s.content}
              </button>
            ))}
          </div>
        )
      )}

      {!isTabAvailable('pro') && (
        <p className="mt-3 text-xs text-gray-400 text-center">
          Upgrade to Pro for more AI features →
        </p>
      )}
    </div>
  );
}
