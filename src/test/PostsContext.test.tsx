import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider, usePosts } from '../contexts/PostsContext';
import { GamificationProvider } from '../contexts/GamificationContext';
import { AuthProvider } from '../contexts/AuthContext';

vi.mock('../services/api', () => {
  const user = {
    id: '1', username: 'johndoe', email: 'john@example.com',
    displayName: 'John Doe', bio: '', avatarUrl: '', coverUrl: '',
    followersCount: 0, followingCount: 0, postsCount: 0, points: 0,
    badges: [], subscriptionTier: 'free', createdAt: '2025-01-01T00:00:00Z',
  };
  return {
    auth: { login: vi.fn(), register: vi.fn(), resetPassword: vi.fn() },
    setAuthToken: vi.fn(),
    clearAuthToken: vi.fn(),
    posts: {
      list: vi.fn().mockResolvedValue([
        { id: 'p1', author: user, content: 'Post 1', images: [], videos: [],
          likes: 42, comments: [], shares: 8, isLiked: false, isShared: false, createdAt: '2026-02-17T10:00:00Z' },
        { id: 'p2', author: user, content: 'Post 2', images: [], videos: [],
          likes: 10, comments: [], shares: 2, isLiked: true, isShared: false, createdAt: '2026-02-16T10:00:00Z' },
        { id: 'p3', author: user, content: 'Post 3', images: [], videos: [],
          likes: 5, comments: [], shares: 1, isLiked: false, isShared: false, createdAt: '2026-02-15T10:00:00Z' },
      ]),
      create: vi.fn().mockResolvedValue({
        id: 'p-new', author: user, content: 'Test post', images: [], videos: [],
        likes: 0, comments: [], shares: 0, isLiked: false, isShared: false,
        createdAt: new Date().toISOString(),
      }),
      like: vi.fn().mockResolvedValue({ isLiked: true, likes: 43 }),
      share: vi.fn(),
      addComment: vi.fn(),
    },
    gamification: {
      achievements: vi.fn().mockResolvedValue([]),
      leaderboard: vi.fn().mockResolvedValue([]),
      addPoints: vi.fn().mockResolvedValue({ points: 100 }),
    },
  };
});

function TestConsumer() {
  const { posts, loadPosts, addPost, likePost } = usePosts();
  return (
    <div>
      <span data-testid="post-count">{posts.length}</span>
      <button onClick={loadPosts}>Load</button>
      <button onClick={() => addPost('Test post')}>Add</button>
      {posts.map((p) => (
        <div key={p.id} data-testid={`post-${p.id}`}>
          <span>{p.content}</span>
          <span data-testid={`likes-${p.id}`}>{p.likes}</span>
          <button onClick={() => likePost(p.id)}>Like {p.id}</button>
        </div>
      ))}
    </div>
  );
}

function renderWithProviders() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <PostsProvider>
          <GamificationProvider>
            <TestConsumer />
          </GamificationProvider>
        </PostsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PostsContext', () => {
  it('starts with empty posts', () => {
    renderWithProviders();
    expect(screen.getByTestId('post-count')).toHaveTextContent('0');
  });

  it('loads posts', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Load'));
    await screen.findByText('3');
  });

  it('adds a new post', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Add'));
    await screen.findByText('Test post');
  });

  it('likes a post', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Load'));
    await screen.findByText('3');

    await user.click(screen.getByText('Like p1'));
    await screen.findByText('43');
  });
});
