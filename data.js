/*
  11+ ADMISSIONS DATA — edit this file each admissions cycle.
  ------------------------------------------------------------
  This is the ONLY file you should need to touch for a yearly refresh.
  index.html, style.css and app.js don't need to change.

  For each school:
    - Update every date in "milestones" to the new cycle's dates.
    - Update "note" if the process has changed (e.g. new deadline order).
    - "actionable: true"  = a deadline a parent must act on (registration,
      CAF, bursary form). Drives the countdown badge and status grouping.
    - "actionable: false" = informational only (exam date, offer day) —
      shown in the milestone list but never drives the countdown.
    - Dates must be in "YYYY-MM-DD" format.

  To add a new school, copy an existing block between the { } and edit it,
  then add a comma after the previous school's closing }.
  To remove a school, delete its whole { ... } block (and the trailing comma
  if it was the last one).
*/

const SCHOOLS = [
  {
    id:'slough',
    name:'Slough 11+ Consortium',
    category:'State Grammar Consortium',
    gender:'Co-ed',
    region:'Slough',
    website:'https://slough.gov.uk/school-admissions/apply-school-place/8',
    note:'Covers Herschel Grammar, Langley Grammar, St Bernard\u2019s Catholic Grammar and Upton Court Grammar \u2014 one registration covers all four. Exam registration for this cycle has closed; the Common Application Form deadline below is the next live action.',
    milestones:[
      {label:'Consortium 11+ registration', date:'2026-06-05', actionable:true},
      {label:'11+ exam sat', date:'2026-09-19', actionable:false},
      {label:'Common Application Form (CAF) to home council', date:'2026-10-31', actionable:true},
      {label:'National Offer Day', date:'2027-03-01', actionable:false}
    ]
  },
  {
    id:'london-girls',
    name:'London 11+ Consortium (Girls)',
    category:'Independent Consortium \u00b7 13 schools',
    gender:'Girls',
    region:'Central / West London',
    website:'https://london11plus.co.uk/',
    note:'Includes Channing, both Francis Holland schools, Godolphin & Latymer, More House, Northwood College, Notting Hill & Ealing High, Queen\u2019s College, Queen\u2019s Gate, South Hampstead High, St Augustine\u2019s Priory, St Helen\u2019s and St Margaret\u2019s. One assessment covers every consortium school applied to.',
    milestones:[
      {label:'Application deadline (all consortium schools)', date:'2026-11-06', actionable:true},
      {label:'Assessment window (27 Nov \u2013 3 Dec)', date:'2026-12-03', actionable:false},
      {label:'Offers sent', date:'2027-02-12', actionable:false}
    ]
  },
  {
    id:'sw-herts',
    name:'South West Herts Schools Consortium',
    category:'State Selective Consortium \u00b7 7 schools',
    gender:'Mixed',
    region:'Watford / SW Herts',
    website:'https://www.swhertsschools.org.uk/',
    note:'Covers the academic and music aptitude routes into Parmiter\u2019s, Queens\u2019, Rickmansworth, St Clement Danes, and Watford Grammar (Boys & Girls). Test registration for this cycle has closed; the CAF deadline below is the next live action.',
    milestones:[
      {label:'Consortium test registration', date:'2026-06-05', actionable:true},
      {label:'Academic Ability Test sat', date:'2026-09-05', actionable:false},
      {label:'Common Application Form (CAF) to Herts CC', date:'2026-10-31', actionable:true},
      {label:'National Offer Day', date:'2027-03-01', actionable:false}
    ]
  },
  {
    id:'highgate',
    name:'Highgate School',
    category:'Independent',
    gender:'Co-ed',
    region:'Highgate, London',
    website:'https://www.highgateschool.org.uk/senior-school/admissions-11/',
    note:'Bursary applications use the same application form and the same deadline \u2014 indicate interest when applying.',
    milestones:[
      {label:'Application deadline (noon)', date:'2026-11-04', actionable:true},
      {label:'Entrance exams (early December)', date:'2026-12-01', actionable:false},
      {label:'Offers sent (approx.)', date:'2027-02-01', actionable:false}
    ]
  },
  {
    id:'hbs',
    name:'Henrietta Barnett School',
    category:'State Grammar (Girls)',
    gender:'Girls',
    region:'Hampstead Garden Suburb, Barnet',
    website:'https://www.hbschool.org.uk/admissions/',
    note:'Two-round entrance test; only the top 300 from Round 1 are invited to Round 2. Registration for this cycle closed 1 July 2026 \u2014 the CAF deadline below is the next live action.',
    milestones:[
      {label:'Entrance test registration', date:'2026-07-01', actionable:true},
      {label:'Round 1 exam', date:'2026-09-04', actionable:false},
      {label:'Round 2 exam (by invitation, early Oct)', date:'2026-10-06', actionable:false},
      {label:'Common Application Form (CAF) to Barnet Council', date:'2026-10-31', actionable:true},
      {label:'National Offer Day', date:'2027-03-01', actionable:false}
    ]
  },
  {
    id:'habs-boys',
    name:'Haberdashers\u2019 Boys\u2019 School',
    category:'Independent',
    gender:'Boys',
    region:'Elstree, Hertfordshire',
    website:'https://www.habselstree.org.uk/boys/admissions/admissions-process/',
    note:'Shares its QUEST first-round assessment with Habs Girls. Scholarship applications use the same form and deadline as registration.',
    milestones:[
      {label:'Registration & scholarship deadline', date:'2026-11-06', actionable:true}
    ]
  },
  {
    id:'qe-barnet',
    name:'Queen Elizabeth\u2019s School (Barnet)',
    category:'State Grammar, super-selective (Boys)',
    gender:'Boys',
    region:'Chipping Barnet',
    website:'https://www.qebarnet.co.uk/admissions-information/admissions-information-parents/',
    note:'No catchment area \u2014 entry is by test score alone. Registration for this cycle closed at noon on 8 July 2026 \u2014 the CAF deadline below is the next live action.',
    milestones:[
      {label:'Entrance test request form deadline (noon)', date:'2026-07-08', actionable:true},
      {label:'Entrance exam', date:'2026-09-17', actionable:false},
      {label:'Common Application Form (CAF) to Barnet Council', date:'2026-10-31', actionable:true},
      {label:'National Offer Day', date:'2027-03-01', actionable:false}
    ]
  },
  {
    id:'habs-girls',
    name:'Haberdashers\u2019 Girls\u2019 School',
    category:'Independent',
    gender:'Girls',
    region:'Elstree, Hertfordshire',
    website:'https://www.habselstree.org.uk/girls/admissions/admissions-process/',
    note:'Shares its QUEST first-round assessment with Habs Boys.',
    milestones:[
      {label:'Registration & scholarship deadline', date:'2026-11-06', actionable:true}
    ]
  },
  {
    id:'merchant-taylors',
    name:'Merchant Taylors\u2019 School',
    category:'Independent',
    gender:'Boys',
    region:'Northwood',
    website:'https://www.mtsn.org.uk/admissions/joining-at-11/',
    note:'Bursary and scholarship applications close earlier than general registration \u2014 easy to miss if you\u2019re only tracking the main deadline.',
    milestones:[
      {label:'Bursary & scholarship application deadline', date:'2026-09-30', actionable:true},
      {label:'General registration deadline', date:'2026-10-31', actionable:true},
      {label:'Entrance exam (Dec, tbc)', date:'2026-12-06', actionable:false}
    ]
  },
  {
    id:'ucs',
    name:'UCS Hampstead',
    category:'Independent',
    gender:'Boys',
    region:'Hampstead',
    website:'https://www.ucs.org.uk/admissions/admissions-process/year-7/',
    note:'Indicate interest in a bursary directly on the application form \u2014 no separate process or deadline.',
    milestones:[
      {label:'Application deadline (5pm)', date:'2026-11-09', actionable:true},
      {label:'Assessment (Jan 2027, tbc)', date:'2027-01-15', actionable:false}
    ]
  }
];
