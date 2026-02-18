import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Notification } from '../types';
import { notifications as notifApi } from '../services/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await notifApi.list();
      setNotifications(data);
    } catch {
      // silently handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    notifApi.markRead(id).catch(() => { /* silently handle */ });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notifApi.markAllRead().catch(() => { /* silently handle */ });
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, isLoading, loadNotifications, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextType {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
