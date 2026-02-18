import { Router } from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, (req, res) => {
  return res.json(store.getPosts(req.userId));
});

router.post('/', authenticate, (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' });
  }
  const post = store.createPost(req.userId, content.trim());
  return res.status(201).json(post);
});

router.post('/:id/like', authenticate, (req, res) => {
  const result = store.toggleLike(req.params.id, req.userId);
  if (!result) return res.status(404).json({ error: 'Post not found' });
  return res.json(result);
});

router.post('/:id/share', authenticate, (req, res) => {
  const result = store.toggleShare(req.params.id, req.userId);
  if (!result) return res.status(404).json({ error: 'Post not found' });
  return res.json(result);
});

router.post('/:id/comments', authenticate, (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' });
  }
  const comment = store.addComment(req.params.id, req.userId, content.trim());
  if (!comment) return res.status(404).json({ error: 'Post not found' });
  return res.status(201).json(comment);
});

export default router;
