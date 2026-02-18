import { useAuth } from '../../contexts/AuthContext';
import { useGamification } from '../../contexts/GamificationContext';
import { Avatar, Button } from '../common';
import { Link } from 'react-router-dom';

export function ProfileCard() {
  const { user } = useAuth();
  const { points } = useGamification();

  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500" />

      {/* Profile info */}
      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-10 mb-4">
          <div className="ring-4 ring-white rounded-full">
            <Avatar name={user.displayName} size="xl" />
          </div>
          <div className="flex-1 pt-10">
            <h2 className="text-xl font-bold text-gray-900">{user.displayName}</h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
          <Link to="/subscription">
            <Button variant="secondary" size="sm">
              {user.subscriptionTier === 'free' ? 'Upgrade' : user.subscriptionTier.toUpperCase()}
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-600 mb-4">{user.bio}</p>

        {/* Stats */}
        <div className="flex gap-6 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.postsCount}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.followersCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.followingCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{points.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </div>

        {/* Badges */}
        {user.badges.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Badges
            </h3>
            <div className="flex gap-2 flex-wrap">
              {user.badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-600"
                  title={badge.description}
                >
                  {badge.icon} {badge.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
