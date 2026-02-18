import { Router } from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/achievements', authenticate, (_req, res) => {
  return res.json(store.getAchievements());
});

router.get('/leaderboard', authenticate, (_req, res) => {
  return res.json(store.getLeaderboard());
});

router.post('/points', authenticate, (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'A positive amount is required' });
  }
  const result = store.addPoints(req.userId, amount);
  if (!result) return res.status(404).json({ error: 'User not found' });
  return res.json(result);
});

export default router;
