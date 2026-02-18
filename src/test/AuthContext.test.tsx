import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

vi.mock('../services/api', () => ({
  auth: {
    login: vi.fn().mockResolvedValue({
      user: {
        id: '1', username: 'johndoe', email: 'john@example.com',
        displayName: 'John Doe', bio: '', avatarUrl: '', coverUrl: '',
        followersCount: 0, followingCount: 0, postsCount: 0, points: 0,
        badges: [], subscriptionTier: 'free', createdAt: '2025-01-01T00:00:00Z',
      },
      token: 'test-token',
    }),
    register: vi.fn(),
    resetPassword: vi.fn(),
  },
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
}));

function TestConsumer() {
  const { isAuthenticated, user, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="user-name">{user?.displayName || 'none'}</span>
      <button onClick={() => login('john@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function renderWithProviders() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    </BrowserRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AuthContext', () => {
  it('starts unauthenticated', () => {
    renderWithProviders();
    expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
  });

  it('logs in successfully', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Login'));

    await screen.findByText('authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
  });

  it('logs out successfully', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Login'));
    await screen.findByText('authenticated');

    await user.click(screen.getByText('Logout'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
  });
});
