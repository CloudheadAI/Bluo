export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  points: number;
  badges: Badge[];
  subscriptionTier: SubscriptionTier;
  createdAt: string;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  videos: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
  isShared: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: User;
  postId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share' | 'achievement' | 'message';
  fromUser: User;
  message: string;
  read: boolean;
  postId?: string;
  createdAt: string;
}

export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  features: string[];
  aiFeatures: string[];
  storageLimit: string;
  highlighted?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  badge: Badge;
  progress: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
}

export interface AITextSuggestion {
  id: string;
  type: 'caption' | 'hashtag' | 'idea';
  content: string;
}

export interface AIImageSuggestion {
  id: string;
  type: 'style' | 'filter';
  name: string;
  preview: string;
}

export interface AIContentOptimization {
  id: string;
  suggestion: string;
  category: 'engagement' | 'reach' | 'timing';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}
