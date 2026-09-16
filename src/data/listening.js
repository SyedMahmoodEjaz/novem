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
];
