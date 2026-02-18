import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const textSuggestions = {
  caption: [
    { id: 'ai1', type: 'caption', content: 'Living my best life ✨ #goodvibes' },
    { id: 'ai2', type: 'caption', content: 'Every day is a new adventure 🌟' },
    { id: 'ai3', type: 'caption', content: 'Creating memories one moment at a time 📸' },
  ],
  hashtag: [
    { id: 'ai4', type: 'hashtag', content: '#photography #nature #travel #explore #adventure' },
    { id: 'ai5', type: 'hashtag', content: '#creativity #art #design #inspiration #trending' },
  ],
  idea: [
    { id: 'ai6', type: 'idea', content: 'Share a behind-the-scenes look at your creative process' },
    { id: 'ai7', type: 'idea', content: 'Create a poll asking followers about their preferences' },
  ],
};

const imageSuggestions = [
  { id: 'img1', type: 'style', name: 'Warm Vintage', preview: '' },
  { id: 'img2', type: 'style', name: 'Cool Modern', preview: '' },
  { id: 'img3', type: 'filter', name: 'Soft Glow', preview: '' },
  { id: 'img4', type: 'filter', name: 'High Contrast', preview: '' },
];

const contentOptimizations = [
  { id: 'opt1', suggestion: 'Add 2-3 relevant hashtags to increase discoverability', category: 'reach' },
  { id: 'opt2', suggestion: 'Best time to post: Tuesdays and Thursdays at 10 AM', category: 'timing' },
  { id: 'opt3', suggestion: 'Include a question to boost engagement by up to 50%', category: 'engagement' },
];

router.post('/text-suggestions', authenticate, (req, res) => {
  const { type } = req.body;
  if (!type || !textSuggestions[type]) {
    return res.status(400).json({ error: 'Invalid suggestion type' });
  }
  return res.json(textSuggestions[type]);
});

router.get('/image-suggestions', authenticate, (_req, res) => {
  return res.json(imageSuggestions);
});

router.post('/content-optimizations', authenticate, (_req, res) => {
  return res.json(contentOptimizations);
});

export default router;
