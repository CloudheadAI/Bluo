import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import { loadSeedData } from './data/seed.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import notificationsRouter from './routes/notifications.js';
import messagesRouter from './routes/messages.js';
import gamificationRouter from './routes/gamification.js';
import aiRouter from './routes/ai.js';
import storiesRouter from './routes/stories.js';
import paymentsRouter from './routes/payments.js';

loadSeedData();

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

// Request timing
app.use((req, _res, next) => {
  req._startTime = Date.now();
  next();
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/gamification', gamificationRouter);
app.use('/api/ai', aiRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/payments', paymentsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(env.port, () => {
  console.log(`Bluo server running on port ${env.port}`);
});

export default app;
