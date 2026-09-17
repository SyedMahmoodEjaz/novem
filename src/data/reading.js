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
  ,
  {
    id: 'r3',
    kind: 'Academic',
    title: 'The quiet revolution in weather forecasting',
    body: [
      'For most of the twentieth century, forecasting the weather meant solving equations. Meteorologists divided the atmosphere into a grid, measured what they could at each point, and applied the physics of fluid motion to calculate what would happen next. The approach was principled, computationally brutal, and slowly improving: between 1980 and 2020, the useful range of a forecast extended by roughly one day per decade.',
      'That improvement came at enormous cost. A modern physical model runs on a supercomputer occupying a warehouse, consumes megawatts of power, and takes hours to produce a single global forecast. The economics were accepted as unavoidable. Weather is chaotic, the reasoning went, and only by simulating the physics in ever finer detail could the chaos be held at bay a little longer.',
      'In 2023 that assumption was publicly challenged. Several research groups demonstrated machine-learning systems that, rather than solving the equations, had been trained on four decades of archived atmospheric observations. Given the current state of the atmosphere, these systems predicted the next state directly, having learned the patterns rather than the physics. On standard measures of accuracy at the medium range of three to ten days, they matched and in several cases exceeded the established physical models.',
      'The efficiency gain was the more startling result. A forecast that took a supercomputer hours could be produced in under a minute on a single specialised processor. The energy required fell by something close to four orders of magnitude. For national weather services in poorer countries, which had been priced out of running their own models, the implications were immediate.',
      'Enthusiasm has been tempered by a specific and serious objection. A model trained on the past has only ever seen the past. Physical models, whatever their expense, encode laws that hold regardless of whether a particular configuration of the atmosphere has occurred before. A learned model asked to forecast a genuinely unprecedented event, a heatwave hotter than any in the training archive, may fail in ways that are difficult to anticipate and, critically, difficult to detect in advance. Early evidence suggests such systems tend to under-predict the intensity of extremes, smoothing towards the average because the average is what they mostly saw.',
      'The emerging consensus is therefore not replacement but division of labour. Learned models handle the routine medium-range forecast, cheaply and quickly, and can be run thousands of times to map the range of possible outcomes. Physical models are held in reserve for the extreme and the unfamiliar, and remain the source of the training archives on which the learned systems depend. It is an arrangement with an obvious circularity, and one that nobody has yet found a way to escape.'
    ],
    questions: [
      { q: 'Between 1980 and 2020, forecast range improved by about one day every', type: 'gap', a: 'decade', accept: ['decade', 'ten years', '10 years'], why: 'Stated at the end of paragraph one. A question that simply asks for a number or a unit is usually locatable in a single sentence.' },
      { q: 'Machine-learning forecast systems were trained on', type: 'choice', opts: ['the equations of fluid motion', 'archived atmospheric observations', 'simulations from physical models'], a: 'archived atmospheric observations', why: 'Paragraph three: four decades of archived observations. The other two options name real things from the passage placed in the wrong role.' },
      { q: 'The learned models proved more accurate than physical models at every forecast range.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'False', why: 'The passage restricts the claim to the medium range of three to ten days. A statement that widens a limited claim is False, not Not Given.' },
      { q: 'The reduction in energy use was close to how many orders of magnitude? Write a number.', type: 'gap', a: '4', accept: ['4', 'four'], why: 'Paragraph four states close to four orders of magnitude.' },
      { q: 'Poorer countries benefit because they had previously been unable to afford', type: 'gap', a: 'their own models', accept: ['their own models', 'own models', 'running their own models', 'models'], why: 'They had been priced out of running their own models.' },
      { q: 'The main objection to learned models is that they may fail when facing', type: 'choice', opts: ['very short-range forecasts', 'unprecedented events', 'forecasts for small regions'], a: 'unprecedented events', why: 'Paragraph five: a model trained on the past has only ever seen the past, and may fail on something genuinely unprecedented.' },
      { q: 'Learned systems tend to predict extreme events as being', type: 'choice', opts: ['more intense than they are', 'less intense than they are', 'accurate but delayed'], a: 'less intense than they are', why: 'They under-predict intensity, smoothing towards the average.' },
      { q: 'The writer describes the final arrangement between the two approaches as', type: 'choice', opts: ['temporary', 'circular', 'inefficient'], a: 'circular', why: 'The closing sentence calls it an arrangement with an obvious circularity: learned models depend on the physical models for their training data.' }
    ]
  },
  {
    id: 'r4',
    kind: 'General Training',
    title: 'Tenancy handbook: repairs and responsibilities',
    body: [
      'This section sets out who is responsible for what when something in your home needs repair. Please read it before reporting a fault, as charges may apply for work that falls to the tenant.',
      'The landlord is responsible for the structure and exterior of the property, including the roof, walls, windows and external doors. The landlord also maintains the installations for supplying water, gas, electricity and sanitation, which covers basins, sinks, baths and toilets, together with fixed heaters and water heaters.',
      'The tenant is responsible for minor items and for anything damaged through misuse or neglect. This includes replacing light bulbs, fuses in plugs, batteries in smoke alarms, and internal door handles. Blocked sinks and toilets are the tenant\'s responsibility unless the blockage is shown to be caused by a defect in the pipework itself.',
      'Repairs are classified in three categories. Emergency repairs, meaning anything presenting an immediate risk to health, safety or security, are attended within 24 hours. Examples are a total loss of heating in winter, a major leak, or an insecure external door. Urgent repairs, such as a partial loss of heating or a leaking roof that is not causing immediate damage, are attended within five working days. Routine repairs are completed within 28 days.',
      'Report all repairs through the tenant portal or by telephone. Reports made by email are not monitored outside office hours and should not be used for emergencies. When you report a fault you will be given a reference number; quote this in any follow-up.',
      'You may not carry out structural alterations, remove fitted units, or install any gas or electrical fitting without written permission. Redecorating in reasonable colours does not require permission, but you may be asked to return walls to a neutral shade at the end of the tenancy. Permission for a satellite dish is granted only where a communal aerial is unavailable.'
    ],
    questions: [
      { q: 'Who is responsible for replacing a smoke alarm battery?', type: 'choice', opts: ['The landlord', 'The tenant', 'Either party'], a: 'The tenant', why: 'Listed in paragraph three among the minor items belonging to the tenant.' },
      { q: 'A blocked sink is the landlord\'s responsibility if the blockage is caused by a defect in the', type: 'gap', a: 'pipework', accept: ['pipework', 'pipes', 'the pipework'], why: 'The one exception given to the tenant\'s responsibility for blockages.' },
      { q: 'An insecure external door would be classified as', type: 'choice', opts: ['an emergency repair', 'an urgent repair', 'a routine repair'], a: 'an emergency repair', why: 'Given as an example of an immediate risk to security, attended within 24 hours.' },
      { q: 'Urgent repairs are attended within how many working days? Write a number.', type: 'gap', a: '5', accept: ['5', 'five'], why: 'Five working days for urgent; 24 hours for emergency; 28 days for routine. Each category has its own figure.' },
      { q: 'Emergency repairs may be reported by email.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'False', why: 'Paragraph five states email is not monitored outside office hours and should not be used for emergencies.' },
      { q: 'Redecorating requires written permission from the landlord.', type: 'choice', opts: ['True', 'False', 'Not Given'], a: 'False', why: 'Redecorating in reasonable colours does not require permission, though a neutral shade may be required at the end of the tenancy.' },
      { q: 'A satellite dish is permitted only when there is no communal', type: 'gap', a: 'aerial', accept: ['aerial', 'communal aerial', 'antenna'], why: 'The final sentence of the handbook extract.' }
    ]
  }
];
