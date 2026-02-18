import { Router } from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/conversations', authenticate, (req, res) => {
  return res.json(store.getConversations(req.userId));
});

export default router;
