// The 0-9 scale. Names follow the public IELTS band scale; the descriptions are written
// for candidates rather than examiners.
export const BANDS = [
  { n: 9, name: 'Expert user', desc: 'You handle English completely. Meaning is precise, mistakes are rare and accidental, and nobody has to work to follow you.' },
  { n: 8, name: 'Very good user', desc: 'Full command with occasional slips. You handle complicated argument well and only lose accuracy under pressure or in unfamiliar topics.' },
  { n: 7, name: 'Good user', desc: 'You use English effectively despite some inaccuracy. Most universities in the UK, Australia and Canada ask for 6.5 to 7 overall.' },
  { n: 6, name: 'Competent user', desc: 'Generally effective, with mistakes and misunderstandings in unfamiliar situations. This is the usual minimum for undergraduate entry and many visa routes.' },
  { n: 5, name: 'Modest user', desc: 'You cope with basic communication in your own field but make many errors. Common cut-off for foundation programmes and some work visas.' },
  { n: 4, name: 'Limited user', desc: 'You manage familiar situations only, and complex language causes frequent breakdowns.' },
  { n: 3, name: 'Extremely limited user', desc: 'You convey and understand only the general meaning in very familiar situations.' },
  { n: 2, name: 'Intermittent user', desc: 'Communication is limited to isolated words in familiar situations.' },
  { n: 1, name: 'Non-user', desc: 'No real ability beyond a few isolated words.' },
  { n: 0, name: 'Did not attempt', desc: 'No assessable information was provided.' }
];

export const OVERALL_RULE =
  'Your overall band is the average of the four section scores, rounded to the nearest half band. ' +
  'An average ending in .25 rounds up to the next half band, and .75 rounds up to the next whole band. ' +
  'So 6.5, 6.5, 5.0, 7.0 averages 6.25 and is reported as 6.5.';

export const SECTIONS = [
  {
    id: 'listening',
    label: 'Listening',
    time: '30 min + 10 min transfer',
    parts: '4 recordings, 40 questions',
    marking: 'One mark per correct answer. Raw score out of 40 converts to a band.',
    how: 'You hear each recording once. Parts 1 and 2 are everyday situations, Parts 3 and 4 are educational or academic. Question types include form completion, matching, maps and multiple choice.',
    watch: [
      'Speakers change their mind mid-sentence. The answer is what they settle on, not what they say first.',
      'Word limits are strict. "No more than two words" means three words scores zero, even if the meaning is right.',
      'Spelling and plurals are marked. "Ticket" and "tickets" are not interchangeable.',
      'Read the questions in the gap before each part. You are listening for a specific thing, not listening in general.'
    ],
    raw: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4]]
  },
  {
    id: 'reading',
    label: 'Reading',
    time: '60 min, no extra transfer time',
    parts: '3 passages, 40 questions',
    marking: 'One mark per correct answer, converted to a band. Academic and General Training use different conversion tables.',
    how: 'Academic passages come from journals, books and newspapers. General Training uses notices, adverts and workplace documents, moving from short everyday texts to one long passage.',
    watch: [
      'Answers appear in passage order for most question types, so if you are hunting backwards you have probably gone past it.',
      'True / False / Not Given is about the passage, never about what you personally know.',
      'The right answer is almost always a paraphrase. If a word matches the question exactly, suspect a trap.',
      'Copy answers straight onto the answer sheet as you go. There is no extra minute at the end.'
    ],
    raw: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4]]
  },
  {
    id: 'writing',
    label: 'Writing',
    time: '60 min (20 for Task 1, 40 for Task 2)',
    parts: '2 tasks',
    marking: 'Four criteria, equally weighted: Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy. Task 2 counts twice as much as Task 1.',
    how: 'Academic Task 1 describes a chart, table, diagram or process in at least 150 words. General Training Task 1 is a letter. Task 2 is an essay of at least 250 words answering a specific question.',
    watch: [
      'Under the word count is an automatic penalty. Count on writing 170 and 280 to be safe.',
      'Answer the exact question asked. A brilliant essay on a slightly different question caps Task Response at band 5.',
      'Do not describe a chart by listing every number. Group, compare, and name the biggest trend.',
      'Spend five minutes planning. Examiners can see an unplanned essay from the first paragraph.'
    ]
  },
  {
    id: 'speaking',
    label: 'Speaking',
    time: '11-14 min, face to face',
    parts: '3 parts',
    marking: 'Four criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation.',
    how: 'Part 1 is four to five minutes of questions about you. Part 2 is a cue card: one minute to prepare, then speak alone for up to two minutes. Part 3 is a four to five minute discussion of the wider topic.',
    watch: [
      'A memorised answer is obvious and is marked down. Prepare ideas, not scripts.',
      'Silence costs more than a mistake. Keep talking and self-correct out loud.',
      'One-sentence answers in Part 1 give the examiner nothing to mark. Give a reason or an example every time.',
      'An accent is fine. Being hard to follow is not: slow down and finish your word endings.'
    ]
  }
];

export function rawToBand(section, correct) {
  const table = SECTIONS.find((s) => s.id === section)?.raw;
  if (!table) return null;
  for (const [min, band] of table) if (correct >= min) return band;
  return 3.5;
}
