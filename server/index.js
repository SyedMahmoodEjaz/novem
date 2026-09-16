import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { PROMPTS } from './prompts.js';
import { offlineReview } from './offline.js';
import { resolveProvider, complete } from './providers.js';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5174;
const provider = resolveProvider();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    live: Boolean(provider),
    provider: provider?.id || 'offline',
    model: provider?.model || null
  });
});

app.post('/api/coach', async (req, res) => {
  const { mode, messages = [], maxTokens = 2000 } = req.body || {};
  const preset = PROMPTS[mode];

  if (!preset) return res.status(400).json({ error: `Unknown mode "${mode}".` });
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Send at least one message.' });
  }

  if (!provider) {
    return res.json({ live: false, text: offlineReview(mode, messages) });
  }

  try {
    const text = await complete(
      provider,
      preset.system,
      messages.map((m) => ({ role: m.role, content: String(m.content) })),
      maxTokens
    );
    res.json({ live: true, provider: provider.id, text });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: err.message || 'Could not reach the marking engine.' });
  }
});
const dist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(path.join(dist, 'index.html'))) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('*', (_req, res) =>
    res.status(404).send('Open the app at http://localhost:5173 while running npm run dev.'));
}


app.listen(PORT, () => {
  console.log(`\n  NOVEM server on http://localhost:${PORT}`);
  console.log(provider
    ? `  Marking engine: ${provider.id} (${provider.model})\n`
    : '  Marking engine: offline mode — no API key found in .env\n');
});
