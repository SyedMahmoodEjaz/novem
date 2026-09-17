// Writing tasks cover every Task 1 visual type and every Task 2 question type that appears
// in the Academic and General Training papers.

export const WRITING_TASKS = [
  // ---------- Academic Task 1 ----------
  {
    id: 'w-a-line',
    group: 'Academic Task 1',
    label: 'Line graph',
    minutes: 20,
    words: 150,
    prompt:
      'The graph below shows the number of visitors to three museums in one city between 2010 and 2022.\n\nThe National Museum rose steadily from 180,000 to 410,000. The Maritime Museum fell from 260,000 to 95,000, with a sharp drop after 2015. The City Gallery stayed between 140,000 and 170,000 throughout, apart from a spike to 240,000 in 2018 when it hosted a touring exhibition.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-a-bar',
    group: 'Academic Task 1',
    label: 'Bar chart',
    minutes: 20,
    words: 150,
    prompt:
      'The chart below shows the percentage of households owning selected appliances in one country in 2000 and 2020.\n\nWashing machine: 78% then 94%. Refrigerator: 91% then 99%. Dishwasher: 22% then 58%. Tumble dryer: 34% then 41%. Desktop computer: 46% then 19%. Smartphone: 2% then 92%.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-a-pie',
    group: 'Academic Task 1',
    label: 'Pie chart',
    minutes: 20,
    words: 150,
    prompt:
      'The two pie charts below show how a university spent its budget in 1995 and in 2020.\n\nIn 1995: teaching staff 52%, buildings and maintenance 21%, library and books 14%, technology 5%, other 8%.\nIn 2020: teaching staff 44%, buildings and maintenance 18%, library and books 6%, technology 24%, other 8%.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-a-table',
    group: 'Academic Task 1',
    label: 'Table',
    minutes: 20,
    words: 150,
    prompt:
      'The table below shows average weekly hours spent on unpaid domestic work by men and women in four countries in 2021.\n\nSweden: women 18.2, men 14.9. Japan: women 28.4, men 5.1. Italy: women 30.7, men 10.3. Canada: women 22.6, men 15.8.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-a-process',
    group: 'Academic Task 1',
    label: 'Process diagram',
    minutes: 20,
    words: 150,
    prompt:
      'The diagram below shows how glass bottles are recycled.\n\nStages: bottles are collected from household bins and bottle banks; they are transported to a processing plant; they are sorted by colour, either by hand or by optical scanner; metal caps and labels are removed by magnet and washing; the glass is crushed into small fragments called cullet; the cullet is melted in a furnace at around 1500 degrees Celsius; molten glass is poured into moulds to form new bottles; the new bottles are cooled slowly, inspected, and sent to bottling plants for filling.\n\nSummarise the information by selecting and reporting the main features. Write at least 150 words.'
  },
  {
    id: 'w-a-map',
    group: 'Academic Task 1',
    label: 'Map',
    minutes: 20,
    words: 150,
    prompt:
      'The two maps below show the village of Stanton in 1980 and today.\n\nIn 1980: farmland covered the north and east; a primary school stood in the centre beside a small church; a single road ran north to south; there were about forty houses clustered around the crossroads; woodland lay to the west.\n\nToday: the farmland in the east has become a housing estate of around two hundred homes; the primary school has been extended and now includes a sports hall on what was its playing field; a bypass has been built around the western edge, cutting through part of the woodland; the church remains unchanged; a supermarket and car park occupy the site of the old crossroads shops.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },
  {
    id: 'w-a-mixed',
    group: 'Academic Task 1',
    label: 'Mixed charts',
    minutes: 20,
    words: 150,
    prompt:
      'The bar chart and pie chart below give information about electricity in one country in 2022.\n\nThe bar chart shows generation by source in terawatt hours: gas 142, nuclear 48, wind 76, solar 21, coal 14, hydro 9.\nThe pie chart shows consumption by sector: domestic 34%, industry 31%, commercial services 22%, transport 8%, agriculture 5%.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.'
  },

  // ---------- General Training Task 1 ----------
  {
    id: 'w-g-complaint',
    group: 'General Training Task 1',
    label: 'Letter of complaint',
    minutes: 20,
    words: 150,
    prompt:
      'You recently bought a piece of equipment for your home, but it did not work properly. You phoned the shop twice and nobody returned your call.\n\nWrite a letter to the shop manager. In your letter:\n- explain what you bought and when\n- describe the problem and what you have already done about it\n- say what you would like the manager to do\n\nWrite at least 150 words. Begin "Dear Sir or Madam,".'
  },
  {
    id: 'w-g-request',
    group: 'General Training Task 1',
    label: 'Formal request',
    minutes: 20,
    words: 150,
    prompt:
      'You are studying a part-time course and you will be unable to attend classes for the next three weeks because of a family matter.\n\nWrite a letter to your course tutor. In your letter:\n- explain why you will be absent\n- describe how you plan to keep up with the work\n- ask for the support you need\n\nWrite at least 150 words. Begin "Dear Mr Hargreaves,".'
  },
  {
    id: 'w-g-friend',
    group: 'General Training Task 1',
    label: 'Informal letter',
    minutes: 20,
    words: 150,
    prompt:
      'A friend from another country is coming to stay with you for a week and has asked what to expect.\n\nWrite a letter to your friend. In your letter:\n- say how you feel about the visit\n- describe what the weather will be like and what to pack\n- suggest two things you could do together\n\nWrite at least 150 words. Begin "Dear Sam,".'
  },

  // ---------- Task 2 ----------
  {
    id: 'w-t2-opinion',
    group: 'Task 2',
    label: 'Opinion (agree or disagree)',
    minutes: 40,
    words: 250,
    prompt:
      'Some governments are investing heavily in artificial intelligence and advanced technology while spending on basic healthcare and education remains unchanged.\n\nTo what extent do you agree or disagree with this approach? Write at least 250 words.'
  },
  {
    id: 'w-t2-discuss',
    group: 'Task 2',
    label: 'Discuss both views',
    minutes: 40,
    words: 250,
    prompt:
      'Some people believe that universities should only admit students with the highest examination results, while others argue that admission should also consider a candidate\'s background and potential.\n\nDiscuss both views and give your own opinion. Write at least 250 words.'
  },
  {
    id: 'w-t2-advdis',
    group: 'Task 2',
    label: 'Advantages and disadvantages',
    minutes: 40,
    words: 250,
    prompt:
      'In many companies, employees now work from home for most of the week rather than travelling to an office.\n\nDo the advantages of this development outweigh the disadvantages? Write at least 250 words.'
  },
  {
    id: 'w-t2-problem',
    group: 'Task 2',
    label: 'Problem and solution',
    minutes: 40,
    words: 250,
    prompt:
      'In many countries, young people are leaving smaller towns for large cities, leaving those towns with an ageing population.\n\nWhat problems does this cause, and what measures could be taken to address them? Write at least 250 words.'
  },
  {
    id: 'w-t2-double',
    group: 'Task 2',
    label: 'Two-part question',
    minutes: 40,
    words: 250,
    prompt:
      'Online learning has become a normal part of education at every level.\n\nWhy has this happened, and does it benefit students more than traditional classroom teaching? Write at least 250 words.'
  },
  {
    id: 'w-t2-opinion2',
    group: 'Task 2',
    label: 'Opinion (second prompt)',
    minutes: 40,
    words: 250,
    prompt:
      'Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better alternatives.\n\nDiscuss both views and give your own opinion. Write at least 250 words.'
  },
  {
    id: 'w-t2-problem2',
    group: 'Task 2',
    label: 'Problem and solution (second prompt)',
    minutes: 40,
    words: 250,
    prompt:
      'Air pollution in major cities has become a serious threat to public health.\n\nWhat are the causes of this problem, and what solutions can you suggest? Write at least 250 words.'
  }
];

export const SPEAKING = {
  part1: [
    'Let us talk about where you live. Do you live in a house or an apartment?',
    'What do you like most about the area you live in?',
    'Do you work, or are you a student?',
    'How do you usually spend your weekends?',
    'Is there a type of food you could never get tired of? Why?',
    'Do you prefer to make plans, or decide things at the last minute?',
    'How often do you use public transport?',
    'Did you enjoy studying history at school?',
    'What kind of weather do you like best?',
    'Do you prefer to shop online or in actual shops?',
    'How important is it for you to keep in touch with old friends?',
    'Do you listen to music while you work or study?',
    'What do you usually do on your way to work or college?',
    'Have your tastes in films changed since you were a child?'
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
    },
    {
      topic: 'Describe an object in your home that is important to you.',
      bullets: ['what it is', 'how long you have had it', 'where it came from', 'and explain why it matters to you']
    },
    {
      topic: 'Describe a person who has influenced the way you think.',
      bullets: ['who the person is', 'how you know them', 'what they changed about your thinking', 'and explain whether that change has lasted']
    },
    {
      topic: 'Describe a time when technology caused you a problem.',
      bullets: ['what happened', 'when it happened', 'how you dealt with it', 'and explain what you learned from it']
    },
    {
      topic: 'Describe a journey you remember well.',
      bullets: ['where you went', 'who you travelled with', 'what happened during the journey', 'and explain why you still remember it']
    },
    {
      topic: 'Describe something you own that you would like to replace.',
      bullets: ['what it is', 'how long you have had it', 'what is wrong with it', 'and explain what you would replace it with']
    },
    {
      topic: 'Describe an occasion when you helped someone.',
      bullets: ['who you helped', 'what the situation was', 'what you did', 'and explain how you felt about it afterwards']
    }
  ],
  part3: [
    'Do you think schools should teach practical skills alongside academic subjects?',
    'Why do some people find it harder than others to learn new things as adults?',
    'How has the way people learn changed in your country over the last twenty years?',
    'Should employers pay for the training of their staff, or is that the individual\'s responsibility?',
    'Do you think people today have too many choices?',
    'How do you think cities will change in the next fifty years?',
    'Is it better for a society when people move away from their home town, or when they stay?',
    'Do you think governments should limit how much people travel by air?',
    'Why do some traditions survive and others disappear?',
    'Should older people be encouraged to keep working after retirement age?',
    'How has social media changed the way people form friendships?',
    'Is it possible for a country to develop economically without damaging its environment?'
  ]
};
