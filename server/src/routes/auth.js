import { Router } from 'express';
import { store } from '../data/store.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = store.findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = store.createSession(user.id);
  return res.json({ user: store.publicUser(user), token });
});

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  if (store.findUserByEmail(email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const user = store.addUser({ username, email, password, displayName: username });
  const token = store.createSession(user.id);
  return res.json({ user: store.publicUser(user), token });
});

router.post('/reset-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  return res.status(204).end();
});

export default router;
