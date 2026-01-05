



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
      'The mother had a <strong>serious illness or high fever</strong> during pregnancy.',
      'The mother took <strong>medications known to affect hearing</strong> (such as aminoglycosides).',
      'The mother consumed <strong>alcohol or tobacco</strong> during pregnancy.',
      'There was an <strong>attempt to terminate the pregnancy</strong>.',
      'The mother had <strong>infections</strong> like rubella, cytomegalovirus (CMV), syphilis, toxoplasmosis, herpes, or Zika virus during pregnancy.',
      'The mother had <strong>high blood pressure</strong> during pregnancy or delivery.',
    ],
  },
  {
    category: 'At Birth',
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
    ageGroup: 'Birth to 3 Months',
    milestones: [
      'Arousal from the sleep',
      'In a very quiet environment eye -blink or eye-widening response to soft sounds from noise makers.',
      'Quiets or smiles when you talk.',
      'Makes sounds back and forth with you.',
      'Makes sounds that differ depending on whether they are happy or upset.',
      'Coos makes sounds like ooooo, aahh, and mmmmm.',
      'Turns head or moves eyes in response to sound – May briefly turn toward a sound, especially familiar voices.',
      'Recognizes and responds to familiar voices – Prefers the sound of their mother’s voice over others.',
    ],
  },
  {
    ageGroup: '4 to 6 Months',
    milestones: [
      'At 3 to 4 months of age, the infant may begin to show a slow head turn toward a sound source.',
      'By the 4 months the infant begins to turn his or her head towards the sound source in a more consistent, but still wobble, manner.',
      'Giggles and laughs.',
      'Enjoys music and rhythmic sounds – Shows excitement or calms down when listening to music.',
      'Look at objects of interest and follow objects with their eyes.',
      'Reacts to toys that make sounds, like those with bells or music.',
      'Vocalizes during play or with objects in the mouth.',
      'Vocalizes different vowel sounds—sometimes combined with a consonant—like uuuuuummm, aaagoo, or daaa.',
    ],
  },
  {
    ageGroup: '7 to 9 Months',
    milestones: [
      'By 7 months, the child can localize to side sounds',
      'Between 7 and 9 months, the infant begin to identify the precise location of the sound source with direct head turn (can localize to the side and directly below)',
      'Looks at you when you call their name.',
      'Stops for a moment when you say, “No.”',
      'Babbles long strings of sounds, like mama, upup, or baba',
      'Enjoys interactive sound-based games – Reacts to games like peek-a-boo or pat-a-cake.',
      'Recognizes the names of some people and objects.',
      'Shows preference for certain sounds – Expresses excitement for favourite songs or familiar voices.',
    ],
  },
  {
    ageGroup: '10 to 13 Months',
    milestones: [
      'By 12 months of age, the curiosity of the child is full-blown and quick localization to an appropriately presented auditory stimulus.',
      'By the end of 13 months of age, the infant is able to localizes to side and below in any plane above or below eye level',
      'By age 10 months, reaches for objects.',
      'Points, waves, and shows or gives objects.',
      'Uses gestures along with sounds – Waves “bye-bye” or raises arms to be picked up.',
      'Tries to copy sounds that you make.',
      'Enjoys dancing.',
      'Shows understanding of common phrases – Reacts appropriately to “no” or “want more?”',
      'Says one or two words—like mama, dada, hi, and bye.',
    ],
  },
  {
    ageGroup: '13 to 16 Months',
    milestones: [
      'Localize to side, below, and indirectly above.',
      'Understands and follows simple instructions – Responds to basic requests like “come here” or “give me the ball.”',
      'Recognizes and points to familiar objects when named – Can identify everyday items like “shoe,” “cup,” or “dog.”',
      'Imitates sounds and simple words – Tries to repeat new words heard in conversation.',
    ],
  },
  {
    ageGroup: 'By the End of 18 Months',
    milestones: [
      'Localizes directly all signals to side, below and above.',
      'Recognize names of familiar people, objects, and body parts.',
      'Follow simple directions accompanied by gestures.',
      'Say as many as 10 words.',
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
  { name: 'Bell', icon: 'BellRing', src: '/audio/ling6/bell.mp3' },
  { name: 'Rattle', icon: 'ToyBrick', src: '/audio/ling6/rattle.mp3' },
  { name: 'Claps', icon: 'Hand', src: '/audio/ling6/claps.mp3' },
];
