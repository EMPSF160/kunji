/**
 * CONFIGURATION FILE
 * -------------------------------------------------------------
 * Edit this file to customize names, dates, memories, promises,
 * letter content, and contact information.
 * -------------------------------------------------------------
 */

export const config = {
  // Personal Details
  recipientName: "My Love", // Replace with [HER NAME], e.g. "Priya" or her nickname
  senderName: "Yours Always", // Replace with [MY NAME], e.g. "Suriya"
  
  // Date of separation (YYYY-MM-DD or ISO string)
  // Set to 2 years ago by default. Adjust to your exact date.
  separationDate: "2024-10-10T00:00:00",

  // Honest confession of your mistake (takes 100% accountability, no excuses)
  mistakeStatement: "Because I had been hurt so many times before, I let my fear and mistrust build walls, instead of giving you the unconditional trust and peace you deserved.",

  // Typewriter hero subtitle lines
  heroSubtitleLines: [
    "I don't know where all this will end, but without you, it's really hard for me.",
    "No matter what situation comes, I can't just stop caring about you.",
    "I just want you to understand how much you mean to me, and why I'm sometimes scared."
  ],

  // Easter egg hidden message (revealed when tapping the beating heart in Hero)
  heartEasterEgg: {
    title: "The Truth In My Heart",
    message: "I've never told you this before, but honestly, I'm scared of losing you. Whatever I do for you, I do it with all my heart. I just want you to understand me. ❤️"
  },

  // The Apology Letter (revealed line by line / paragraph by paragraph)
  letter: {
    salutation: "My Dearest,",
    paragraphs: [
      "I don't know where all this will end, but I know that without you, it's going to be really hard for me.",
      "Everyone around me has used me in some way, whether it's my time, money, care or anything else. I know you won't do that to me, but still, somewhere inside, I have that fear. Maybe because I've been hurt so many times, it's hard for me to trust someone completely.",
      "I've never told you this before, but honestly, I'm scared of losing you. I'm scared of getting hurt again after giving someone everything I have.",
      "The way I care for you, love you, give you my time and worry about you, everything comes from my heart. I don't know if anyone else can care for you the way I do, but I know how genuine my feelings are.",
      "I'm not perfect, but whatever I do for you, I do it with all my heart. Maybe that's why I'm scared of getting hurt by you.",
      "Whatever happens, good or bad, I want to be there for you. You may ask me why, but I don't really know how to explain it. It's like how a father can never stop loving his child, no matter what happens. That's how you are to me. No matter what situation comes, I can't just stop caring about you.",
      "Maybe I'm too emotional, or maybe I care too much. I don't know. Sometimes even I don't understand why I'm like this. But one thing I know is that my feelings for you are real.",
      "I've never opened up about this to you before, but there's always this fear inside me. I've already been through a lot, and I don't want to go through that pain again, especially because of someone who means so much to me.",
      "I just want you to understand me. I'm not expecting anything big from you. I just want you to understand how much you mean to me and why I'm sometimes scared. ❤️"
    ],
    closing: "Always caring for you, with all my heart,",
  },

  // 3 Real Memories (used as highlights and in gallery cards)
  memories: [
    {
      title: "Our Quiet Rainy Evening",
      description: "Sharing that hot cup of chai while watching the rain wash the city clean, laughing about silly things until midnight.",
      tag: "Memory 01"
    },
    {
      title: "The Way Your Eyes Smiled",
      description: "That sudden moment when our eyes locked in the middle of a crowded room, and neither of us had to say a single word.",
      tag: "Memory 02"
    },
    {
      title: "Long Drives with Our Favorite Songs",
      description: "Windows rolled down, cold breeze in our hair, and you singing along softly to every melody on the radio.",
      tag: "Memory 03"
    }
  ],

  // 3 Promises I Will Keep
  promises: [
    {
      id: 1,
      title: "Patience Without Conditions",
      subtitle: "Your pace, your terms",
      description: "I will never rush you, pressure you, or expect anything from you. Your comfort, space, and peace of mind will always come first.",
      icon: "ShieldCheck"
    },
    {
      id: 2,
      title: "Radical Honesty & Humility",
      subtitle: "Listening with my whole heart",
      description: "I have learned to drop my pride. I promise to listen to your feelings, validate your hurt, and never dismiss your perspective again.",
      icon: "HeartHandshake"
    },
    {
      id: 3,
      title: "Consistent, Lasting Growth",
      subtitle: "Actions over hollow words",
      description: "Real remorse is proven in how one lives. I promise to be a gentler, more grounded, and dependable man worthy of trust.",
      icon: "Sparkles"
    }
  ],

  // Video Section details
  videoSection: {
    title: "A Moment in Motion",
    subtitle: "Because some moments and words are best felt rather than read.",
    fallbackMessage: "Our cherished recorded moments."
  },

  // Contact info (Shown ONLY if she clicks 'Yes, let's talk')
  contact: {
    yesMessageTitle: "Thank you for listening to my heart...",
    yesMessageBody: "Whatever you wish to say, whether it is gentle or difficult, I am here to listen with an open heart and zero defense.",
    phone: "+91 98765 43210", // Replace with your phone / WhatsApp number
    whatsappNumber: "919876543210", // International digits only without + for wa.me link
    whatsappPrefill: "Hey... I went through your letter. Let's talk.",
    email: "yours@sincereheart.com"
  },

  // Respectful response if she chooses 'I need more time'
  needTimeResponse: {
    title: "I Hear You, and I Respect You",
    message: "Thank you for taking the time to read this. Your feelings and your boundaries are completely valid. Please take as much time as you need, even if that means forever. I only wish for your peace and happiness."
  },

  // Footer message
  footerMessage: "Whatever you decide, I wish you happiness and boundless love."
};

export default config;
