// Transcripts are spoken aloud by the browser's own speech engine, so no audio files are needed.
// Each line is one speaker turn.

export const LISTENING = [
  {
    id: 'l1',
    part: 'Part 1',
    title: 'Booking a place at a language centre',
    context: 'A conversation between a receptionist and a student enquiring about evening classes.',
    lines: [
      { s: 'Receptionist', t: 'Good afternoon, Riverside Language Centre, Marta speaking. How can I help?' },
      { s: 'Student', t: 'Hello. I saw your advert for evening English classes and I wanted to ask about enrolling.' },
      { s: 'Receptionist', t: 'Of course. Can I take your name first?' },
      { s: 'Student', t: 'It is Haris Qureshi. That is H, A, R, I, S.' },
      { s: 'Receptionist', t: 'Thank you. And which course were you interested in? We run General English on Mondays and Wednesdays, and an exam preparation course on Tuesdays and Thursdays.' },
      { s: 'Student', t: 'The exam one, please. I am taking the test in about four months.' },
      { s: 'Receptionist', t: 'Right. That course runs for twelve weeks, starting on the sixth of March. Sessions are from half past six until half past eight.' },
      { s: 'Student', t: 'Sorry, did you say it starts at six thirty?' },
      { s: 'Receptionist', t: 'Six thirty, yes, although in the first week only we begin at six, because there is an introduction session before the lesson.' },
      { s: 'Student', t: 'Understood. And the fee?' },
      { s: 'Receptionist', t: 'The full course is four hundred and eighty pounds. If you pay before the twentieth of February there is a discount, so it comes down to four hundred and twenty.' },
      { s: 'Student', t: 'That is worth doing. Is there anything I need to bring on the first evening?' },
      { s: 'Receptionist', t: 'Just some photographic identification, a passport or a driving licence. The coursebook is included, so do not buy one. You might want a notebook, though.' },
      { s: 'Student', t: 'And where exactly is the centre? I know it is near the station.' },
      { s: 'Receptionist', t: 'We are on Bridge Street, but the entrance is actually round the back, on Mill Lane. People often walk past it. Look for the blue door beside the pharmacy.' },
      { s: 'Student', t: 'Blue door, Mill Lane. Thank you very much.' }
    ],
    questions: [
      { q: 'The student wants to join the course that runs on', type: 'choice', opts: ['Mondays and Wednesdays', 'Tuesdays and Thursdays', 'Fridays'], a: 'Tuesdays and Thursdays', why: 'He asks for the exam preparation course, which the receptionist says runs on Tuesdays and Thursdays.' },
      { q: 'In the first week only, lessons begin at', type: 'choice', opts: ['6.00', '6.30', '8.30'], a: '6.00', why: 'A classic correction. The usual start is 6.30, but the speaker then says the first week begins at six because of an introduction session.' },
      { q: 'How many weeks does the course last? Write a number.', type: 'gap', a: '12', accept: ['12', 'twelve'], why: 'She says the course runs for twelve weeks.' },
      { q: 'The discounted fee is £', type: 'gap', a: '420', accept: ['420', '£420', 'four hundred and twenty'], why: 'The full fee is 480, reduced to 420 if he pays before 20 February.' },
      { q: 'What must the student bring on the first evening? Write NO MORE THAN TWO WORDS.', type: 'gap', a: 'photographic identification', accept: ['photographic identification', 'photo id', 'photographic id', 'identification', 'passport'], why: 'She asks for photographic identification and gives a passport or driving licence as examples. The coursebook is provided.' },
      { q: 'The entrance to the centre is on', type: 'choice', opts: ['Bridge Street', 'Mill Lane', 'Station Road'], a: 'Mill Lane', why: 'The centre is on Bridge Street, but the entrance itself is round the back on Mill Lane. The question asks about the entrance.' }
    ]
  },
  {
    id: 'l2',
    part: 'Part 4',
    title: 'Lecture: how cities cool themselves',
    context: 'A university lecturer talks about urban heat and what reduces it.',
    lines: [
      { s: 'Lecturer', t: 'Today I want to look at why a city can be several degrees warmer than the farmland just outside it, and what actually works to bring that temperature down.' },
      { s: 'Lecturer', t: 'The effect has a name: the urban heat island. On a still summer night the difference between a dense city centre and its surrounding countryside can reach seven degrees Celsius, and in extreme cases rather more.' },
      { s: 'Lecturer', t: 'There are three main causes. First, materials. Asphalt and dark roofing absorb solar radiation during the day and release it slowly after sunset, so the city never fully cools overnight.' },
      { s: 'Lecturer', t: 'Second, geometry. Tall buildings close together form what we call street canyons. Heat radiating from one wall is simply absorbed by the wall opposite instead of escaping upwards.' },
      { s: 'Lecturer', t: 'Third, and this one surprises people, waste heat from human activity: vehicles, industry and above all air conditioning, which cools the inside of a building by pushing heat out into the street.' },
      { s: 'Lecturer', t: 'Now, the remedies. Painting roofs white is the cheapest intervention by a wide margin, and studies in several cities show surface temperature reductions of up to thirty degrees on the roof itself, though the effect on street level air is much smaller.' },
      { s: 'Lecturer', t: 'Street trees perform better at pedestrian level. A mature canopy shades the pavement and also cools through transpiration, releasing water vapour. The catch is time: the benefit arrives fifteen or twenty years after planting.' },
      { s: 'Lecturer', t: 'Water features are widely promoted but the evidence is mixed. A fountain cools the air within a few metres and almost nothing beyond that, and in humid climates it can make conditions feel worse, not better.' },
      { s: 'Lecturer', t: 'The most effective single measure, according to the modelling work from Melbourne that I will put on the reading list, is increasing tree canopy cover to about forty percent of the street surface. That was projected to reduce peak daytime temperature by roughly two degrees across a whole district.' }
    ],
    questions: [
      { q: 'On a still summer night, the temperature gap between city and countryside can reach', type: 'choice', opts: ['2 degrees', '7 degrees', '30 degrees'], a: '7 degrees', why: 'Seven degrees is the figure given for the night-time gap. Thirty degrees refers to roof surface temperature, and two degrees to the Melbourne projection.' },
      { q: 'Heat becomes trapped between tall buildings in what the lecturer calls street', type: 'gap', a: 'canyons', accept: ['canyons', 'canyon'], why: 'He introduces the term "street canyons" for tall buildings standing close together.' },
      { q: 'Which source of waste heat does the lecturer say surprises people?', type: 'choice', opts: ['Vehicles', 'Industry', 'Air conditioning'], a: 'Air conditioning', why: 'All three are listed, but he singles out air conditioning as the one that surprises people, because it moves heat outdoors.' },
      { q: 'The cheapest intervention mentioned is painting roofs', type: 'gap', a: 'white', accept: ['white'], why: 'He states plainly that painting roofs white is the cheapest intervention by a wide margin.' },
      { q: 'The main drawback of planting street trees is', type: 'choice', opts: ['the cost', 'the delay before benefits appear', 'the water they need'], a: 'the delay before benefits appear', why: 'The catch he names is time: fifteen to twenty years before the canopy matures.' },
      { q: 'According to the Melbourne modelling, canopy cover should reach what percentage of the street surface? Write a number.', type: 'gap', a: '40', accept: ['40', '40%', 'forty'], why: 'The projection assumed canopy cover of about forty percent, giving a two degree reduction.' }
    ]
  }
  ,
  {
    id: 'l3',
    part: 'Part 2',
    title: 'Orientation talk at Ashdown Country Park',
    context: 'A park ranger welcomes a group of new volunteers and describes the site. Part 2 is one speaker, and the questions often involve a map or a sequence.',
    lines: [
      { s: 'Ranger', t: 'Good morning everyone, and welcome to Ashdown Country Park. I am Ellie, one of the two full-time rangers here, and I will be running your induction today.' },
      { s: 'Ranger', t: 'Let me start with the layout, because new volunteers do get lost in the first week. You came in through the main gate on the south side, and the visitor centre is the long low building immediately to your left as you enter.' },
      { s: 'Ranger', t: 'Directly opposite the visitor centre, on the other side of the car park, is the equipment store. That is where you collect tools, and it is the grey building with the green doors. Please do not confuse it with the maintenance shed, which is further north and is staff only.' },
      { s: 'Ranger', t: 'If you follow the main path north from the visitor centre for about ten minutes you reach the lake. The bird hide sits at the eastern end of the lake, tucked behind a screen of willows, and the wildflower meadow is on the western side, opposite the hide.' },
      { s: 'Ranger', t: 'Now, the work itself. Volunteers usually choose one of three areas. Habitat management is the most physical: clearing scrub, coppicing, repairing fences. Visitor engagement means running the welcome desk and guided walks. And species monitoring involves surveys, mostly birds and butterflies.' },
      { s: 'Ranger', t: 'I should say that species monitoring sounds appealing to everyone, but it requires the most training, about six weeks before you can record independently, so most people begin elsewhere.' },
      { s: 'Ranger', t: 'Shifts are four hours. The morning shift runs eight until twelve, and the afternoon shift one until five. We ask for a minimum of two shifts a month, although the majority of our volunteers do closer to four.' },
      { s: 'Ranger', t: 'A few practical points. Wear boots, not trainers. We provide waterproofs and gloves, so do not buy your own. Bring a packed lunch, because the cafe closes at weekends outside the summer season.' },
      { s: 'Ranger', t: 'And finally, parking. Volunteers do not use the main visitor car park, which fills by ten on a Sunday. Use the overflow area behind the equipment store, and display the permit I will give you at the end of this talk.' }
    ],
    questions: [
      { q: 'The equipment store is', type: 'choice', opts: ['next to the visitor centre', 'across the car park from the visitor centre', 'north of the maintenance shed'], a: 'across the car park from the visitor centre', why: 'She says it is directly opposite the visitor centre, on the other side of the car park. Directional prepositions are the whole point of Part 2.' },
      { q: 'The bird hide is at which end of the lake?', type: 'gap', a: 'eastern', accept: ['eastern', 'east', 'the eastern end'], why: 'The hide is at the eastern end behind willows; the meadow is opposite it on the western side.' },
      { q: 'Which volunteer area requires the most training?', type: 'choice', opts: ['Habitat management', 'Visitor engagement', 'Species monitoring'], a: 'Species monitoring', why: 'She flags it as the one that sounds appealing but needs about six weeks of training first.' },
      { q: 'What is the minimum number of shifts per month? Write a number.', type: 'gap', a: '2', accept: ['2', 'two'], why: 'Two is the minimum. Four is what most volunteers actually do, which is the distractor.' },
      { q: 'Volunteers are told to bring their own', type: 'choice', opts: ['waterproofs', 'gloves', 'boots'], a: 'boots', why: 'Waterproofs and gloves are provided. Boots are the one item volunteers supply themselves.' },
      { q: 'Volunteers should park behind the', type: 'gap', a: 'equipment store', accept: ['equipment store', 'equipment store', 'store'], why: 'The overflow area behind the equipment store, not the main visitor car park.' }
    ]
  },
  {
    id: 'l4',
    part: 'Part 3',
    title: 'Tutorial: planning a research project',
    context: 'Two students and their tutor discuss a project proposal. Part 3 is fast, with several speakers, and questions often ask who said what.',
    lines: [
      { s: 'Tutor', t: 'Right, so you have both read the brief. Priya, where are you thinking of taking this?' },
      { s: 'Priya', t: 'I want to look at how supermarket layout affects what people actually buy. There is a lot of existing work, so I would be replicating rather than breaking new ground.' },
      { s: 'Tutor', t: 'Replication is perfectly respectable at this level. Daniel?' },
      { s: 'Daniel', t: 'I was more drawn to online behaviour, honestly. Tracking how recommendation algorithms shape a shopping basket. But I am worried I cannot get the data.' },
      { s: 'Tutor', t: 'That is the right worry to have. Every year somebody designs a beautiful study and then discovers the company will not share anything.' },
      { s: 'Priya', t: 'Could you not use a simulated store? Build a mock site and control the recommendations yourself?' },
      { s: 'Daniel', t: 'I had not considered that. It would solve the access problem, though it costs me realism. People behave differently when they know it is not real money.' },
      { s: 'Tutor', t: 'They do, and you would need to say so explicitly in your limitations section. But I would rather see a modest study you can actually complete than an ambitious one that stalls in week four.' },
      { s: 'Priya', t: 'My concern is different. Mine is feasible, but is it interesting enough? It feels a bit safe.' },
      { s: 'Tutor', t: 'Then sharpen the question rather than changing the topic. Instead of asking whether layout affects purchasing, which we know it does, ask which shoppers are most affected. Age, or whether they shop with a list.' },
      { s: 'Priya', t: 'That is much better. The list thing especially, because it is easy to ask about.' },
      { s: 'Daniel', t: 'And the sample size? I keep reading that you need hundreds of people.' },
      { s: 'Tutor', t: 'Not for this. Forty to sixty is defensible for an undergraduate project if your design is tight. What examiners punish is a loose design, not a small sample.' },
      { s: 'Tutor', t: 'One more thing, and this applies to both of you. Get your ethics approval submitted this week. It takes a fortnight to come back, and you cannot collect a single response before it does.' }
    ],
    questions: [
      { q: 'Who is worried about getting access to data?', type: 'choice', opts: ['Priya', 'Daniel', 'The tutor'], a: 'Daniel', why: 'Daniel raises it about his online study. Part 3 questions often turn on which speaker holds which view.' },
      { q: 'Priya suggests Daniel could use a', type: 'gap', a: 'simulated store', accept: ['simulated store', 'mock site', 'simulated shop'], why: 'She proposes building a mock site so he controls the recommendations himself.' },
      { q: 'The drawback of that suggestion is a loss of', type: 'gap', a: 'realism', accept: ['realism', 'reality'], why: 'Daniel says it costs him realism, because people behave differently when the money is not real.' },
      { q: 'The tutor advises Priya to', type: 'choice', opts: ['change her topic entirely', 'narrow her research question', 'increase her sample size'], a: 'narrow her research question', why: 'He explicitly says to sharpen the question rather than change the topic.' },
      { q: 'What sample size does the tutor consider defensible?', type: 'choice', opts: ['20 to 30', '40 to 60', 'Several hundred'], a: '40 to 60', why: 'Forty to sixty, provided the design is tight. The several hundred figure is what Daniel had read, which is the distractor.' },
      { q: 'How long does ethics approval take to come back?', type: 'gap', a: 'a fortnight', accept: ['a fortnight', 'fortnight', 'two weeks', '2 weeks'], why: 'A fortnight, which is why he tells them to submit this week.' }
    ]
  }
];

// Keep the sets in exam order regardless of the order they were written in.
LISTENING.sort((a, b) => a.part.localeCompare(b.part));
