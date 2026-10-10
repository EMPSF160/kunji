import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Smile,
  Coffee,
  Music,
  Moon,
  Flame,
  Award,
  Expand,
  Minimize
} from 'lucide-react';
import mediaData from '../media.json';
import { config } from '../config';

// 16 Custom, Playful, Funny & Deeply Romantic Memory Cards
const MEMORY_DETAILS = [
  {
    id: 1,
    title: "The Chai & Rain Magic",
    caption: "Sharing that hot cup of chai while watching the rain wash the city clean, pretending I wasn't shivering just to stay with you.",
    funnyNote: "You took 80% of the cup, but I'd give you 100% any day.",
    badge: "Cozy Moment ☕",
    color: "from-amber-500/20 to-rose-500/20",
  },
  {
    id: 2,
    title: "Caught In 4K Being Cute",
    caption: "That candid moment when you caught me looking at you, and neither of us could keep a straight face.",
    funnyNote: "I wasn't staring, I was just admiring art.",
    badge: "Caught Smiling 💕",
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: 3,
    title: "The Stolen Hoodie Incident",
    caption: "You stealing my favorite oversized hoodie and claiming 'it smells like comfort and looks way better on me anyway.'",
    funnyNote: "Spoiler: It really did look ten times better on you.",
    badge: "Hoodie Thief 🧸",
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: 4,
    title: "Unapologetic Car Karaoke",
    caption: "Windows rolled down, cold wind in our hair, and you singing every single wrong lyric with 100% confidence.",
    funnyNote: "Completely out of tune, but the sweetest melody on earth.",
    badge: "Rockstar Energy 🎶",
    color: "from-rose-500/20 to-orange-500/20",
  },
  {
    id: 5,
    title: "The 2 AM Food Debate",
    caption: "Arguing for 45 minutes saying 'anything is fine', rejecting the first 10 suggestions, and ordering the exact same thing.",
    funnyNote: "And you still ate half of my fries.",
    badge: "Midnight Cravings 🍕",
    color: "from-red-500/20 to-amber-500/20",
  },
  {
    id: 6,
    title: "The Eye Contact Telepathy",
    caption: "That sudden moment when our eyes locked in the middle of a noisy room, and the entire world went completely quiet.",
    funnyNote: "We had a 10-minute conversation with zero words.",
    badge: "Silent Magic ✨",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: 7,
    title: "The Cute Angry Pout",
    caption: "The face you make when I playfully tease you—trying so hard to look furious but ending up ten times more adorable.",
    funnyNote: "Threat level: Zero. Cuteness level: Infinite.",
    badge: "Fake Angry 😾",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 8,
    title: "Our Long Quiet Walks",
    caption: "Walking hand in hand without saying a word, realizing that home isn't four walls—it's having you right next to me.",
    funnyNote: "My hand was literally made to hold yours.",
    badge: "Our Safe Place 🌙",
    color: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    id: 9,
    title: "Failed Aesthetic Photo Attempts",
    caption: "Trying so hard to pose for one serious, dramatic photo together, and bursting into laughter 2 seconds in.",
    funnyNote: "Our bloopers are honestly my favorite memories.",
    badge: "Blooper Queen 📸",
    color: "from-amber-500/20 to-pink-500/20",
  },
  {
    id: 10,
    title: "When Your Eyes Light Up",
    caption: "You passionately explaining something random you love, and me just sitting there lost in how radiant you look.",
    funnyNote: "I didn't hear the plot, I was just admiring your eyes.",
    badge: "Pure Radiance 🌟",
    color: "from-yellow-500/20 to-rose-500/20",
  },
  {
    id: 11,
    title: "The 'Did You Eat?' Check-ins",
    caption: "The way you always scolded me to eat on time and drink water, caring for me in ways nobody else ever has.",
    funnyNote: "My personal 24/7 caring nurse & commander.",
    badge: "Pure Love 🥣",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 12,
    title: "Dancing With No Music",
    caption: "That spontaneous little happy dance you do when delicious food arrives or when you're just excited about life.",
    funnyNote: "Olympic gold medal in happy wiggles.",
    badge: "Happy Wiggles 💃",
    color: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: 13,
    title: "Drenched Without An Umbrella",
    caption: "Getting caught in the sudden downpour, soaked from head to toe, running and laughing like two goofy kids.",
    funnyNote: "Ruined clothes, ruined shoes, the happiest day of my life.",
    badge: "Rainy Adventure 🌧️",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 14,
    title: "Sleepy Morning Voice",
    caption: "That sweet, raspy morning voice and half-asleep smile before you've even had your first sip of water.",
    funnyNote: "The purest, softest, most genuine sight in existence.",
    badge: "Sleepyhead 😴",
    color: "from-rose-500/20 to-purple-500/20",
  },
  {
    id: 15,
    title: "Promises Under The Stars",
    caption: "Talking about our wildest dreams late into the night, whispering thoughts we never trusted anyone else with.",
    funnyNote: "Every secret you gave me is safe forever.",
    badge: "Starlit Vows 🌌",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 16,
    title: "Effortlessly, Beautifully You",
    caption: "Just you being completely yourself—no filters, no guards, just the sweetest, purest soul I'll ever know.",
    funnyNote: "The one person I would choose in every single lifetime.",
    badge: "My Whole World 💖",
    color: "from-rose-500/20 to-amber-500/20",
  },
];

// Interactive Scrapbook 3D Photo Card
function ScrapbookPhotoCard({ photo, index, onSelect, memory, isLiked, onToggleLike }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [imageFit, setImageFit] = useState('cover'); // 'cover' or 'contain'

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="group relative rounded-3xl overflow-hidden glass-card border border-rosegold-light/25 shadow-xl transition-all duration-300 hover:shadow-[0_20px_45px_-10px_rgba(244,114,182,0.35)] hover:border-rosegold-400/50 flex flex-col justify-between"
      >
        {/* Dynamic glare shine */}
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 60%)`,
          }}
        />

        {/* Top Playful Badge & Heart Like Button */}
        <div className="p-3.5 pb-2 flex items-center justify-between z-10 bg-midnight-950/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-rosegold-light bg-rosegold-500/20 px-2 py-0.5 rounded-full border border-rosegold-light/20">
              #{index + 1}
            </span>
            <span className="text-[11px] font-medium text-rose-200/90 truncate max-w-[130px] sm:max-w-[150px]">
              {memory.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Fit / Cover Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImageFit(imageFit === 'cover' ? 'contain' : 'cover');
              }}
              className="p-1.5 rounded-full text-rose-300/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={imageFit === 'cover' ? 'Show uncropped photo' : 'Fill frame'}
            >
              {imageFit === 'cover' ? <Expand className="w-3.5 h-3.5" /> : <Minimize className="w-3.5 h-3.5" />}
            </button>

            {/* Like Heart Button */}
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(index);
              }}
              className="p-1.5 rounded-full text-rose-300 hover:text-white transition-colors cursor-pointer"
              title="Heart this memory"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked
                    ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                    : 'text-rose-300/60 hover:text-rose-400'
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Image Container with Smart Crop & Blurred Ambient Background */}
        <div
          onClick={() => onSelect(index)}
          className="relative aspect-[4/5] w-full overflow-hidden bg-midnight-950 cursor-pointer group/img"
        >
          {/* Blurred Background Duplicate (ensures zero black bars or awkward crop) */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-lg opacity-35 scale-110 pointer-events-none"
            style={{ backgroundImage: `url("${photo.src}")` }}
          />

          {/* Main Photo */}
          <img
            src={photo.src}
            alt={memory.title}
            loading="lazy"
            className={`relative z-10 w-full h-full transition-transform duration-700 ease-out group-hover/img:scale-105 ${
              imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'
            }`}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-50 group-hover/img:opacity-30 transition-opacity" />

          {/* Hover Fullscreen Hint */}
          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
            <div className="p-2 rounded-full bg-midnight-900/80 backdrop-blur-md text-white shadow-lg">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Handwritten Caption & Cute Note */}
        <div className="p-4 sm:p-5 text-center bg-midnight-950/60 backdrop-blur-md border-t border-rosegold-500/15 flex-1 flex flex-col items-center justify-between">
          <div className="w-full text-center">
            <h4 className="font-playfair text-base sm:text-lg font-bold text-white group-hover:text-rosegold-light transition-colors line-clamp-1 mb-1.5 text-center">
              {memory.title}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-rose-100/80 leading-relaxed font-light line-clamp-3 text-center">
              "{memory.caption}"
            </p>
          </div>

          {/* Funny / Sweet Little Post-it Note */}
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-center gap-1.5 w-full text-center">
            <Smile className="w-3.5 h-3.5 text-rosegold-accent shrink-0" />
            <p className="font-dancing text-xs sm:text-sm text-rosegold-light italic line-clamp-2 text-center">
              {memory.funnyNote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const EXCLUDED_FILENAMES = new Set([
  // 3 Special Moments (Just You & Me)
  'WhatsApp Image 2026-10-10 at 10.01.58 PM (1).jpeg',
  'WhatsApp Image 2026-10-10 at 10.01.58 PM.jpeg',
  'WhatsApp Image 2026-10-10 at 10.01.59 PM (1).jpeg',
  // 4 Mirror Selfies (Reflections of Us)
  'WhatsApp Image 2026-10-10 at 10.01.59 PM.jpeg',
  'WhatsApp Image 2026-10-10 at 10.02.00 PM (1).jpeg',
  'WhatsApp Image 2026-10-10 at 10.02.00 PM.jpeg',
  'WhatsApp Image 2026-10-10 at 10.02.01 PM.jpeg',
  // Dedicated SMS Song Photo (The Smile That Stole My Heart)
  'WhatsApp Image 2026-10-10 at 10.01.57 PM.jpeg',
  // Dedicated Teal Saree Photo (Elegance in Motion)
  'WhatsApp Image 2026-10-10 at 10.00.19 PM.jpeg'
]);

export default function MemoryGallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});
  const photos = (mediaData.photos || []).filter(p => !EXCLUDED_FILENAMES.has(p.filename));

  const toggleLike = (index) => {
    setLikedPhotos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getMemory = (idx) => {
    return MEMORY_DETAILS[idx % MEMORY_DETAILS.length];
  };

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto text-center">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-700/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-rosegold-500/15 blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Camera className="w-3.5 h-3.5 text-rosegold-light" />
          <span>Our 16 Cherished Moments</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          Moments That Made Us "Us"
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/85 max-w-xl mx-auto">
          "From silly late-night giggles to quiet rain-soaked evenings, every second with you was a treasure."
        </p>
      </motion.div>

      {/* Gallery Grid */}
      {photos.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-rosegold-300 mx-auto mb-3 opacity-60" />
          <p className="text-rose-200 font-playfair text-lg">No photos added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => {
            const memory = getMemory(index);

            return (
              <ScrapbookPhotoCard
                key={photo.id || index}
                photo={photo}
                index={index}
                memory={memory}
                isLiked={likedPhotos[index]}
                onToggleLike={toggleLike}
                onSelect={setSelectedPhotoIndex}
              />
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex justify-between items-center z-20">
              <div className="flex items-center gap-2">
                <span className="text-sm font-sans font-medium text-rosegold-light bg-white/10 px-3 py-1 rounded-full">
                  Memory #{selectedPhotoIndex + 1} of {photos.length}
                </span>
                <span className="text-xs text-rose-300/80 hidden sm:inline">
                  {getMemory(selectedPhotoIndex).badge}
                </span>
              </div>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-3 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors z-20 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors z-20 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center p-2"
            >
              <img
                src={photos[selectedPhotoIndex].src}
                alt={getMemory(selectedPhotoIndex).title}
                className="max-h-[65vh] max-w-full object-contain rounded-2xl border border-rosegold-light/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
              />

              <div className="mt-4 text-center max-w-xl px-4 glass-card p-4 rounded-2xl border border-rosegold-light/15">
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
                  {getMemory(selectedPhotoIndex).title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light">
                  "{getMemory(selectedPhotoIndex).caption}"
                </p>
                <p className="font-dancing text-sm sm:text-base text-rosegold-light mt-2 italic">
                  — {getMemory(selectedPhotoIndex).funnyNote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
