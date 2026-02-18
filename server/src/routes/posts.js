import { Router } from 'express';

const router = Router();

/**
 * GET /api/posts
 * Placeholder for fetching posts from a real database.
 */
router.get('/', (_req, res) => {
  res.status(501).json({ error: 'Posts endpoint not yet implemented – use mock data for demos' });
});

/**
 * POST /api/posts
 * Placeholder for creating posts.
 */
router.post('/', (_req, res) => {
  res.status(501).json({ error: 'Posts endpoint not yet implemented – use mock data for demos' });
});

export default router;
