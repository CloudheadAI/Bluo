import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import paymentsRouter from './routes/payments.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

// API routes
app.use('/api/payments', paymentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(env.port, () => {
  console.log(`Bluo server running on port ${env.port}`);
});

export default app;
