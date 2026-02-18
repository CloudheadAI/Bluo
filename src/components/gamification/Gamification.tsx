import { useEffect } from 'react';
import { useGamification } from '../../contexts/GamificationContext';
import { LoadingSpinner, EmptyState, Avatar } from '../common';

export function AchievementsList() {
  const { achievements, isLoading, loadAchievements } = useGamification();

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  if (isLoading && achievements.length === 0) return <LoadingSpinner />;

  if (achievements.length === 0) {
    return (
      <EmptyState
        icon="🏅"
        title="No achievements yet"
        description="Complete activities to earn badges and achievements!"
      />
    );
  }

  return (
    <div className="space-y-3">
      {achievements.map((a) => (
        <div
          key={a.id}
          className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${
            a.completed ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-100'
          }`}
        >
          <span className="text-3xl" role="img" aria-label={a.name}>
            {a.icon}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-gray-900">{a.name}</h3>
              {a.completed && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Completed ✓
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
            {!a.completed && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{a.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${a.progress}%` }}
                    role="progressbar"
                    aria-valuenow={a.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${a.name} progress`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Leaderboard() {
  const { leaderboard, isLoading, loadLeaderboard } = useGamification();

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  if (isLoading && leaderboard.length === 0) return <LoadingSpinner />;

  if (leaderboard.length === 0) {
    return (
      <EmptyState
        icon="🏆"
        title="No leaderboard data"
        description="Be the first to earn points and climb the ranks!"
      />
    );
  }

  const rankColors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
  const rankIcons = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50">
        <h2 className="font-semibold text-gray-900">🏆 Leaderboard</h2>
      </div>
      <div>
        {leaderboard.map((entry, i) => (
          <div
            key={entry.user.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <span className={`text-2xl font-bold w-8 text-center ${rankColors[i] || 'text-gray-300'}`}>
              {rankIcons[i] || entry.rank}
            </span>
            <Avatar name={entry.user.displayName} />
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">{entry.user.displayName}</p>
              <p className="text-xs text-gray-500">@{entry.user.username}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{entry.points.toLocaleString()}</p>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
