// Runs only when no ANTHROPIC_API_KEY is set. It is a rule-based stand-in, not a real examiner:
// it checks the mechanical things a computer can check so the interface stays usable end to end.

const SLIPS = [
  [/\bi\b/g, 'I', 'spelling', 'The pronoun "I" is always capitalised.'],
  [/\bdont\b/gi, "don't", 'punctuation', 'Contractions need an apostrophe.'],
  [/\bcant\b/gi, "can't", 'punctuation', 'Contractions need an apostrophe.'],
  [/\bteh\b/gi, 'the', 'spelling', 'Common typo.'],
  [/\brecieve\b/gi, 'receive', 'spelling', 'i before e except after c.'],
  [/\bnowdays\b/gi, 'nowadays', 'spelling', 'One word, with an "a".'],
  [/\bacheive\b/gi, 'achieve', 'spelling', 'i before e except after c.'],
  [/\balot\b/gi, 'a lot', 'spelling', '"A lot" is two words.'],
  [/\badvices\b/gi, 'advice', 'grammar', '"Advice" is uncountable.'],
  [/\binformations\b/gi, 'information', 'grammar', '"Information" is uncountable.'],
  [/\bpeoples\b/gi, 'people', 'grammar', '"People" is already plural.'],
  [/\bresearches\b/gi, 'research', 'grammar', '"Research" is uncountable.'],
  [/\bdiscuss about\b/gi, 'discuss', 'grammar', '"Discuss" takes no preposition.'],
  [/\bin nowadays\b/gi, 'nowadays', 'grammar', 'No preposition before "nowadays".'],
  [/\bgood in\b/gi, 'good at', 'collocation', 'We are good AT something.'],
  [/\bdepend of\b/gi, 'depend on', 'collocation', '"Depend" pairs with "on".'],
  [/\bmore better\b/gi, 'better', 'grammar', 'Double comparative.'],
  [/\bvery unique\b/gi, 'unique', 'word choice', '"Unique" is absolute.'],
  [/\bbasically\b/gi, '', 'register', 'Filler word; delete it in academic writing.'],
  [/\bkinda\b/gi, 'rather', 'register', 'Too informal for the exam.']
];

const BASIC = /\b(good|bad|big|small|thing|things|nice|very|a lot of|lots of|stuff)\b/gi;

function scan(text) {
  const corrections = [];
  let corrected = text;
  for (const [re, fix, type, why] of SLIPS) {
    const hits = text.match(re);
    if (hits) {
      corrections.push({ original: hits[0], fixed: fix || '(delete)', type, why });
      corrected = corrected.replace(re, fix);
    }
  }
  return { corrected, corrections };
}

function stats(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const avg = sentences.length ? Math.round(words.length / sentences.length) : 0;
  const basic = (text.match(BASIC) || []).length;
  return { words: words.length, sentences: sentences.length, avg, basic };
}

function estimate(s) {
  let band = 6;
  if (s.words > 220) band += 0.5;
  if (s.avg >= 12 && s.avg <= 22) band += 0.5;
  if (s.basic > 6) band -= 0.5;
  if (s.words < 120) band -= 1;
  return Math.max(4, Math.min(7.5, band));
}

const NOTICE =
  'Offline mode: no API key is set, so this is a mechanical check, not examiner marking. ' +
  'Add ANTHROPIC_API_KEY to your .env file and restart to get real band feedback.';

export function offlineReview(mode, messages) {
  const text = String(messages[messages.length - 1]?.content || '');
  const body = text.replace(/^[\s\S]*?---\s*/, '');
  const s = stats(body);
  const { corrected, corrections } = scan(body);
  const band = estimate(s);

  if (mode === 'grammar') {
    return JSON.stringify({ corrected, corrections, note: NOTICE });
  }

  if (mode === 'writing' || mode === 'speaking') {
    const names = mode === 'writing'
      ? ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy']
      : ['Fluency and Coherence', 'Lexical Resource', 'Grammatical Range and Accuracy', 'Pronunciation'];
    return JSON.stringify({
      overall: band,
      criteria: names.map((name) => ({
        name,
        band,
        comment: `Estimated from length and sentence variety only. ${NOTICE}`
      })),
      corrections,
      strengths: [`${s.words} words across ${s.sentences} sentences, averaging ${s.avg} words each.`],
      upgrades: [],
      priorities: [
        s.words < 250 ? 'Write more: Task 2 needs at least 250 words.' : 'Length is on target.',
        s.basic > 4 ? `Replace ${s.basic} very common words such as "good", "thing" and "very".` : 'Keep varying your vocabulary.',
        'Add the API key to get marking against the real band descriptors.'
      ],
      wordCountNote: `${s.words} words.`,
      improvedParagraph: '',
      modelAnswer: ''
    });
  }

  if (mode === 'interview') {
    const pool = [
      'Let us talk about where you live. What kind of place is it?',
      'Do you prefer studying in the morning or in the evening? Why?',
      'How often do you use English outside the classroom?',
      'Tell me about a skill you would like to learn.'
    ];
    return pool[messages.length % pool.length];
  }

  return NOTICE;
}
