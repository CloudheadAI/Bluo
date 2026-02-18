import { useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Avatar, LoadingSpinner, EmptyState, Button } from '../common';

function formatTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const typeIcons: Record<string, string> = {
  like: '❤️',
  comment: '💬',
  follow: '👤',
  share: '🔄',
  achievement: '🏆',
  message: '✉️',
};

export function NotificationList() {
  const { notifications, isLoading, unreadCount, loadNotifications, markAsRead, markAllAsRead } =
    useNotifications();

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  if (isLoading && notifications.length === 0) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications"
          description="You're all caught up!"
        />
      ) : (
        <div>
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                !n.read ? 'bg-blue-50/50' : ''
              }`}
              aria-label={`${n.fromUser.displayName} ${n.message}`}
            >
              <div className="relative">
                <Avatar name={n.fromUser.displayName} size="sm" />
                <span className="absolute -bottom-1 -right-1 text-xs">
                  {typeIcons[n.type]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">{n.fromUser.displayName}</span>{' '}
                  <span className="text-gray-600">{n.message}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{formatTime(n.createdAt)}</p>
              </div>
              {!n.read && (
                <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" aria-label="Unread" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
