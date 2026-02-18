import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Post } from '../types';
import { posts as postsApi } from '../services/api';

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  loadPosts: () => Promise<void>;
  addPost: (content: string) => Promise<void>;
  likePost: (postId: string) => void;
  sharePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postsApi.list();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPost = useCallback(async (content: string) => {
    try {
      const post = await postsApi.create(content);
      setPosts((prev) => [post, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  }, []);

  const likePost = useCallback((postId: string) => {
    postsApi.like(postId).then(({ isLiked, likes }) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isLiked, likes } : p))
      );
    }).catch(() => { /* silently handle */ });
  }, []);

  const sharePost = useCallback((postId: string) => {
    postsApi.share(postId).then(({ isShared, shares }) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isShared, shares } : p))
      );
    }).catch(() => { /* silently handle */ });
  }, []);

  const addComment = useCallback((postId: string, content: string) => {
    postsApi.addComment(postId, content).then((comment) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
      );
    }).catch(() => { /* silently handle */ });
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, isLoading, error, loadPosts, addPost, likePost, sharePost, addComment }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts(): PostsContextType {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
