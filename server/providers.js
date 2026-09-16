// One function, three providers. Whichever key is present in .env gets used.
// All of them take the same shape: a system prompt plus alternating user/assistant messages.

export function resolveProvider() {
  const forced = (process.env.PROVIDER || '').toLowerCase();

  const options = [
    { id: 'groq', key: process.env.GROQ_API_KEY, model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile' },
    { id: 'gemini', key: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL || 'gemini-2.0-flash' },
    { id: 'anthropic', key: process.env.ANTHROPIC_API_KEY, model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5' }
  ];

  if (forced) {
    const picked = options.find((o) => o.id === forced);
    if (picked?.key) return picked;
  }
  return options.find((o) => o.key) || null;
}

async function callGroq({ key, model }, system, messages, maxTokens) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'system', content: system }, ...messages]
    })
  });
  if (!r.ok) throw await httpError(r, 'Groq');
  const data = await r.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function callGemini({ key, model }, system, messages, maxTokens) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content) }]
      })),
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.4 }
    })
  });
  if (!r.ok) throw await httpError(r, 'Gemini');
  const data = await r.json();
  return (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
}

async function callAnthropic({ key, model }, system, messages, maxTokens) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages })
  });
  if (!r.ok) throw await httpError(r, 'Anthropic');
  const data = await r.json();
  return (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
}

async function httpError(res, name) {
  const detail = await res.text().catch(() => '');
  console.error(`${name} error ${res.status}: ${detail}`);
  if (res.status === 401 || res.status === 403) {
    return new Error(`${name} rejected the key. Check it in your .env file.`);
  }
  if (res.status === 429) {
    return new Error(`${name} free tier is rate limited right now. Wait a minute and try again.`);
  }
  if (res.status === 404) {
    return new Error(`${name} does not recognise that model name. Pick a current one from their console and update .env.`);
  }
  return new Error(`${name} returned ${res.status}. Try again in a moment.`);
}

export async function complete(provider, system, messages, maxTokens) {
  const args = [provider, system, messages, maxTokens];
  if (provider.id === 'groq') return callGroq(...args);
  if (provider.id === 'gemini') return callGemini(...args);
  return callAnthropic(...args);
}
