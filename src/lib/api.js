const ENDPOINT = '/api/coach';

export async function coach(mode, messages, maxTokens = 2000) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ mode, messages, maxTokens })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'The coach could not be reached.');
  return data;
}

// The model is asked for raw JSON, but strip fences defensively.
export function parseJSON(text) {
  const cleaned = String(text || '')
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('The coach replied in an unexpected format. Try again.');
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function health() {
  try {
    const r = await fetch('/api/health');
    return await r.json();
  } catch {
    return { ok: false, live: false };
  }
}
