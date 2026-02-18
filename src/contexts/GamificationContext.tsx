import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Achievement, LeaderboardEntry } from '../types';
import { fetchAchievements, fetchLeaderboard } from '../services/mockData';

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
  const [points, setPoints] = useState(2450);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addPoints = useCallback((amount: number) => {
    setPoints((p) => p + amount);
  }, []);

  const loadAchievements = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAchievements();
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
      const data = await fetchLeaderboard();
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
