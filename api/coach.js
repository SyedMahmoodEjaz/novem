// Vercel serverless function. Mirrors POST /api/coach from the local Express server.
import { PROMPTS } from '../server/prompts.js';
import { offlineReview } from '../server/offline.js';
import { resolveProvider, complete } from '../server/providers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const { mode, messages = [], maxTokens = 2000 } = body;
  const preset = PROMPTS[mode];

  if (!preset) return res.status(400).json({ error: `Unknown mode "${mode}".` });
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Send at least one message.' });
  }

  const provider = resolveProvider();
  if (!provider) return res.status(200).json({ live: false, text: offlineReview(mode, messages) });

  try {
    const text = await complete(
      provider,
      preset.system,
      messages.map((m) => ({ role: m.role, content: String(m.content) })),
      maxTokens
    );
    return res.status(200).json({ live: true, provider: provider.id, text });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: err.message || 'Could not reach the marking engine.' });
  }
}
