import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PostsProvider, usePosts } from '../contexts/PostsContext';
import { GamificationProvider } from '../contexts/GamificationContext';
import { AuthProvider } from '../contexts/AuthContext';

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

describe('PostsContext', () => {
  it('starts with empty posts', () => {
    renderWithProviders();
    expect(screen.getByTestId('post-count')).toHaveTextContent('0');
  });

  it('loads posts', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByText('Load'));
    await screen.findByText('3'); // 3 mock posts
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
    expect(screen.getByTestId('likes-p1')).toHaveTextContent('43'); // 42 + 1
  });
});
