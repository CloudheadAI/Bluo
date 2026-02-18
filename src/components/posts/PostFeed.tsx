import { useEffect } from 'react';
import { usePosts } from '../../contexts/PostsContext';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { LoadingSpinner, EmptyState, ErrorMessage } from '../common';

export function PostFeed() {
  const { posts, isLoading, error, loadPosts } = usePosts();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div>
      <CreatePost />
      {isLoading && posts.length === 0 ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadPosts} />
      ) : posts.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No posts yet"
          description="Be the first to share something with the community!"
        />
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
