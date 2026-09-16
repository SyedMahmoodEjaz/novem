export const READING = [
  {
    id: 'r1',
    kind: 'Academic',
    title: 'The long apprenticeship of the honeybee',
    body: [
      'A honeybee colony looks, from the outside, like a single organism with tens of thousands of interchangeable parts. It is nothing of the sort. A worker bee lives roughly six weeks in summer, and in that short span she moves through a sequence of occupations as orderly as any human career. For her first days she cleans cells. She then feeds larvae, builds comb, guards the entrance, and only in the final fortnight of her life does she leave the hive to forage.',
      'For most of the twentieth century this progression was explained by age alone: a bee did a particular job because she had reached a particular number of days. The explanation was tidy and, as it turned out, incomplete. When researchers removed all the older foragers from a colony, the remaining young bees began foraging within days, at an age when they should still have been nursing larvae. Remove the young bees instead, and some foragers reverted, their glands regenerating so that they could feed larvae once more.',
      'What this revealed was a system of feedback rather than a timetable. Foragers returning to the hive carry a chemical signature that inhibits younger bees from maturing too quickly. When fewer foragers return, the signal weakens and development accelerates. The colony is therefore continuously measuring its own losses and adjusting the internal labour supply, without any individual bee assessing the situation.',
      'The mechanism matters beyond entomology, because it is one of the clearest natural examples of what engineers call decentralised control. No bee holds a model of the colony. Each responds to a local concentration of a chemical, and the aggregate of those responses produces an allocation of labour that a central planner would struggle to improve on. Attempts to reproduce this in robotics have had mixed success: the difficulty is rarely the individual rule, which is simple, but the tuning of thresholds so that the swarm neither overreacts to a small disturbance nor ignores a serious one.',
      'There is a cost to the arrangement. Precocious foragers, pushed into the field early, are markedly worse at the job. They fly shorter distances, learn floral routes more slowly, and die sooner than bees that matured at a normal pace. A colony that has lost many foragers can replace them quickly, but it replaces them with inferior workers, and the shortfall in nectar collected may persist for weeks. Speed of response and quality of response pull in opposite directions, which is a constraint familiar to anyone who has run an understaffed organisation.'
    ],
    questions: [
      { q: 'In the first paragraph, the writer compares a bee colony to a single organism in order to', type: 'choice', opts: ['support the comparison', 'reject the comparison', 'explain how comb is built'], a: 'reject the comparison', why: 'The comparison is set up and then dismissed in the next sentence: "It is nothing of the sort." Opening images in IELTS passages are often there to be knocked down.' },
      { q: 'Removing older foragers caused young bees to start foraging earlier than normal.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'True', why: 'Stated directly in paragraph two: the remaining young bees began foraging within days.' },
      { q: 'Beekeepers now use this discovery to increase honey production.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'Not Given', why: 'The passage never mentions beekeeping practice or honey yields. Plausible, related, and absent: that is Not Given.' },
      { q: 'The signal that slows the development of young bees is carried by', type: 'gap', a: 'returning foragers', accept: ['foragers', 'returning foragers', 'older foragers'], why: 'Paragraph three: foragers returning to the hive carry a chemical signature that inhibits younger bees.' },
      { q: 'According to paragraph four, the hardest part of copying this system in robotics is', type: 'choice', opts: ['writing the individual rule', 'setting the thresholds', 'building small enough robots'], a: 'setting the thresholds', why: 'The text says the individual rule is simple; the difficulty is tuning thresholds. Answer choices that repeat a word from the passage are often the trap.' },
      { q: 'Bees that begin foraging early are described as', type: 'choice', opts: ['more productive than usual', 'less effective and shorter-lived', 'unable to leave the hive'], a: 'less effective and shorter-lived', why: 'The final paragraph lists shorter flights, slower learning and earlier death.' },
      { q: 'The final paragraph suggests that a colony trades quality of response against', type: 'gap', a: 'speed', accept: ['speed', 'speed of response'], why: 'The closing sentence states that speed of response and quality of response pull in opposite directions.' }
    ]
  },
  {
    id: 'r2',
    kind: 'General Training',
    title: 'Staff notice: changes to the flexible working scheme',
    body: [
      'From 1 April the flexible working scheme will be extended to all employees who have completed six months of continuous service. Previously the scheme was open only to staff with two years of service, and only to those in grades 4 and above.',
      'Employees may request a change to their working pattern once in any twelve-month period. Requests must be made in writing to your line manager, not to Human Resources, and must state the proposed start date and whether the change is intended to be permanent or temporary.',
      'Your manager will arrange a meeting within fourteen days of receiving the request and will give a written decision within one month. If the request is refused, the reason must be one of the eight business grounds listed in the staff handbook, and you may appeal to the Head of Department within ten working days.',
      'Please note that compressed hours, that is working your contracted hours across four days rather than five, are available in all departments except Customer Support, where cover is required daily. Remote working remains subject to the separate Home Working Agreement and is not covered by this notice.'
    ],
    questions: [
      { q: 'Under the new rules, employees become eligible after', type: 'choice', opts: ['six months', 'twelve months', 'two years'], a: 'six months', why: 'Six months is the new rule. Two years is the old rule, included as a distractor.' },
      { q: 'How often may an employee make a request? Once every', type: 'gap', a: '12 months', accept: ['12 months', 'twelve months', '12', 'year', 'twelve month period'], why: 'Once in any twelve-month period.' },
      { q: 'Requests should be sent to', type: 'choice', opts: ['Human Resources', 'your line manager', 'the Head of Department'], a: 'your line manager', why: 'The notice explicitly rules out HR. The Head of Department only handles appeals.' },
      { q: 'The manager must give a written decision within', type: 'choice', opts: ['14 days', 'one month', 'ten working days'], a: 'one month', why: 'Fourteen days is the deadline for the meeting; ten working days is the appeal window. Each number belongs to a different step.' },
      { q: 'Compressed hours are unavailable in which department?', type: 'gap', a: 'customer support', accept: ['customer support'], why: 'Customer Support is excluded because daily cover is needed.' },
      { q: 'This notice sets out the rules for remote working.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'False', why: 'The last paragraph says remote working falls under a separate agreement and is not covered here.' }
    ]
  }
];
