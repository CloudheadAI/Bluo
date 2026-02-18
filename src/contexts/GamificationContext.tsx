import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Achievement, LeaderboardEntry } from '../types';
import { gamification as gamApi } from '../services/api';

interface GamificationContextType {
  points: number;
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  addPoints: (amount: number) => void;
  loadAchievements: () => Promise<void>;
  loadLeaderboard: () => Promise<void>;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addPoints = useCallback((amount: number) => {
    setPoints((p) => p + amount);
    gamApi.addPoints(amount).catch(() => { /* silently handle */ });
  }, []);

  const loadAchievements = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await gamApi.achievements();
      setAchievements(data);
    } catch {
      // silently handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await gamApi.leaderboard();
      setLeaderboard(data);
    } catch {
      // silently handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <GamificationContext.Provider
      value={{ points, achievements, leaderboard, isLoading, addPoints, loadAchievements, loadLeaderboard }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification(): GamificationContextType {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}
