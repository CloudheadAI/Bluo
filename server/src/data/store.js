import { randomUUID } from 'node:crypto';

class Store {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.posts = [];
    this.notifications = new Map();
    this.conversations = new Map();
    this.achievements = [];
    this.leaderboard = [];
    this.stories = [];
  }

  // ─── Users ──────────────────────────────────────────────

  addUser(data) {
    const user = {
      id: data.id || randomUUID(),
      username: data.username,
      email: data.email,
      password: data.password || 'password',
      displayName: data.displayName || data.username,
      bio: data.bio || '',
      avatarUrl: data.avatarUrl || '',
      coverUrl: data.coverUrl || '',
      followersCount: data.followersCount || 0,
      followingCount: data.followingCount || 0,
      postsCount: data.postsCount || 0,
      points: data.points || 0,
      badges: data.badges || [],
      subscriptionTier: data.subscriptionTier || 'free',
      createdAt: data.createdAt || new Date().toISOString(),
      isFollowing: data.isFollowing || false,
    };
    this.users.set(user.id, user);
    return user;
  }

  findUserByEmail(email) {
    for (const u of this.users.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  findUserById(id) {
    return this.users.get(id) || null;
  }

  publicUser(user) {
    if (!user) return null;
    const { password: _pw, ...pub } = user;
    return pub;
  }

  updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  // ─── Sessions ───────────────────────────────────────────

  createSession(userId) {
    const token = randomUUID();
    this.sessions.set(token, userId);
    return token;
  }

  getUserIdByToken(token) {
    return this.sessions.get(token) || null;
  }

  deleteSession(token) {
    this.sessions.delete(token);
  }

  // ─── Posts ──────────────────────────────────────────────

  seedPost(data) {
    const post = {
      id: data.id || randomUUID(),
      authorId: data.authorId,
      content: data.content,
      images: data.images || [],
      videos: data.videos || [],
      likes: data.likes || 0,
      likedBy: data.likedBy || new Set(),
      comments: (data.comments || []).map(c => ({
        id: c.id || randomUUID(),
        authorId: c.authorId,
        postId: data.id,
        content: c.content,
        likes: c.likes || 0,
        likedBy: c.likedBy || new Set(),
        createdAt: c.createdAt || new Date().toISOString(),
      })),
      shares: data.shares || 0,
      sharedBy: data.sharedBy || new Set(),
      createdAt: data.createdAt || new Date().toISOString(),
    };
    this.posts.push(post);
    return post;
  }

  getPosts(requesterId) {
    return [...this.posts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(p => this.formatPost(p, requesterId));
  }

  createPost(authorId, content) {
    const post = {
      id: randomUUID(),
      authorId,
      content,
      images: [],
      videos: [],
      likes: 0,
      likedBy: new Set(),
      comments: [],
      shares: 0,
      sharedBy: new Set(),
      createdAt: new Date().toISOString(),
    };
    this.posts.unshift(post);
    const user = this.findUserById(authorId);
    if (user) user.postsCount++;
    return this.formatPost(post, authorId);
  }

  toggleLike(postId, userId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;
    if (post.likedBy.has(userId)) {
      post.likedBy.delete(userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.add(userId);
      post.likes++;
    }
    return { isLiked: post.likedBy.has(userId), likes: post.likes };
  }

  toggleShare(postId, userId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;
    if (post.sharedBy.has(userId)) {
      post.sharedBy.delete(userId);
      post.shares = Math.max(0, post.shares - 1);
    } else {
      post.sharedBy.add(userId);
      post.shares++;
    }
    return { isShared: post.sharedBy.has(userId), shares: post.shares };
  }

  addComment(postId, authorId, content) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;
    const comment = {
      id: randomUUID(),
      authorId,
      postId,
      content,
      likes: 0,
      likedBy: new Set(),
      createdAt: new Date().toISOString(),
    };
    post.comments.push(comment);
    return this.formatComment(comment, authorId);
  }

  formatPost(post, requesterId) {
    return {
      id: post.id,
      author: this.publicUser(this.findUserById(post.authorId)),
      content: post.content,
      images: post.images,
      videos: post.videos,
      likes: post.likes,
      comments: post.comments.map(c => this.formatComment(c, requesterId)),
      shares: post.shares,
      isLiked: post.likedBy.has(requesterId),
      isShared: post.sharedBy.has(requesterId),
      createdAt: post.createdAt,
    };
  }

  formatComment(comment, requesterId) {
    return {
      id: comment.id,
      author: this.publicUser(this.findUserById(comment.authorId)),
      postId: comment.postId,
      content: comment.content,
      likes: comment.likes,
      isLiked: comment.likedBy.has(requesterId),
      createdAt: comment.createdAt,
    };
  }

  // ─── Notifications ──────────────────────────────────────

  addNotification(userId, data) {
    if (!this.notifications.has(userId)) this.notifications.set(userId, []);
    const notif = {
      id: data.id || randomUUID(),
      type: data.type,
      fromUserId: data.fromUserId,
      message: data.message,
      read: data.read || false,
      postId: data.postId,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    this.notifications.get(userId).push(notif);
    return notif;
  }

  getNotifications(userId) {
    return (this.notifications.get(userId) || [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(n => ({
        id: n.id,
        type: n.type,
        fromUser: this.publicUser(this.findUserById(n.fromUserId)),
        message: n.message,
        read: n.read,
        postId: n.postId,
        createdAt: n.createdAt,
      }));
  }

  markNotificationRead(notifId, userId) {
    const list = this.notifications.get(userId) || [];
    const n = list.find(x => x.id === notifId);
    if (n) n.read = true;
    return !!n;
  }

  markAllNotificationsRead(userId) {
    const list = this.notifications.get(userId) || [];
    list.forEach(n => { n.read = true; });
  }

  // ─── Conversations ─────────────────────────────────────

  addConversation(userId, data) {
    if (!this.conversations.has(userId)) this.conversations.set(userId, []);
    this.conversations.get(userId).push({
      id: data.id || randomUUID(),
      participantId: data.participantId,
      lastMessage: data.lastMessage,
      unreadCount: data.unreadCount || 0,
    });
  }

  getConversations(userId) {
    return (this.conversations.get(userId) || []).map(c => ({
      id: c.id,
      participant: this.publicUser(this.findUserById(c.participantId)),
      lastMessage: c.lastMessage,
      unreadCount: c.unreadCount,
    }));
  }

  // ─── Gamification ───────────────────────────────────────

  setAchievements(data) { this.achievements = data; }
  getAchievements() { return this.achievements; }

  addLeaderboardEntry(data) { this.leaderboard.push(data); }

  getLeaderboard() {
    return this.leaderboard
      .sort((a, b) => a.rank - b.rank)
      .map(e => ({
        rank: e.rank,
        user: this.publicUser(this.findUserById(e.userId)),
        points: e.points,
      }));
  }

  addPoints(userId, amount) {
    const user = this.findUserById(userId);
    if (!user) return null;
    user.points += amount;
    return { points: user.points };
  }

  // ─── Stories ────────────────────────────────────────────

  addStory(data) {
    const story = {
      id: data.id || randomUUID(),
      authorId: data.authorId,
      content: data.content || '',
      createdAt: data.createdAt || new Date().toISOString(),
      expiresAt: data.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      viewedBy: new Set(),
    };
    this.stories.push(story);
    return story;
  }

  getStories(requesterId) {
    const now = new Date();
    return this.stories
      .filter(s => new Date(s.expiresAt) > now)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(s => ({
        id: s.id,
        author: this.publicUser(this.findUserById(s.authorId)),
        content: s.content,
        createdAt: s.createdAt,
        expiresAt: s.expiresAt,
        viewed: s.viewedBy.has(requesterId),
      }));
  }

  markStoryViewed(storyId, userId) {
    const story = this.stories.find(s => s.id === storyId);
    if (story) story.viewedBy.add(userId);
    return !!story;
  }
}

export const store = new Store();
