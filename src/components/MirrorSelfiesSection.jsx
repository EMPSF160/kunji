import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Smile, Camera } from 'lucide-react';

const FOUR_MIRROR_MOMENTS = [
  {
    id: 'mirror-1',
    src: './photos/WhatsApp Image 2026-10-10 at 10.01.59 PM.jpeg',
    title: 'Our Reflection & Little Secrets',
    caption: 'Standing together in front of the mirror, matching our smiles. [No one sees what you see even if they see it too]. You made every simple place feel like our own private universe.',
    sweetNote: 'Best mirror selfie duo on earth.',
    badge: 'Matching Vibes 🪞',
    tag: 'Mirror 01',
  },
  {
    id: 'mirror-2',
    src: './photos/WhatsApp Image 2026-10-10 at 10.02.00 PM (1).jpeg',
    title: 'Leaning On Each Other',
    caption: 'That cozy smile when you leaned your head gently onto my shoulder. No matter how exhausting the world was, having you close made everything completely peaceful.',
    sweetNote: 'You had that album cover pose ready to go.',
    badge: 'Album Cover Duo 🎧',
    tag: 'Mirror 02',
  },
  {
    id: 'mirror-3',
    src: './photos/WhatsApp Image 2026-10-10 at 10.02.00 PM.jpeg',
    title: 'That Sweetest Head Tilt',
    caption: 'You looking into the phone with that soft, playful expression. The way your smile could instantly fix whatever difficult day I was having.',
    sweetNote: 'I was trying to pose, but you stole the whole spotlight.',
    badge: 'That Cute Smile 📸',
    tag: 'Mirror 03',
  },
  {
    id: 'mirror-4',
    src: './photos/WhatsApp Image 2026-10-10 at 10.02.01 PM.jpeg',
    title: 'Our Forever Favorite Frame',
    caption: 'Looking into the mirror together, realizing that in a world full of noise, you were the only constant peace and comfort I ever truly wanted.',
    sweetNote: 'Every mirror still echoes with our laughter.',
    badge: 'Unforgettable Us 💖',
    tag: 'Mirror 04',
  },
];

export default function MirrorSelfiesSection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [liked, setLiked] = useState({ 0: true, 1: true, 2: true, 3: true });

  const toggleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-r from-pink-900/15 via-rosegold-accent/15 to-purple-900/15 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-14 sm:mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rosegold-light/30 bg-midnight-900/70 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-light font-medium mb-3 shadow-lg">
          <Camera className="w-3.5 h-3.5 text-rosegold-accent animate-pulse" />
          <span>Our Mirror Chronicles</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-rosegold mb-4">
          Reflections of Us
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/90 max-w-xl mx-auto">
          "Four candid mirror selfies that captured the pure warmth of us together."
        </p>
      </motion.div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {FOUR_MIRROR_MOMENTS.map((item, index) => {
          const isItemLiked = !!liked[index];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="group relative"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-rosegold-400/25 via-purple-600/15 to-rosegold-500/25 opacity-70 group-hover:opacity-100 blur-sm transition duration-500" />

              <div className="relative h-full glass-card rounded-3xl overflow-hidden border border-rosegold-light/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between text-center items-center backdrop-blur-xl">
                
                {/* Top Tag & Like Header */}
                <div className="w-full p-3.5 pb-2.5 flex items-center justify-between z-10 bg-midnight-950/50 backdrop-blur-md border-b border-white/5">
                  <span className="font-mono text-xs font-bold text-rosegold-light bg-rosegold-500/20 px-2.5 py-0.5 rounded-full border border-rosegold-light/25">
                    {item.tag}
                  </span>

                  <span className="text-xs font-medium text-rose-200/90 truncate max-w-[130px]">
                    {item.badge}
                  </span>

                  <motion.button
                    whileTap={{ scale: 1.3 }}
                    onClick={() => toggleLike(index)}
                    className="p-1 rounded-full text-rose-300 hover:text-white transition-colors cursor-pointer"
                    title="Heart this memory"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isItemLiked
                          ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                          : 'text-rose-300/60 hover:text-rose-400'
                      }`}
                    />
                  </motion.button>
                </div>

                {/* Photo Frame (Full Smart Portrait & Uncut View) */}
                <div
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-midnight-950 cursor-pointer group/img"
                >
                  {/* Ambient Blurred Fill */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                    style={{ backgroundImage: `url("${item.src}")` }}
                  />

                  {/* Main Portrait */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />

                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-40 group-hover/img:opacity-20 transition-opacity" />

                  {/* Zoom Hint */}
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-full bg-midnight-900/80 backdrop-blur-md text-white shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Bottom Story & Note */}
                <div className="p-4 sm:p-5 text-center w-full bg-midnight-950/70 backdrop-blur-md border-t border-rosegold-500/20 flex-1 flex flex-col items-center justify-between">
                  <div>
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-white group-hover:text-rosegold-light transition-colors mb-1.5 text-center line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-rose-100/85 leading-relaxed font-light text-center line-clamp-3">
                      "{item.caption}"
                    </p>
                  </div>

                  {/* Sweet Note */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-center gap-1.5 w-full text-center">
                    <Smile className="w-3.5 h-3.5 text-rosegold-accent shrink-0" />
                    <p className="font-dancing text-xs sm:text-sm text-rosegold-light italic text-center line-clamp-2">
                      {item.sweetNote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox for the 4 mirror moments */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex justify-between items-center z-20">
              <span className="text-sm font-sans font-medium text-rosegold-light bg-white/10 px-3 py-1 rounded-full">
                {FOUR_MIRROR_MOMENTS[selectedPhotoIndex].tag} — {FOUR_MIRROR_MOMENTS[selectedPhotoIndex].badge}
              </span>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-3 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors cursor-pointer"
                aria-label="Close view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev - 1 + FOUR_MIRROR_MOMENTS.length) % FOUR_MIRROR_MOMENTS.length);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors z-20 cursor-pointer"
              aria-label="Previous frame"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((prev) => (prev + 1) % FOUR_MIRROR_MOMENTS.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-rosegold-accent transition-colors z-20 cursor-pointer"
              aria-label="Next frame"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center p-2 text-center"
            >
              <img
                src={FOUR_MIRROR_MOMENTS[selectedPhotoIndex].src}
                alt={FOUR_MIRROR_MOMENTS[selectedPhotoIndex].title}
                className="max-h-[68vh] max-w-full object-contain rounded-2xl border border-rosegold-light/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
              />

              <div className="mt-4 text-center max-w-xl px-4 glass-card p-4 rounded-2xl border border-rosegold-light/20">
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
                  {FOUR_MIRROR_MOMENTS[selectedPhotoIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light">
                  "{FOUR_MIRROR_MOMENTS[selectedPhotoIndex].caption}"
                </p>
                <p className="font-dancing text-sm sm:text-base text-rosegold-light mt-2 italic">
                  — {FOUR_MIRROR_MOMENTS[selectedPhotoIndex].sweetNote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
