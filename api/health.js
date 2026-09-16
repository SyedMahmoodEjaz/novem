import { resolveProvider } from '../server/providers.js';

export default function handler(_req, res) {
  const provider = resolveProvider();
  res.status(200).json({
    ok: true,
    live: Boolean(provider),
    provider: provider?.id || 'offline',
    model: provider?.model || null
  });
}
