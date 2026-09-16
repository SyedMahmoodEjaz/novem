export const WRITING_TASKS = [
  {
    id: 'w-a1',
    label: 'Academic Task 1 — line graph',
    minutes: 20,
    words: 150,
    prompt:
      'The graph below shows the number of visitors to three museums in one city between 2010 and 2022. The National Museum rose steadily from 180,000 to 410,000. The Maritime Museum fell from 260,000 to 95,000, with a sharp drop after 2015. The City Gallery stayed between 140,000 and 170,000 throughout, apart from a spike to 240,000 in 2018 when it hosted a touring exhibition.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-g1',
    label: 'General Training Task 1 — letter',
    minutes: 20,
    words: 150,
    prompt:
      'You recently bought a piece of equipment for your home, but it did not work properly. You phoned the shop twice and nobody returned your call.\n\nWrite a letter to the shop manager. In your letter:\n- explain what you bought and when\n- describe the problem and what you have already done about it\n- say what you would like the manager to do\n\nWrite at least 150 words. Begin "Dear Sir or Madam,".'
  },
  {
    id: 'w-t2-opinion',
    label: 'Task 2 — opinion',
    minutes: 40,
    words: 250,
    prompt:
      'Some people believe that universities should only admit students with the highest examination results, while others argue that admission should also consider a candidate\'s background and potential.\n\nDiscuss both views and give your own opinion. Write at least 250 words.'
  },
  {
    id: 'w-t2-problem',
    label: 'Task 2 — problem and solution',
    minutes: 40,
    words: 250,
    prompt:
      'In many cities, young people are leaving for larger urban centres, leaving smaller towns with an ageing population.\n\nWhat problems does this cause, and what measures could be taken to address them? Write at least 250 words.'
  },
  {
    id: 'w-t2-double',
    label: 'Task 2 — two-part question',
    minutes: 40,
    words: 250,
    prompt:
      'Online learning has become a normal part of education at every level.\n\nWhy has this happened, and does it benefit students more than traditional classroom teaching? Write at least 250 words.'
  }
];

export const SPEAKING = {
  part1: [
    'Let us talk about where you live. Do you live in a house or an apartment?',
    'What do you like most about the area you live in?',
    'Do you work or are you a student?',
    'How do you usually spend your weekends?',
    'Is there a type of food you could never get tired of? Why?',
    'Do you prefer to make plans or decide things at the last minute?'
  ],
  part2: [
    {
      topic: 'Describe a skill you learned that took a long time to master.',
      bullets: ['what the skill is', 'how and why you started learning it', 'how long it took', 'and explain how it has been useful to you']
    },
    {
      topic: 'Describe a time when you had to give someone difficult news.',
      bullets: ['who you spoke to', 'what the news was', 'how you prepared for the conversation', 'and explain how you felt afterwards']
    },
    {
      topic: 'Describe a place in your city that you would recommend to a visitor.',
      bullets: ['where it is', 'what people can do there', 'why it is not well known', 'and explain why you would recommend it']
    },
    {
      topic: 'Describe a decision you made that other people disagreed with.',
      bullets: ['what the decision was', 'who disagreed and why', 'what happened in the end', 'and explain whether you would make the same choice again']
    }
  ],
  part3: [
    'Do you think schools should teach practical skills alongside academic subjects?',
    'Why do some people find it harder than others to learn new things as adults?',
    'How has the way people learn changed in your country over the last twenty years?',
    'Should employers pay for the training of their staff, or is that the individual\'s responsibility?'
  ]
};
