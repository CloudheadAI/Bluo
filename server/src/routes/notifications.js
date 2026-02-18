import { Router } from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, (req, res) => {
  return res.json(store.getNotifications(req.userId));
});

router.patch('/:id/read', authenticate, (req, res) => {
  store.markNotificationRead(req.params.id, req.userId);
  return res.status(204).end();
});

router.patch('/read-all', authenticate, (req, res) => {
  store.markAllNotificationsRead(req.userId);
  return res.status(204).end();
});

export default router;
