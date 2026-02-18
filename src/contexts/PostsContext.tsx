import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Post, Comment } from '../types';
import { fetchPosts, createPost as apiCreatePost, mockUser } from '../services/mockData';

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
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPost = useCallback(async (content: string) => {
    try {
      const post = await apiCreatePost(content);
      setPosts((prev) => [post, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  }, []);

  const likePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }, []);

  const sharePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isShared: !p.isShared, shares: p.isShared ? p.shares - 1 : p.shares + 1 }
          : p
      )
    );
  }, []);

  const addComment = useCallback((postId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: mockUser,
      postId,
      content,
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
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
