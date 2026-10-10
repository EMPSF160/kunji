import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, X } from 'lucide-react';
import { config } from '../config';

export default function HeroSection({ onScrollToNext }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);

  const lines = config.heroSubtitleLines;

  useEffect(() => {
    const currentFullText = lines[currentLineIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentFullText) {
      // Pause at full sentence
      const timeout = setTimeout(() => setIsDeleting(true), 3200);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      // Switch to next line
      setIsDeleting(false);
      setCurrentLineIndex((prev) => (prev + 1) % lines.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentLineIndex, lines]);

  const handleHeartClick = () => {
    setHeartClicks((c) => c + 1);
    setShowEasterEgg(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 text-center overflow-hidden">
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-700/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-rosegold-accent/15 blur-[120px] pointer-events-none" />

      {/* Intro Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rosegold-300/25 bg-midnight-900/60 backdrop-blur-md shadow-lg mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-rosegold-light" />
        <span className="text-xs uppercase tracking-widest text-rosegold-200 font-medium">
          A Sincere Confession
        </span>
      </motion.div>

      {/* Main Title: Dear [HER NAME] */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative max-w-4xl mx-auto"
      >
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient-rosegold mb-4 leading-tight">
          Dear {config.recipientName}
        </h1>

        {/* Interactive Beating Heart with Easter Egg Hint */}
        <div className="flex flex-col items-center justify-center my-4">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            className="group relative p-3 rounded-full transition-colors cursor-pointer focus:outline-none"
            title="Tap my heart"
            aria-label="Secret heart easter egg"
          >
            <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-md group-hover:bg-rose-500/40 transition-all duration-300 animate-pulse-slow" />
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)] animate-heartbeat transition-transform" />
          </motion.button>
          <span className="text-[11px] tracking-widest text-rosegold-300/60 uppercase mt-1 font-sans">
            (Tap the heart for a quiet secret)
          </span>
        </div>
      </motion.div>

      {/* Typewriter Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl mx-auto mt-4 min-h-[4rem] sm:min-h-[3rem] flex items-center justify-center"
      >
        <p className="font-dancing text-2xl sm:text-3xl md:text-4xl text-rose-200/90 font-medium tracking-wide text-center">
          "{displayedText}
          <span className="inline-block w-0.5 h-6 sm:h-8 bg-rosegold-accent ml-1 animate-pulse align-middle" />"
        </p>
      </motion.div>

      {/* Gentle premise quote */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 max-w-lg mx-auto text-sm sm:text-base text-rose-100/70 font-light leading-relaxed font-sans"
      >
        I built this space by hand so every thought could reach you gently. You hold no obligations here—only my sincere truth and enduring respect.
      </motion.p>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 sm:mt-16"
      >
        <button
          onClick={onScrollToNext}
          className="group flex flex-col items-center gap-2 text-rosegold-300/70 hover:text-rosegold-light transition-colors cursor-pointer"
          aria-label="Scroll to next section"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Continue</span>
          <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-rosegold-light transition-colors" />
        </button>
      </motion.div>

      {/* Hidden Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full glass-card p-6 sm:p-8 rounded-3xl border border-rosegold-light/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_35px_rgba(244,114,182,0.3)] text-center"
            >
              <button
                onClick={() => setShowEasterEgg(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-rose-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-rosegold-500/20 border border-rosegold-400/30 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-rosegold-accent fill-rosegold-accent animate-pulse" />
              </div>

              <h3 className="font-playfair text-2xl font-bold text-gradient-rosegold mb-2">
                {config.heartEasterEgg.title}
              </h3>

              <p className="font-dancing text-xl text-rose-100/95 leading-relaxed mt-4">
                "{config.heartEasterEgg.message}"
              </p>

              <div className="mt-6 pt-4 border-t border-rosegold-500/20 flex justify-between items-center text-xs text-rosegold-300/70 font-sans">
                <span>Secret heartfelt note</span>
                <span>Taps: {heartClicks}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
