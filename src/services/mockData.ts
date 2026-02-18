import type {
  User,
  Post,
  Conversation,
  Notification,
  SubscriptionPlan,
  Achievement,
  LeaderboardEntry,
  AITextSuggestion,
  AIImageSuggestion,
  AIContentOptimization,
} from '../types';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockUser: User = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  displayName: 'John Doe',
  bio: 'Creative thinker | Tech enthusiast | Coffee lover ☕',
  avatarUrl: '',
  coverUrl: '',
  followersCount: 1240,
  followingCount: 530,
  postsCount: 89,
  points: 2450,
  badges: [
    { id: 'b1', name: 'Early Adopter', description: 'Joined in the first month', icon: '🌟' },
    { id: 'b2', name: 'Social Butterfly', description: '100+ followers', icon: '🦋' },
  ],
  subscriptionTier: 'free',
  createdAt: '2025-01-15T10:00:00Z',
};

const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    displayName: 'Jane Doe',
    bio: 'Designer & artist 🎨',
    avatarUrl: '',
    coverUrl: '',
    followersCount: 3500,
    followingCount: 200,
    postsCount: 156,
    points: 5200,
    badges: [{ id: 'b3', name: 'Top Creator', description: 'Top 10 on leaderboard', icon: '🏆' }],
    subscriptionTier: 'pro',
    createdAt: '2025-02-01T10:00:00Z',
    isFollowing: true,
  },
  {
    id: '3',
    username: 'alexsmith',
    email: 'alex@example.com',
    displayName: 'Alex Smith',
    bio: 'Photographer | Traveler 📸',
    avatarUrl: '',
    coverUrl: '',
    followersCount: 8200,
    followingCount: 450,
    postsCount: 312,
    points: 9800,
    badges: [
      { id: 'b4', name: 'Influencer', description: '5000+ followers', icon: '⭐' },
      { id: 'b3', name: 'Top Creator', description: 'Top 10 on leaderboard', icon: '🏆' },
    ],
    subscriptionTier: 'premium',
    createdAt: '2025-01-05T10:00:00Z',
    isFollowing: false,
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[1],
    content: 'Just finished a new design project! What do you think? 🎨✨',
    images: [],
    videos: [],
    likes: 42,
    comments: [
      {
        id: 'c1',
        author: mockUsers[0],
        postId: 'p1',
        content: 'Looks amazing! Great work! 🙌',
        likes: 5,
        isLiked: false,
        createdAt: '2026-02-17T12:00:00Z',
      },
    ],
    shares: 8,
    isLiked: false,
    isShared: false,
    createdAt: '2026-02-17T10:00:00Z',
  },
  {
    id: 'p2',
    author: mockUsers[2],
    content:
      'Captured this beautiful sunset during my trip to the mountains. Nature never ceases to amaze me. 🌄',
    images: [],
    videos: [],
    likes: 128,
    comments: [],
    shares: 24,
    isLiked: true,
    isShared: false,
    createdAt: '2026-02-16T18:30:00Z',
  },
  {
    id: 'p3',
    author: mockUsers[0],
    content: 'Excited to share my thoughts on the future of AI in creative workflows! 🤖',
    images: [],
    videos: [],
    likes: 15,
    comments: [],
    shares: 3,
    isLiked: false,
    isShared: false,
    createdAt: '2026-02-16T09:00:00Z',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participant: mockUsers[1],
    lastMessage: {
      id: 'm1',
      senderId: '2',
      receiverId: '1',
      content: 'Hey! Did you see my new design?',
      read: false,
      createdAt: '2026-02-17T15:00:00Z',
    },
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participant: mockUsers[2],
    lastMessage: {
      id: 'm2',
      senderId: '1',
      receiverId: '3',
      content: 'Those photos are incredible!',
      read: true,
      createdAt: '2026-02-16T20:00:00Z',
    },
    unreadCount: 0,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    fromUser: mockUsers[1],
    message: 'liked your post',
    read: false,
    postId: 'p3',
    createdAt: '2026-02-17T14:00:00Z',
  },
  {
    id: 'n2',
    type: 'follow',
    fromUser: mockUsers[2],
    message: 'started following you',
    read: false,
    createdAt: '2026-02-17T12:00:00Z',
  },
  {
    id: 'n3',
    type: 'comment',
    fromUser: mockUsers[1],
    message: 'commented on your post',
    read: true,
    postId: 'p3',
    createdAt: '2026-02-16T10:00:00Z',
  },
  {
    id: 'n4',
    type: 'achievement',
    fromUser: mockUsers[0],
    message: 'You earned the "Social Butterfly" badge!',
    read: true,
    createdAt: '2026-02-15T08:00:00Z',
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    tier: 'free',
    name: 'Free',
    price: 0,
    features: ['Up to 10 posts/day', 'Basic profile customization', 'Standard feed'],
    aiFeatures: ['5 AI text suggestions/day'],
    storageLimit: '500 MB',
  },
  {
    id: 'plan-pro',
    tier: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Unlimited posts',
      'Advanced profile customization',
      'Priority feed placement',
      'Analytics dashboard',
    ],
    aiFeatures: [
      '50 AI text suggestions/day',
      'AI image style suggestions',
      'Content optimization tips',
    ],
    storageLimit: '10 GB',
    highlighted: true,
  },
  {
    id: 'plan-premium',
    tier: 'premium',
    name: 'Premium',
    price: 24.99,
    features: [
      'Unlimited posts',
      'Full profile customization',
      'Priority feed & discovery',
      'Advanced analytics',
      'Verified badge',
    ],
    aiFeatures: [
      'Unlimited AI text suggestions',
      'AI image generation & editing',
      'Advanced content optimization',
      'Trend prediction',
      'Audience insights',
    ],
    storageLimit: '100 GB',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    name: 'First Post',
    description: 'Create your first post',
    icon: '📝',
    requiredPoints: 10,
    badge: { id: 'b5', name: 'First Post', description: 'Created first post', icon: '📝' },
    progress: 100,
    completed: true,
  },
  {
    id: 'a2',
    name: 'Social Butterfly',
    description: 'Get 100 followers',
    icon: '🦋',
    requiredPoints: 500,
    badge: { id: 'b2', name: 'Social Butterfly', description: '100+ followers', icon: '🦋' },
    progress: 100,
    completed: true,
  },
  {
    id: 'a3',
    name: 'Viral Sensation',
    description: 'Get 1000 likes on a single post',
    icon: '🔥',
    requiredPoints: 1000,
    badge: { id: 'b6', name: 'Viral Sensation', description: '1000 likes on a post', icon: '🔥' },
    progress: 42,
    completed: false,
  },
  {
    id: 'a4',
    name: 'Consistent Creator',
    description: 'Post every day for 30 days',
    icon: '📅',
    requiredPoints: 750,
    badge: { id: 'b7', name: 'Consistent Creator', description: '30-day streak', icon: '📅' },
    progress: 60,
    completed: false,
  },
  {
    id: 'a5',
    name: 'Community Leader',
    description: 'Earn 10,000 total points',
    icon: '👑',
    requiredPoints: 2000,
    badge: { id: 'b8', name: 'Community Leader', description: '10K points', icon: '👑' },
    progress: 25,
    completed: false,
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, user: mockUsers[2], points: 9800 },
  { rank: 2, user: mockUsers[1], points: 5200 },
  { rank: 3, user: mockUsers[0], points: 2450 },
];

// API simulation functions
export async function loginUser(
  email: string,
  _password: string
): Promise<User> {
  await delay(800);
  if (email === 'john@example.com') {
    return mockUser;
  }
  throw new Error('Invalid credentials');
}

export async function registerUser(
  _username: string,
  email: string,
  _password: string
): Promise<User> {
  await delay(800);
  return { ...mockUser, email, id: Date.now().toString() };
}

export async function resetPassword(_email: string): Promise<void> {
  await delay(800);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(600);
  return mockPosts;
}

export async function createPost(content: string): Promise<Post> {
  await delay(500);
  return {
    id: `p${Date.now()}`,
    author: mockUser,
    content,
    images: [],
    videos: [],
    likes: 0,
    comments: [],
    shares: 0,
    isLiked: false,
    isShared: false,
    createdAt: new Date().toISOString(),
  };
}

export async function fetchNotifications(): Promise<Notification[]> {
  await delay(400);
  return mockNotifications;
}

export async function fetchConversations(): Promise<Conversation[]> {
  await delay(400);
  return mockConversations;
}

export async function fetchAchievements(): Promise<Achievement[]> {
  await delay(400);
  return mockAchievements;
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  await delay(400);
  return mockLeaderboard;
}

// AI API integration points
export async function generateAITextSuggestions(
  _prompt: string,
  type: 'caption' | 'hashtag' | 'idea'
): Promise<AITextSuggestion[]> {
  await delay(1000);
  const suggestions: Record<string, AITextSuggestion[]> = {
    caption: [
      { id: 'ai1', type: 'caption', content: 'Living my best life ✨ #goodvibes' },
      { id: 'ai2', type: 'caption', content: 'Every day is a new adventure 🌟' },
      { id: 'ai3', type: 'caption', content: 'Creating memories one moment at a time 📸' },
    ],
    hashtag: [
      { id: 'ai4', type: 'hashtag', content: '#photography #nature #travel #explore #adventure' },
      { id: 'ai5', type: 'hashtag', content: '#creativity #art #design #inspiration #trending' },
    ],
    idea: [
      {
        id: 'ai6',
        type: 'idea',
        content: 'Share a behind-the-scenes look at your creative process',
      },
      { id: 'ai7', type: 'idea', content: 'Create a poll asking followers about their preferences' },
    ],
  };
  return suggestions[type] || [];
}

export async function generateAIImageSuggestions(): Promise<AIImageSuggestion[]> {
  await delay(1200);
  return [
    { id: 'img1', type: 'style', name: 'Warm Vintage', preview: '' },
    { id: 'img2', type: 'style', name: 'Cool Modern', preview: '' },
    { id: 'img3', type: 'filter', name: 'Soft Glow', preview: '' },
    { id: 'img4', type: 'filter', name: 'High Contrast', preview: '' },
  ];
}

export async function generateContentOptimizations(
  _content: string
): Promise<AIContentOptimization[]> {
  await delay(900);
  return [
    {
      id: 'opt1',
      suggestion: 'Add 2-3 relevant hashtags to increase discoverability',
      category: 'reach',
    },
    {
      id: 'opt2',
      suggestion: 'Best time to post: Tuesdays and Thursdays at 10 AM',
      category: 'timing',
    },
    {
      id: 'opt3',
      suggestion: 'Include a question to boost engagement by up to 50%',
      category: 'engagement',
    },
  ];
}
