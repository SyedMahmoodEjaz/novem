// The examiner's playbook: what each section actually contains, the question types that
// appear, and the rules that separate a band 5.5 from a band 7.

export const LISTENING_PARTS = [
  {
    part: 'Part 1',
    context: 'Everyday social or practical situation',
    speakers: '2 people',
    level: 'Easy',
    tests: 'Booking a hotel, opening a bank account, a job enquiry. Names, phone numbers, postcodes, dates, basic facts.'
  },
  {
    part: 'Part 2',
    context: 'General community or social context',
    speakers: '1 person',
    level: 'Moderate',
    tests: 'A tour guide explaining a park, a museum, or an orientation. Map and diagram labelling, multiple choice.'
  },
  {
    part: 'Part 3',
    context: 'Academic or educational context',
    speakers: '2 to 4 people',
    level: 'Challenging',
    tests: 'University students and a tutor discussing a project or thesis. Fast turn-taking, opinions, agreeing and disagreeing.'
  },
  {
    part: 'Part 4',
    context: 'Academic lecture',
    speakers: '1 person',
    level: 'Hard',
    tests: 'A continuous university lecture on biology, history, architecture. No pauses in the middle. Dense note and summary completion.'
  }
];

export const LISTENING_TYPES = [
  { name: 'Form, note, table and flow-chart completion', where: 'Most common in Parts 1 and 4. Gap-fill.' },
  { name: 'Multiple choice, single and multi-select', where: 'Dominates Parts 2 and 3. Heavy use of distractors.' },
  { name: 'Map, plan and diagram labelling', where: 'A Part 2 staple. Directional vocabulary and prepositions.' },
  { name: 'Matching features and classifications', where: 'A Part 3 staple. Matching opinions and findings to people.' },
  { name: 'Sentence completion', where: 'Strict word count constraints.' },
  { name: 'Short-answer questions', where: 'Strict word count constraints.' }
];

export const LISTENING_RULES = [
  {
    rule: 'Read ahead and predict the word type',
    body: 'You get 30 to 45 seconds before each section. Do not sit passively. Underline the keywords and decide what kind of word fits the blank.',
    example: '"Cost of annual membership: £ _____" means a number is coming. "The research focused mainly on marine _____" means a plural or uncountable noun, such as habitats or mammals.'
  },
  {
    rule: 'Beware the self-correction trap',
    body: 'The speaker will almost always give the wrong answer first. Always listen through the pause before you commit.',
    example: '"Let us meet at 2:30... oh wait, my meeting runs late, so let us make it 3:15 instead." Writing 2:30 loses the mark.'
  },
  {
    rule: 'You will never hear the exact printed words',
    body: 'What is printed on your paper is a synonym of what you will hear. Listen for the idea, not the word.',
    example: 'Paper: "The project was postponed due to limited resources." Audio: "We had to put the study on hold because we ran out of funding."'
  },
  {
    rule: 'Terminal s and plurals are marked',
    body: 'If the speaker says "libraries" and you write "library", the answer is 100% incorrect. If a word ends in -s or -ed, write it down.',
    example: ''
  },
  {
    rule: 'The word count is strict',
    body: 'Read the instruction every single time. "No more than one word and/or a number" means exactly that.',
    example: 'If the answer is "a train", writing "the train" scores zero. You must write only "train".'
  }
];

export const READING_PASSAGES = [
  { n: 'Passage 1', desc: 'Descriptive or factual text on a general academic or everyday topic. Easiest vocabulary, straightforward order of information.' },
  { n: 'Passage 2', desc: 'Informative or analytical text with detailed explanations, technical processes, or historical evolution. Moderate complexity.' },
  { n: 'Passage 3', desc: 'Rigorous academic discourse examining theoretical arguments, contrasting research hypotheses, or dense philosophical concepts. The most demanding vocabulary and sentence architecture.' }
];

export const READING_PLAN = [
  { part: 'Passage 1 (easy)', time: '00:00 – 15:00', count: '13–14 questions', target: '12–13 correct' },
  { part: 'Passage 2 (medium)', time: '15:00 – 35:00', count: '13–14 questions', target: '11–12 correct' },
  { part: 'Passage 3 (dense)', time: '35:00 – 55:00', count: '12–14 questions', target: '10–11 correct' },
  { part: 'Final review', time: '55:00 – 60:00', count: '—', target: 'Check blanks, spelling, capitalisation' }
];

export const READING_TYPES = [
  { name: 'True / False / Not Given and Yes / No / Not Given', note: 'Factual verification against the author\'s specific claims.' },
  { name: 'Matching headings to paragraphs', note: 'Global gist and main purpose. Read the headings before the text.' },
  { name: 'Matching information to paragraphs', note: 'Specific details, examples and reasons located in the text.' },
  { name: 'Matching features, names or theories', note: 'Connecting researchers and dates with their specific claims.' },
  { name: 'Summary, note, table and flow-chart completion', note: 'With a word box, or extracting words directly from the text.' },
  { name: 'Multiple choice, single and multi-select', note: 'Detailed deductions, main ideas, or tone.' },
  { name: 'Sentence completion and short answer', note: 'Exact words lifted from the passage.' }
];

export const READING_ORDER = {
  follows: ['True / False / Not Given', 'Multiple choice (single)', 'Sentence completion', 'Short-answer questions', 'Summary completion (usually)'],
  scattered: ['Matching headings', 'Matching information to paragraphs', 'Matching features and names'],
  tip: 'If the answer to Question 1 is in Paragraph 2, and Question 3 is in Paragraph 4, then Question 2 is strictly between them.'
};

export const READING_RULES = [
  {
    rule: 'Master the True / False / Not Given protocol',
    body: 'Never rely on background knowledge or assumptions. TRUE means the passage directly and factually proves the exact statement. FALSE means the passage states the direct opposite. NOT GIVEN means the statement mentions names or topics from the text, but the specific relationship, cause or comparison is never confirmed or denied.',
    example: 'If you find yourself guessing "maybe it means this", it is almost certainly Not Given.'
  },
  {
    rule: 'Never read the entire passage first',
    body: 'Do not waste 8 to 10 minutes reading line by line before you see the questions. Read the title and skim the first sentence of paragraph one for 30 seconds. Then look at the first question set and underline two or three anchor keywords: proper nouns, dates, technical terms, unusual nouns. Then scan for those terms or their synonyms and read intensively only around them.',
    example: ''
  },
  {
    rule: 'Track the paraphrase, not the word',
    body: 'The exam never matches the exact words in the question stem.',
    example: 'Question: "The species faced gradual extinction due to adverse climatic shifts." Passage: "The creature progressively died out as extreme weather patterns intensified." If an option uses the identical words from the text, it is frequently a distractor.'
  },
  {
    rule: 'Know which question types follow text order',
    body: 'True/False/Not Given, single multiple choice, sentence completion, short answer and usually summary completion all follow the order of the text. Matching headings, matching information to paragraphs and matching features do not. Knowing this saves minutes.',
    example: ''
  },
  {
    rule: 'Never alter the grammatical form of a lifted word',
    body: 'If the text says "reproduction", do not write "reproducing". If it says "temperatures", dropping the -s forfeits the mark. Hyphenated words such as well-being or decision-making count as one single word.',
    example: ''
  }
];

export const WRITING_WEIGHT = [
  { task: 'Task 1 (report or chart)', time: '20 minutes', words: 'Minimum 150, aim for 170–190', weight: '33% of the Writing score' },
  { task: 'Task 2 (essay)', time: '40 minutes', words: 'Minimum 250, aim for 260–290', weight: '67% of the Writing score' }
];

export const TASK1_TYPES = [
  { name: 'Line graph', desc: 'Trends over time' },
  { name: 'Bar chart', desc: 'Comparing quantities across categories' },
  { name: 'Pie chart', desc: 'Proportions and percentages' },
  { name: 'Table', desc: 'Numerical data in rows and columns' },
  { name: 'Process diagram', desc: 'Stages of a natural or manufacturing process' },
  { name: 'Map', desc: 'Changes in a location over time, or two locations compared' },
  { name: 'Mixed', desc: 'Two chart types shown together, such as a bar chart and a pie chart' }
];

export const TASK2_TYPES = [
  { name: 'Opinion (agree or disagree)', desc: 'State and support your opinion' },
  { name: 'Discussion (discuss both views)', desc: 'Present both sides, then give your opinion if asked' },
  { name: 'Advantages and disadvantages', desc: 'Weigh the pros and cons' },
  { name: 'Problem and solution', desc: 'Identify problems, propose solutions' },
  { name: 'Two-part question', desc: 'Answer two direct questions' }
];

export const TASK2_CLOCK = [
  { stage: 'Plan and brainstorm', mins: '5 min', what: 'Analyse the prompt, pick two ideas' },
  { stage: 'Draft the introduction', mins: '5 min', what: 'Paraphrase the question, then state a clear thesis' },
  { stage: 'Write the body paragraphs', mins: '25 min', what: '12 to 13 minutes each, following PEEL' },
  { stage: 'Proofread and edit', mins: '5 min', what: 'Check plurals, tenses and spelling' }
];

export const TASK2_STEPS = [
  {
    step: 'Deconstruct the prompt',
    time: '1 minute',
    body: 'Underline three things. The topic, meaning the general subject. The specific focus, meaning the exact controversy. And the instruction, meaning what they are actually asking you to do.'
  },
  {
    step: 'Choose your stance',
    time: '30 seconds',
    body: 'Decide your position clearly. Do not choose the opinion you feel most strongly about. Choose the one you have the best English vocabulary and the simplest examples to defend.'
  },
  {
    step: 'Brainstorm two strong ideas',
    time: '3.5 minutes',
    body: 'You do not need five arguments. You need two distinct points, each with a reason that explains why it happens and one concrete example that illustrates it.'
  }
];

export const PEEL = [
  { letter: 'P', word: 'Point', desc: 'State the single main idea in the topic sentence.' },
  { letter: 'E', word: 'Explanation', desc: 'Explain why or how this happens, in one or two sentences.' },
  { letter: 'E', word: 'Example', desc: 'Provide a specific, logical example or illustration.' },
  { letter: 'L', word: 'Link', desc: 'Connect the example back to your thesis statement.' }
];

export const WRITING_WARNING =
  'Never start writing immediately. Writing haphazardly leads to repeated ideas, poor coherence and wandering off topic, which caps your score at band 5.5.';
