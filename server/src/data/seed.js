import { store } from './store.js';

export function loadSeedData() {
  // ─── Users ──────────────────────────────────────────────
  store.addUser({
    id: '1', username: 'johndoe', email: 'john@example.com', password: 'password',
    displayName: 'John Doe', bio: 'Creative thinker | Tech enthusiast | Coffee lover ☕',
    followersCount: 1240, followingCount: 530, postsCount: 89, points: 2450,
    badges: [
      { id: 'b1', name: 'Early Adopter', description: 'Joined in the first month', icon: '🌟' },
      { id: 'b2', name: 'Social Butterfly', description: '100+ followers', icon: '🦋' },
    ],
    subscriptionTier: 'free', createdAt: '2025-01-15T10:00:00Z',
  });

  store.addUser({
    id: '2', username: 'janedoe', email: 'jane@example.com', password: 'password',
    displayName: 'Jane Doe', bio: 'Designer & artist 🎨',
    followersCount: 3500, followingCount: 200, postsCount: 156, points: 5200,
    badges: [{ id: 'b3', name: 'Top Creator', description: 'Top 10 on leaderboard', icon: '🏆' }],
    subscriptionTier: 'pro', createdAt: '2025-02-01T10:00:00Z', isFollowing: true,
  });

  store.addUser({
    id: '3', username: 'alexsmith', email: 'alex@example.com', password: 'password',
    displayName: 'Alex Smith', bio: 'Photographer | Traveler 📸',
    followersCount: 8200, followingCount: 450, postsCount: 312, points: 9800,
    badges: [
      { id: 'b4', name: 'Influencer', description: '5000+ followers', icon: '⭐' },
      { id: 'b3', name: 'Top Creator', description: 'Top 10 on leaderboard', icon: '🏆' },
    ],
    subscriptionTier: 'premium', createdAt: '2025-01-05T10:00:00Z', isFollowing: false,
  });

  // ─── Posts ──────────────────────────────────────────────
  store.seedPost({
    id: 'p1', authorId: '2',
    content: 'Just finished a new design project! What do you think? 🎨✨',
    likes: 42, likedBy: new Set(),
    comments: [{
      id: 'c1', authorId: '1', content: 'Looks amazing! Great work! 🙌',
      likes: 5, createdAt: '2026-02-17T12:00:00Z',
    }],
    shares: 8, sharedBy: new Set(),
    createdAt: '2026-02-17T10:00:00Z',
  });

  store.seedPost({
    id: 'p2', authorId: '3',
    content: 'Captured this beautiful sunset during my trip to the mountains. Nature never ceases to amaze me. 🌄',
    likes: 128, likedBy: new Set(['1']),
    shares: 24, sharedBy: new Set(),
    createdAt: '2026-02-16T18:30:00Z',
  });

  store.seedPost({
    id: 'p3', authorId: '1',
    content: 'Excited to share my thoughts on the future of AI in creative workflows! 🤖',
    likes: 15, likedBy: new Set(),
    shares: 3, sharedBy: new Set(),
    createdAt: '2026-02-16T09:00:00Z',
  });

  // ─── Notifications (for johndoe) ────────────────────────
  store.addNotification('1', {
    id: 'n1', type: 'like', fromUserId: '2', message: 'liked your post',
    read: false, postId: 'p3', createdAt: '2026-02-17T14:00:00Z',
  });
  store.addNotification('1', {
    id: 'n2', type: 'follow', fromUserId: '3', message: 'started following you',
    read: false, createdAt: '2026-02-17T12:00:00Z',
  });
  store.addNotification('1', {
    id: 'n3', type: 'comment', fromUserId: '2', message: 'commented on your post',
    read: true, postId: 'p3', createdAt: '2026-02-16T10:00:00Z',
  });
  store.addNotification('1', {
    id: 'n4', type: 'achievement', fromUserId: '1',
    message: 'You earned the "Social Butterfly" badge!',
    read: true, createdAt: '2026-02-15T08:00:00Z',
  });

  // ─── Conversations (for johndoe) ────────────────────────
  store.addConversation('1', {
    id: 'conv1', participantId: '2',
    lastMessage: {
      id: 'm1', senderId: '2', receiverId: '1',
      content: 'Hey! Did you see my new design?',
      read: false, createdAt: '2026-02-17T15:00:00Z',
    },
    unreadCount: 2,
  });
  store.addConversation('1', {
    id: 'conv2', participantId: '3',
    lastMessage: {
      id: 'm2', senderId: '1', receiverId: '3',
      content: 'Those photos are incredible!',
      read: true, createdAt: '2026-02-16T20:00:00Z',
    },
    unreadCount: 0,
  });

  // ─── Achievements ───────────────────────────────────────
  store.setAchievements([
    { id: 'a1', name: 'First Post', description: 'Create your first post', icon: '📝',
      requiredPoints: 10, badge: { id: 'b5', name: 'First Post', description: 'Created first post', icon: '📝' },
      progress: 100, completed: true },
    { id: 'a2', name: 'Social Butterfly', description: 'Get 100 followers', icon: '🦋',
      requiredPoints: 500, badge: { id: 'b2', name: 'Social Butterfly', description: '100+ followers', icon: '🦋' },
      progress: 100, completed: true },
    { id: 'a3', name: 'Viral Sensation', description: 'Get 1000 likes on a single post', icon: '🔥',
      requiredPoints: 1000, badge: { id: 'b6', name: 'Viral Sensation', description: '1000 likes on a post', icon: '🔥' },
      progress: 42, completed: false },
    { id: 'a4', name: 'Consistent Creator', description: 'Post every day for 30 days', icon: '📅',
      requiredPoints: 750, badge: { id: 'b7', name: 'Consistent Creator', description: '30-day streak', icon: '📅' },
      progress: 60, completed: false },
    { id: 'a5', name: 'Community Leader', description: 'Earn 10,000 total points', icon: '👑',
      requiredPoints: 2000, badge: { id: 'b8', name: 'Community Leader', description: '10K points', icon: '👑' },
      progress: 25, completed: false },
  ]);

  // ─── Leaderboard ────────────────────────────────────────
  store.addLeaderboardEntry({ rank: 1, userId: '3', points: 9800 });
  store.addLeaderboardEntry({ rank: 2, userId: '2', points: 5200 });
  store.addLeaderboardEntry({ rank: 3, userId: '1', points: 2450 });

  // ─── Stories ────────────────────────────────────────────
  store.addStory({
    authorId: '2', content: 'Working on something exciting! Stay tuned 🎨',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  });
  store.addStory({
    authorId: '3', content: 'Golden hour at the summit 🏔️✨',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  });
  store.addStory({
    authorId: '2', content: 'New palette drop — thoughts? 🎨💜',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  });
}
