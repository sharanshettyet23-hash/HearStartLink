



export const HIGH_RISK_FACTORS = [
  {
    category: 'Family and Genetic History',
    icon: 'Users',
    factors: [
      'Parents are <strong>blood relatives</strong> (consanguineous marriage).',
      'There is a family history of <strong>permanent childhood hearing loss</strong> or genetic syndromes associated with hearing impairment.',
    ],
  },
  {
    category: 'During Pregnancy',
    icon: 'HeartPulse',
    factors: [
      'The mother had a <strong>serious illness or high fever</strong> during pregnancy.',
      'The mother took <strong>medications known to affect hearing</strong> (such as aminoglycosides).',
      'The mother had a history of <strong>alcohol consumption, tobacco use, or smoking</strong> during pregnancy.',
      'There was an <strong>attempt to terminate the pregnancy</strong>.',
      'The mother had <strong>infections</strong> like rubella, cytomegalovirus (CMV), syphilis, toxoplasmosis, herpes, or Zika virus during pregnancy.',
      'The mother had <strong>high blood pressure</strong> during pregnancy or delivery.',
    ],
  },
  {
    category: 'During Delivery (Perinatal Factors)',
    icon: 'Truck',
    factors: [
      'History of <strong>complicated or non-normal delivery</strong> (e.g., emergency cesarean section, prolonged labor, instrumental delivery such as forceps or vacuum extraction).',
    ],
  },
  {
    category: 'At Birth',
    icon: 'Baby',
    factors: [
      'The baby was born <strong>before 36 weeks</strong> of pregnancy (premature).',
      'The baby\'s <strong>birth weight was low</strong>, especially below 1500 grams.',
      'The baby <strong>did not cry immediately after birth</strong>.',
      'The baby had <strong>jaundice</strong> that required special treatment (phototherapy or exchange transfusion).',
      'The baby was admitted to the <strong>Neonatal Intensive Care Unit (NICU) for more than 5 days</strong>.',
      'The baby required <strong>assisted breathing</strong> or mechanical ventilation.',
      'The delivery was <strong>complicated</strong> (breech, prolonged, or difficult labor).',
    ],
  },
  {
    category: 'Physical and Structural Indicators',
    icon: 'Scan',
    factors: [
      '<strong>Craniofacial anomalies</strong>, including those involving the pinna, ear canal, ear tags, ear pits, and temporal bone anomalies.',
      'The baby was born with <strong>abnormalities in the head, ears, eyes, lips, or face</strong>.',
      'The child shows features of a <strong>syndrome</strong> that may be associated with hearing problems.',
    ],
  },
  {
    category: 'Health Conditions After Birth',
    icon: 'Stethoscope',
    factors: [
      'The child had <strong>bacterial meningitis</strong> or brain infections (e.g., encephalitis).',
      'The child had illnesses like <strong>measles or mumps</strong>.',
      'The child had a <strong>head injury</strong> with unconsciousness, bleeding, or discharge from the ear.',
      'The child has had repeated <strong>ear infections</strong> lasting more than 3 months.',
      'The child underwent advanced treatments like <strong>ECMO</strong> (heart-lung bypass machine).',
    ],
  },
];

export const AUDITORY_MILESTONES = [
  {
    ageGroup: 'Birth to 3 Months',
    milestones: [
      'Arouses from sleep when a sound is presented.',
      'In a quiet environment, shows eye-blink or eye-widening response to soft sounds (e.g., noise makers).',
      'Turns head or moves eyes in response to sound; may briefly turn toward familiar voices.',
      "Recognizes and responds to familiar voices; shows preference for the mother's voice.",
    ],
    speechMilestones: [
      'Quiets or smiles when spoken to.',
      'Engages in early vocal turn-taking.',
      'Produces different cries or sounds depending on emotional state.',
      'Coos and produces vowel-like sounds such as "oooo," "aahh," and "mmmm."',
    ],
  },
  {
    ageGroup: '4 to 6 Months',
    milestones: [
      'At 3-4 months, begins a slow head turn toward a sound source.',
      'By 4 months, turns toward sound more consistently, though movements may still be unsteady.',
      'Reacts to sound-producing toys (e.g., bells, musical toys).',
      'Shows enjoyment of music and rhythmic sounds; may become excited or calm in response.',
    ],
    speechMilestones: [
      'Giggles and laughs.',
      'Vocalizes during play or while mouthing objects.',
      'Produces varied vowel sounds, sometimes combined with consonants (e.g., "aaagoo," "daaa").',
    ],
  },
  {
    ageGroup: '7 to 9 Months',
    milestones: [
      'By 7 months, localizes sounds to the side.',
      'Between 7-9 months, identifies the precise location of a sound with a direct head turn; localizes to the side and directly below.',
      'Looks toward the speaker when their name is called.',
      'Pauses momentarily when told "No."',
      'Shows preference for familiar sounds, songs, or voices.',
    ],
    speechMilestones: [
      'Babbles long strings of sounds (e.g., "mama," "baba").',
      'Enjoys interactive games such as peek-a-boo and pat-a-cake.',
      'Recognizes names of familiar people and objects.',
    ],
  },
  {
    ageGroup: '10 to 13 Months',
    milestones: [
      'By 12 months, demonstrates quick and accurate localization to auditory stimuli.',
      'By 13 months, localizes sounds to the side and below in any plane above or below eye level.',
      'Locates and reaches toward sound-producing objects.',
    ],
    speechMilestones: [
      'Uses gestures along with vocalizations (e.g., waves "bye-bye," raises arms to be picked up).',
      'Points, shows, or gives objects intentionally.',
      'Imitates speech sounds.',
      'Demonstrates understanding of simple phrases (e.g., "no," "want more?").',
      'Says one or two meaningful words (e.g., "amma," "appa," "hi," "bye").',
    ],
  },
  {
    ageGroup: '13 to 16 Months',
    milestones: [
      'Localizes sounds to the side, below, and indirectly above.',
    ],
    speechMilestones: [
      'Understands and follows simple verbal instructions (e.g., "come here," "give me the ball").',
      'Points to familiar objects when named.',
      'Imitates new sounds and simple words.',
    ],
  },
  {
    ageGroup: 'By the End of 18 Months',
    milestones: [
      'Localizes sounds directly to the side, below, and above.',
    ],
    speechMilestones: [
      'Recognizes names of familiar people, objects, and body parts.',
      'Follows simple directions accompanied by gestures.',
      'Says up to 10 meaningful words.',
    ],
  },
  {
    ageGroup: 'By the End of 24 Months',
    milestones: [
      'Locates sounds directly at any angle.',
    ],
    speechMilestones: [
      'Uses two-word phrases (e.g., "more milk").',
      'Asks simple one- to two-word questions (e.g., "Where dada?").',
      'Follows simple commands and understands simple questions.',
      'Has a vocabulary of approximately 50 or more words.',
      'Speech is understood at least 50% of the time by parents and primary caregivers.',
    ],
  },
];


export const LING_SIX_SOUNDS = [
  { sound: 'a', ipa: '/É‘/', description: 'as in "f-a-ther"' },
  { sound: 'u', ipa: '/u/', description: 'as in "b-oo-t"' },
  { sound: 'i', ipa: '/i/', description: 'as in "f-ee-t"' },
  { sound: 'm', ipa: '/m/', description: 'as in "m-o-m"' },
  { sound: 's', ipa: '/s/', description: 'as in "s-un"' },
  { sound: 'sh', ipa: '/Êƒ/', description: 'as in "sh-oe"' },
];

export const ENVIRONMENTAL_SOUNDS = [
  { name: 'Bell', icon: 'BellRing', src: '/audio/ling6/bell.mp3' },
  { name: 'Rattle', icon: 'ToyBrick', src: '/audio/ling6/rattle.mp3' },
  { name: 'Claps', icon: 'Hand', src: '/audio/ling6/claps.mp3' },
];

// Landing page content

export const LANDING_STATS = [
  { value: 6, label: 'Ling Sounds', suffix: '', icon: 'Ear', color: 'text-indigo-500' },
  { value: 30, label: 'Milestones Tracked', suffix: '+', icon: 'ListChecks', color: 'text-amber-500' },
  { value: 7, label: 'Screening Modules', suffix: '', icon: 'Sparkles', color: 'text-blue-500' },
  { value: 24, label: 'Months Coverage', suffix: '', icon: 'Shield', color: 'text-emerald-500' },
];

export const LANDING_FEATURES = [
  {
    title: 'Hearing Screening & Detection',
    description: 'Comprehensive screening protocols following JCIH guidelines. Identify potential hearing issues early with structured result tracking.',
    icon: 'Ear',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500',
    gradient: 'from-indigo-500/10 to-indigo-500/5',
    highlights: [
      'OAE & ABR result logging',
      'Risk factor assessment',
      'AI-powered recommendations',
    ],
  },
  {
    title: 'Developmental Milestones',
    description: 'Track auditory and speech milestones from birth to 24 months against clinically validated benchmarks.',
    icon: 'ListChecks',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    gradient: 'from-amber-500/10 to-amber-500/5',
    highlights: [
      '7 age-group milestones',
      'Auditory & speech tracking',
      'Progress visualization',
    ],
  },
  {
    title: 'Ling Six Sound Testing',
    description: 'Perform the gold-standard Ling Six Sound Test with guided audio playback. Record and track responses across sessions.',
    icon: 'Sparkles',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
    gradient: 'from-rose-500/10 to-rose-500/5',
    highlights: [
      'Guided sound playback',
      'Response recording',
      'Environmental sound tests',
    ],
  },
];

export const LANDING_STEPS = [
  {
    step: 1,
    title: 'Create Your Account',
    description: 'Sign up in seconds. Your data is securely stored and private.',
    icon: 'UserPlus',
  },
  {
    step: 2,
    title: 'Add Your Infant',
    description: "Enter your baby's details to create their personal hearing health profile.",
    icon: 'Baby',
  },
  {
    step: 3,
    title: 'Assess Risk Factors',
    description: 'Complete the risk factor checklist based on pregnancy, birth, and family history.',
    icon: 'AlertTriangle',
  },
  {
    step: 4,
    title: 'Screen & Test',
    description: 'Log screening results and perform the Ling Six Sound Test with guided audio.',
    icon: 'ClipboardCheck',
  },
  {
    step: 5,
    title: 'Track & Report',
    description: 'Monitor milestones, view progress charts, and generate comprehensive reports.',
    icon: 'FileText',
  },
];

export const LANDING_TESTIMONIALS = [
  {
    quote: "HearStart gave us peace of mind during our son's first year. The milestone tracker helped us know exactly what to look for and when to seek help.",
    name: 'Priya M.',
    role: 'Parent of a 14-month-old',
    rating: 5,
  },
  {
    quote: 'As a pediatric audiologist, I recommend HearStart to all new parents. The Ling Six Sound Test feature is remarkably well-implemented and easy to use.',
    name: 'Dr. Rajesh K.',
    role: 'Pediatric Audiologist',
    rating: 5,
  },
  {
    quote: "The risk factor checklist caught something we would have missed entirely. Early intervention made all the difference for our daughter's development.",
    name: 'Ananya S.',
    role: 'Parent of a 2-year-old',
    rating: 5,
  },
];
