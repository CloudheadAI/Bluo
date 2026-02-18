import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { GamificationProvider, useGamification } from '../contexts/GamificationContext';

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

describe('GamificationContext', () => {
  it('starts with initial points', () => {
    render(
      <BrowserRouter>
        <GamificationProvider>
          <TestConsumer />
        </GamificationProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('points')).toHaveTextContent('2450');
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
    expect(screen.getByTestId('points')).toHaveTextContent('2550');
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
    await screen.findByText('5'); // 5 mock achievements
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
    await screen.findByText('3'); // 3 leaderboard entries
  });
});
