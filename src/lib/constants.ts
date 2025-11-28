
export const HIGH_RISK_FACTORS = [
  'Family history of permanent childhood hearing loss',
  'NICU stay of more than 5 days',
  'In utero infections (e.g., CMV, herpes, rubella)',
  'Craniofacial anomalies',
  'Physical findings associated with a syndrome known to include hearing loss',
  'Syndromes associated with progressive or delayed-onset hearing loss',
  'Neurodegenerative disorders',
  'Postnatal infections associated with sensorineural hearing loss',
  'Head trauma',
  'Chemotherapy',
  'Hyperbilirubinemia requiring exchange transfusion',
  'Exposure to ototoxic medications (e.g., certain antibiotics)',
  'Parental or caregiver concern about hearing or development',
];

export const AUDITORY_MILESTONES = [
  {
    ageGroup: '0-3 Months',
    milestones: [
      'Startles at loud noises',
      'Wakes up or stirs at loud sounds',
      'Responds to your voice by smiling or cooing',
      'Calms down at a familiar voice',
    ],
  },
  {
    ageGroup: '4-6 Months',
    milestones: [
      'Follows sounds with their eyes',
      'Responds to changes in the tone of your voice',
      'Notices toys that make sounds',
      'Pays attention to music',
      'Babbles in a speech-like way and uses many different sounds, including p, b and m',
    ],
  },
  {
    ageGroup: '7-12 Months',
    milestones: [
      'Enjoys games like peek-a-boo and pat-a-cake',
      'Turns and looks in the direction of sounds',
      'Listens when spoken to',
      'Understands words for common items and people',
      'Starts to respond to simple requests',
      'Babbles with changes in tone',
      'Says "ma-ma" or "da-da"',
      'Imitates speech sounds',
    ],
  },
  {
    ageGroup: 'By the End of 18 Months',
    milestones: [
      'Localizes directly all signals to side, below and above.',
      'Recognize names of familiar people, objects, and body parts.',
      'Follow simple directions accompanied by gestures.',
      'Say as many as 10 words.',
      'Points to a picture in a book when named',
    ],
  },
  {
    ageGroup: 'By the End of 24 Months',
    milestones: [
      'Locates directly a sound at any angle.',
      'Use simple phrases, such as "more milk".',
      'Ask one- to two-word questions, such as "Goodbye bye?"',
      'Follow simple commands and understand simple questions.',
      'Speak about 50 or more words.',
      'Speak well enough to be understood at least half the time by parents and other primary caregivers.',
      'Points to objects or pictures when they are named in a book',
    ],
  },
];

export const LING_SIX_SOUNDS = [
  { sound: 'a', ipa: '/ɑ/', description: 'as in "f-a-ther"' },
  { sound: 'u', ipa: '/u/', description: 'as in "b-oo-t"' },
  { sound: 'i', ipa: '/i/', description: 'as in "f-ee-t"' },
  { sound: 'm', ipa: '/m/', description: 'as in "m-o-m"' },
  { sound: 's', ipa: '/s/', description: 'as in "s-un"' },
  { sound: 'sh', ipa: '/ʃ/', description: 'as in "sh-oe"' },
];

export const ENVIRONMENTAL_SOUNDS = [
  { name: 'Bell', icon: 'Bell' },
  { name: 'Rattle', icon: 'ToyBrick' },
  { name: 'Clapping', icon: 'Hand' },
  { name: 'Whistle', icon: 'Wind' },
];
