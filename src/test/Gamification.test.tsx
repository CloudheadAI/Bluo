import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { GamificationProvider, useGamification } from '../contexts/GamificationContext';

vi.mock('../services/api', () => ({
  gamification: {
    achievements: vi.fn().mockResolvedValue([
      { id: 'a1', name: 'First Post', description: 'Create your first post', icon: '📝',
        requiredPoints: 10, badge: { id: 'b5', name: 'First Post', description: 'Created first post', icon: '📝' },
        progress: 100, completed: true },
      { id: 'a2', name: 'Social Butterfly', description: 'Get 100 followers', icon: '🦋',
        requiredPoints: 500, badge: { id: 'b2', name: 'Social Butterfly', description: '100+ followers', icon: '🦋' },
        progress: 100, completed: true },
      { id: 'a3', name: 'Viral', description: 'Get 1000 likes', icon: '🔥',
        requiredPoints: 1000, badge: { id: 'b6', name: 'Viral', description: '1000 likes', icon: '🔥' },
        progress: 42, completed: false },
      { id: 'a4', name: 'Creator', description: 'Post every day for 30 days', icon: '📅',
        requiredPoints: 750, badge: { id: 'b7', name: 'Creator', description: '30-day streak', icon: '📅' },
        progress: 60, completed: false },
      { id: 'a5', name: 'Leader', description: 'Earn 10,000 total points', icon: '👑',
        requiredPoints: 2000, badge: { id: 'b8', name: 'Leader', description: '10K points', icon: '👑' },
        progress: 25, completed: false },
    ]),
    leaderboard: vi.fn().mockResolvedValue([
      { rank: 1, user: { id: '3', displayName: 'Alex', username: 'alex' }, points: 9800 },
      { rank: 2, user: { id: '2', displayName: 'Jane', username: 'jane' }, points: 5200 },
      { rank: 3, user: { id: '1', displayName: 'John', username: 'john' }, points: 2450 },
    ]),
    addPoints: vi.fn().mockResolvedValue({ points: 100 }),
  },
}));

function TestConsumer() {
  const { points, achievements, leaderboard, addPoints, loadAchievements, loadLeaderboard } =
    useGamification();
  return (
    <div>
      <span data-testid="points">{points}</span>
      <span data-testid="achievement-count">{achievements.length}</span>
      <span data-testid="leaderboard-count">{leaderboard.length}</span>
      <button onClick={() => addPoints(100)}>Add Points</button>
      <button onClick={loadAchievements}>Load Achievements</button>
      <button onClick={loadLeaderboard}>Load Leaderboard</button>
    </div>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GamificationContext', () => {
  it('starts with zero points', () => {
    render(
      <BrowserRouter>
        <GamificationProvider>
          <TestConsumer />
        </GamificationProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('points')).toHaveTextContent('0');
  });

  it('adds points', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <GamificationProvider>
          <TestConsumer />
        </GamificationProvider>
      </BrowserRouter>
    );

    await user.click(screen.getByText('Add Points'));
    expect(screen.getByTestId('points')).toHaveTextContent('100');
  });

  it('loads achievements', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <GamificationProvider>
          <TestConsumer />
        </GamificationProvider>
      </BrowserRouter>
    );

    await user.click(screen.getByText('Load Achievements'));
    await screen.findByText('5');
  });

  it('loads leaderboard', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <GamificationProvider>
          <TestConsumer />
        </GamificationProvider>
      </BrowserRouter>
    );

    await user.click(screen.getByText('Load Leaderboard'));
    await screen.findByText('3');
  });
});
