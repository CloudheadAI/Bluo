import { Router } from 'express';

const router = Router();

/**
 * POST /api/auth/login
 * Placeholder for production authentication.
 */
router.post('/login', (_req, res) => {
  res.status(501).json({ error: 'Auth endpoint not yet implemented – use mock data for demos' });
});

/**
 * POST /api/auth/register
 * Placeholder for production registration.
 */
router.post('/register', (_req, res) => {
  res.status(501).json({ error: 'Auth endpoint not yet implemented – use mock data for demos' });
});

export default router;
