

export const HIGH_RISK_FACTORS = [
  {
    category: 'Family and Genetic History',
    factors: [
      'Parents are <strong>blood relatives</strong> (consanguineous marriage).',
      'There is a family history of <strong>childhood hearing loss</strong>.',
      'The child has a known genetic condition or syndrome linked to hearing loss (e.g., Waardenburg, Pendred, BOR syndrome).',
    ],
  },
  {
    category: 'During Pregnancy',
    factors: [
      'The mother had a <strong>serious illness</strong> or high fever during pregnancy.',
      'The mother took <strong>medications known to affect hearing</strong> (such as aminoglycosides).',
      'The mother consumed <strong>alcohol or tobacco</strong> during pregnancy.',
      'There was an attempt to <strong>terminate the pregnancy</strong>.',
      '<strong>In utero infections</strong> such as CMV, herpes, rubella, syphilis, toxoplasmosis, Zika.',
      'The mother had <strong>high blood pressure</strong> during pregnancy or delivery.',
    ],
  },
  {
    category: 'At Birth',
    factors: [
      'The baby was born <strong>before 36 weeks</strong> of pregnancy (premature).',
      "The baby's birth weight was <strong>low, especially below 1500 grams</strong>.",
      'The baby <strong>did not cry immediately</strong> after birth.',
      'The baby had <strong>jaundice</strong> that required special treatment (phototherapy or exchange transfusion).',
      '<strong>NICU stay of more than 5 days</strong>.',
      '<strong>Assisted ventilation</strong> including CPAP, ECMO.',
      'The delivery was <strong>complicated</strong> (breech, prolonged, or difficult labor).',
    ],
  },
  {
    category: 'Physical and Structural Indicators',
    factors: [
      '<strong>Craniofacial anomalies</strong>, including those involving the pinna, ear canal, ear tags, ear pits, and temporal bone anomalies.',
      'The baby was born with <strong>abnormalities in the head, ears, eyes, lips, or face</strong>.',
      'The child shows features of a <strong>syndrome</strong> that may be associated with hearing problems.',
    ],
  },
  {
    category: 'Health Conditions After Birth',
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
    ageGroup: '10 to 13 Months',
    milestones: [
      'By 12 months of age, the curiosity of the child is full-blown and quick localization to an appropriately presented auditory stimulus.',
      'By the end of 13 months of age, the infant is able to localizes to side and below in any plane above or below eye level',
      'By age 10 months, reaches for objects.',
      'Points, waves, and shows or gives objects.',
      'Uses gestures along with sounds - Waves "bye-bye" or raises arms to be picked up.',
      'Tries to copy sounds that you make.',
      'Enjoys dancing.',
      'Shows understanding of common phrases - Reacts appropriately to "no" or "want more?"',
      'Says one or two words—like mama, dada, hi, and bye.',
    ],
  },
  {
    ageGroup: '13 to 16 Months',
    milestones: [
      'Localize to side, below, and indirectly above.',
      'Understands and follows simple instructions - Responds to basic requests like "come here" or "give me the ball."',
      'Recognizes and points to familiar objects when named - Can identify everyday items like "shoe," "cup," or "dog."',
      'Imitates sounds and simple words - Tries to repeat new words heard in conversation.',
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
  { name: 'Bell', icon: 'BellRing' },
  { name: 'Rattle', icon: 'ToyBrick' },
  { name: 'Claps', icon: 'Hand' },
];
