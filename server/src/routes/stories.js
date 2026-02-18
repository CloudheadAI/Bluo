import { Router } from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, (req, res) => {
  return res.json(store.getStories(req.userId));
});

router.post('/', authenticate, (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' });
  }
  const story = store.addStory({ authorId: req.userId, content: content.trim() });
  const formatted = store.getStories(req.userId).find(s => s.id === story.id);
  return res.status(201).json(formatted);
});

router.post('/:id/view', authenticate, (req, res) => {
  store.markStoryViewed(req.params.id, req.userId);
  return res.status(204).end();
});

export default router;
