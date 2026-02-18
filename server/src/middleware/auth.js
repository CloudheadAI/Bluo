import { store } from '../data/store.js';

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const token = header.slice(7);
  const userId = store.getUserIdByToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  const user = store.findUserById(userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  req.userId = userId;
  req.user = user;
  next();
}
