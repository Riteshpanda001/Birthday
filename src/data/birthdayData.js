/**
 * ============================================================================
 * BIRTHDAY SURPRISE CONFIGURATION
 * ============================================================================
 * Edit this single file to personalize your girlfriend's birthday website.
 * Replace placeholder names, dates, captions, photos, and messages below.
 * ============================================================================
 */

export const birthdayConfig = {
  // Replace with her name (e.g., "Ananya", "Sophia", or keep "My Love")
  herName: 'My Love',
  // Optional affectionate subtitle shown under her name
  birthdayHeadline: 'Happy Birthday, Beautiful',
  // Replace with the birthday date or special year label
  specialDate: 'A Celebration Just For You',
  // Your name or closing sign-off
  senderName: 'Forever Yours ❤️',

  welcome: {
    badge: 'A Little Universe Made For You',
    subtitle: 'I made something special just for you...',
    ctaText: 'Open Your Surprise ❤️',
  },

  hero: {
    eyebrow: 'Today Is All About You',
    titlePrefix: 'Happy Birthday,',
    description:
      'Every smile you share, every gentle moment, and every dream we hold close deserves to be celebrated under the brightest stars.',
    scrollHint: 'Scroll gently to begin your journey',
  },

  music: {
    // Place your MP3 file at: public/music/our-song.mp3
    src: '/music/our-song.mp3',
    title: 'Our Special Song',
    artist: 'Add our-song.mp3 in public/music/',
  },
};

/**
 * FEATURE TWO: OUR BEAUTIFUL MEMORIES (Polaroid Gallery)
 * Curated from your personal photographs in `public/memories/`.
 */
export const memoriesMeta = {
  heading: 'Our Beautiful Memories',
  subtitle:
    'Every picture holds a little piece of my heart, and every moment with you becomes a memory I wish I could live again.',
  closingNote:
    'These are not just photographs. They are little pieces of happiness that I will always keep close to my heart. ❤️',
};

export const memoriesData = [
  {
    id: 'memory-1',
    image: '/memories/our-special-moment-1.jpeg',
    label: 'Memory 01 • Keep Shining',
    title: 'Graceful in Royal Purple',
    caption:
      'There is a quiet magic in the way you carry yourself here—your soft smile, the sparkle in your eyes, and the warmth you bring into every room. Seeing you shine so effortlessly makes my heart swell with pride and affection. You look truly breathtaking.',
    rotation: -2.2,
    focalPoint: 'center 14%',
    featured: true,
  },
  {
    id: 'memory-2',
    image: '/memories/beautiful-moment-02.jpeg',
    label: 'Memory 02 • Pure Elegance',
    title: 'A Beauty That Words Cannot Describe ❤️',
    caption:
      'Some moments are beautiful not because of where they happen, but because of the person in them. Your elegance, your beautiful smile, and the way you carry yourself make this picture so special. Every time I look at you, I find another reason to admire you. You will always be beautiful in my eyes, in every little detail and in every possible way.',
    rotation: 1.8,
    focalPoint: 'center 12%',
  },
  {
    id: 'memory-3',
    image: '/memories/beautiful-moment-03.jpeg',
    label: 'Memory 03 • Starlit Glow',
    title: 'A Glance That Steals My Heart ❤️',
    caption:
      'Surrounded by soft evening lights and festive bokeh, your smile outshines everything around you. There is something so breathtaking about the way you glance back with that effortless warmth. In a world full of colors and noise, my eyes will always search for you.',
    rotation: -1.6,
    focalPoint: 'center 24%',
  },
  {
    id: 'memory-4',
    image: '/memories/our-special-moment-4.jpeg',
    label: 'Memory 04 • Everyday Magic',
    title: 'Cozy Charm & Gentle Warmth',
    caption:
      'You never need grand occasions to look unforgettable—even in a cozy navy hoodie, your effortless beauty and sweet smile steal my heart all over again. It is these simple, natural moments with you that I treasure most.',
    rotation: 2.3,
    focalPoint: 'center 10%',
  },
  {
    id: 'memory-5',
    image: '/memories/our-special-moment-5.jpeg',
    label: 'Memory 05 • Blush Elegance',
    title: 'Pretty in Blush Pink',
    caption:
      'Wrapped in soft blush pink, you look so serene, graceful, and endlessly lovely. Every little detail—your delicate smile, your henna-painted hand, your gentle poise—makes this photograph feel like a treasured keepsake.',
    rotation: -2.0,
    focalPoint: 'center 12%',
  },
  {
    id: 'memory-6',
    image: '/memories/our-special-moment-6.jpeg',
    label: 'Memory 06 • Festive Glow',
    title: 'Surrounded by Color & Happiness',
    caption:
      'Amid all the bright colors and festive balloons around you, you are still the loveliest part of the entire frame. Thank you for filling life with so much warmth, laughter, and unforgettable memories.',
    rotation: 1.5,
    focalPoint: 'center 16%',
  },
];

/**
 * FEATURE TWO (PART B): OUR RELATIONSHIP TIMELINE (SIX-YEAR LOVE STORY)
 * Edit chapters, romantic quotations, and the closing message below.
 */
export const timelineMeta = {
  eyebrow: 'Six Years of Us',
  heading: 'Our Relationship Timeline',
  subtitle:
    'Six years, countless memories, countless feelings, and a story that my heart never wants to end.',
};

export const timelineQuotes = [
  'You are not just a memory in my life; you are a beautiful part of my every day.',
  'If I could relive one thing in life, I would choose the little moments that brought me closer to you.',
  'Some people make life beautiful simply by being part of it. You are that person for me.',
  "I don't need every moment to be perfect. I just want more moments with you.",
  'The best thing about our story is that it is still being written.',
  'Six years later, and my heart still finds a reason to choose you.',
  'I may forget the dates, but I will never want to forget how special you make me feel.',
  'Our story is made of little moments that together mean everything.',
];

export const timelineData = [
  {
    id: 'chapter-1',
    chapterLabel: 'Year 01 • Chapter 01',
    title: 'Chapter 01 – The Beginning of Something Beautiful',
    quote:
      'Every beautiful story has a beginning. Ours became one of my favorite parts of life.',
    description:
      'That gentle beginning when everything felt new, exciting, and quietly full of promise—the moment my world grew warmer simply because you walked into it.',
  },
  {
    id: 'chapter-2',
    chapterLabel: 'Year 02 • Chapter 02',
    title: 'Chapter 02 – Growing Closer',
    quote:
      'Somewhere between the little conversations and countless smiles, you became someone incredibly special to me.',
    description:
      'Without even noticing when it happened, sharing my thoughts with you became the easiest and sweetest part of every single day.',
  },
  {
    id: 'chapter-3',
    chapterLabel: 'Year 03 • Chapter 03',
    title: 'Chapter 03 – Memories That Stay Forever',
    quote:
      'Time moves forward, but some moments remain forever in the heart.',
    description:
      'Even when days blur together, the warmth of your laughter and the comfort of your presence stay etched in my heart like timeless treasures.',
  },
  {
    id: 'chapter-4',
    chapterLabel: 'Year 04 • Chapter 04',
    title: 'Chapter 04 – Through Every Little Moment',
    quote:
      'Not every beautiful moment needs a photograph. Some of the best memories live quietly in our hearts.',
    description:
      'Through ordinary days, quiet feelings, and unspoken understanding, we built something steady, gentle, and deeply real.',
  },
  {
    id: 'chapter-5',
    chapterLabel: 'Year 05 • Chapter 05',
    title: 'Chapter 05 – A Love That Keeps Growing',
    quote:
      'Years may pass, days may change, but the happiness of having you in my life remains precious.',
    description:
      'With every passing year, my gratitude for you only deepens—for your kindness, your patience, and the unmistakable light you bring into my life.',
  },
  {
    id: 'chapter-6',
    chapterLabel: 'Year 06 • Chapter 06',
    title: 'Chapter 06 – My Favorite Story Is Still Us',
    quote:
      'Six years have given me countless reasons to smile, and I still look forward to every chapter we have yet to write together.',
    description:
      'Looking back at six years with you fills my heart with awe—and looking ahead with you fills me with nothing but hope and love.',
  },
];

export const timelineClosing = {
  heading: 'And Our Story Continues...',
  message: `Six years ago, a beautiful chapter began. Since then, time has given us countless moments, smiles, feelings, and memories.

I may not remember every date or every little detail, but I know that the moments we have shared will always hold a special place in my heart.

Thank you for being part of my journey.

And if life gives me a thousand more chapters, my favorite wish will always be to have you in them.

Here's to our past, our present, and every beautiful tomorrow waiting for us.

I love you. ❤️`,
};

/**
 * FEATURE THREE: A LETTER FROM MY HEART
 * Edit the salutation, body paragraphs, and signature as you wish.
 */
export const loveLetterData = {
  envelopeLabel: 'You Have a Special Letter 💌',
  openButtonText: 'Open Your Letter',
  heading: 'A Letter From My Heart',
  fullScreenHeading: 'For You, Always ❤️',
  fullScreenSubtitle: 'A Letter Written With Love',
  greeting: 'My Dearest Love,',
  closingLead: 'With all the love my heart can hold,',
  signature: 'Forever Yours, Always and Always ❤️',
  highlightedQuote:
    '"May God protect your smile, bless your dreams, and make every chapter of your life more beautiful than the last." ❤️',
  content: `Happy Birthday, My Beautiful Girl! ❤️

Sometimes, I wonder how one person can become so incredibly special that even the simplest moments of life feel more beautiful because of them. And when I think of you, I find my answer.

Today, I just want you to know how precious you are to me. Your beautiful smile is one of my favorite things in this world. I hope you never lose that smile, because it has a magical way of making everything around you feel brighter. Even on your difficult days, I hope you find a reason to smile and remember how loved and special you are.

On your birthday, my heart is filled with countless wishes for you. May all your dreams come true, may every effort bring you success, and may every new day bring you happiness, peace, and beautiful opportunities. I wish you good health, endless strength, confidence, and all the little things that make your heart happy.

I pray that God always blesses you, protects you from every difficulty, guides you toward the right path, and fills your life with love, peace, and countless reasons to smile. May God keep you safe, give you the strength to overcome every challenge, and make your future more beautiful than you ever imagined.

I don't know what every tomorrow will bring, but I sincerely hope it brings you happiness, beautiful surprises, and dreams coming true. I wish to see you grow, achieve everything you work for, and keep that beautiful smile shining wherever life takes you.

And if I could make one special wish today, it would be that you always remain happy, healthy, confident, and surrounded by love. You deserve every beautiful thing this world has to offer.

Thank you for being you. Never forget how special, valuable, and deeply loved you are.

Happy Birthday once again, My Beautiful Girl!

May God bless you today, tomorrow, and always. ❤️`,
};

/**
 * FEATURE FOUR: VIRTUAL BIRTHDAY CAKE & FULL-SCREEN CELEBRATION
 */
export const cakeData = {
  heading: 'Make a Birthday Wish',
  prompt: 'Close your eyes, make a wish, and click below.',
  blowButtonText: 'Blow Out Your Candles ❤️',
  wishGrantedMessage: 'May all your wishes come true! ❤️',
  replayButtonText: 'Relight Candles & Wish Again',
};

export const celebrationData = {
  heading: 'HAPPY BIRTHDAY, MY LOVE! ❤️',
  subtitle:
    'Today is all about you, your beautiful smile, and all the happiness you deserve.',
  wishPrompt: 'Make a wish, my beautiful girl! ✨',
  personalMessage:
    'On this special day, I wish you endless happiness, countless smiles, beautiful surprises, and all the success your heart dreams of. May God always protect you, guide you, and fill your life with love and blessings. Keep smiling, my beautiful girl. You deserve the entire universe of happiness. ❤️',
  surpriseButtonText: 'One More Birthday Surprise ❤️',
  finalSurpriseMessage:
    'Today, tomorrow, and every day, I wish you a life full of happiness. No matter how many birthdays pass, I will always wish to see that beautiful smile on your face. Happy Birthday once again, my love! ❤️',
};

/**
 * FEATURE FIVE: 20 REASONS WHY YOU'RE SPECIAL
 * Edit any of these 20 reasons with your own heartfelt words.
 */
export const reasonsData = [
  'Your beautiful smile.',
  'The way you make ordinary moments special.',
  'Your kindness.',
  'Your unique personality.',
  'The happiness you bring into my life.',
  'The warmth in your voice when you talk about things you love.',
  'How effortlessly you brighten even the hardest days.',
  'The gentle way you care for the people around you.',
  'Your laugh—it is my absolute favorite sound.',
  'The little glances and quiet moments we share.',
  'Your strength and grace in everything you do.',
  'How thoughtful and attentive you are.',
  'The way your eyes light up when you are excited.',
  'How safe and at home I feel whenever I am with you.',
  'Your patience, understanding, and warm heart.',
  'All the little quirks that make you wonderfully you.',
  'The way you inspire me to be a better person.',
  'Every inside joke and memory that belongs just to us.',
  'Your unwavering sweetness and genuine soul.',
  'Simply being you—and letting me love you every day.',
];

export const reasonsMeta = {
  heading: "Reasons Why You're So Special to Me ❤️",
  subheading: 'Tap below to reveal each reason, one little spark at a time.',
  revealButtonText: 'Reveal Next Reason ✨',
  completionMessage: 'And I still have a million more reasons to love you...',
};

/**
 * FEATURE SIX: OUR FUTURE TOGETHER
 * Editable placeholder dream cards across four romantic themes.
 */
export const futureDreamsData = {
  heading: 'Our Future, Our Little Dreams',
  subheading:
    'Under every sky yet to come, here are the little promises and adventures waiting for us.',
  featuredQuote: 'My favorite future is the one with you. ❤️',
  dreams: [
    {
      id: 'dream-places',
      category: 'Places We Want to Visit Together',
      title: 'Dream Destinations & Starlit Skies',
      description:
        'Placeholder: Add the cities, beaches, mountains, or quiet cafés around the world you want to explore hand in hand.',
      tag: 'Adventures',
    },
    {
      id: 'dream-experiences',
      category: 'Beautiful Experiences We Want to Share',
      title: 'Unforgettable Firsts & Celebrations',
      description:
        'Placeholder: Concerts, midnight drives, cooking together, stargazing trips, and every milestone we will toast to.',
      tag: 'Experiences',
    },
    {
      id: 'dream-goals',
      category: 'Dreams We Want to Achieve',
      title: 'Growing & Shining Side by Side',
      description:
        'Placeholder: Supporting each other’s biggest passions, cheering for every victory, and building a life full of pride and joy.',
      tag: 'Milestones',
    },
    {
      id: 'dream-moments',
      category: 'Little Everyday Moments',
      title: 'The Quiet Magic of Every Day',
      description:
        'Placeholder: Slow Sunday mornings, shared playlists, rainy-day movies, and smiling at each other across the room.',
      tag: 'Everyday Magic',
    },
  ],
};

/**
 * FINAL EMOTIONAL BIRTHDAY MESSAGE
 */
export const finalMessageData = {
  eyebrow: 'Until Every Tomorrow',
  heading: 'Happy Birthday Once Again, My Love',
  message:
    'Thank you for being you, for filling my days with light, and for making life feel like the sweetest story. No matter where time takes us, my heart will always celebrate you.',
  signature: 'All my love, always ❤️',
};

export const birthdaySongData = {
  lines: [
    "HAPPY BIRTHDAY TO BEAUTY ❤️",
    "HAPPY BIRTHDAY TO KANJUS 🥰",
    "HAPPY BIRTHDAY TO BUDIKI 😘",
    "HAPPY BIRTHDAY DEAR MY LOVE ❤️",
    "HAPPY BIRTHDAY TO MY PRINCESS 👑",
    "HAPPY BIRTHDAY TO MY CUTIE PIE 💗",
    "HAPPY BIRTHDAY TO MY SWEETHEART 💕",
    "HAPPY BIRTHDAY TO MY EVERYTHING 🫂",
  ],
};

