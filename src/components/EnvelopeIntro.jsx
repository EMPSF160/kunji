import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function EnvelopeIntro({ onOpen, isOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.9, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950/95 backdrop-blur-xl px-4 py-6 w-full max-w-full overflow-hidden text-center"
        >
          {/* Subtle cosmic glow centered behind envelope */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-rosegold-accent/20 blur-3xl pointer-events-none animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

          {/* Centered content box */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center justify-center mx-auto text-center">
            {/* Invitation Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 sm:mb-8 inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-rosegold-light/20 bg-midnight-900/70 backdrop-blur-md shadow-lg max-w-[90vw] mx-auto text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-rosegold-accent animate-spin-slow shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-rosegold-light font-medium text-center">
                A Personal Letter For {config.recipientName}
              </span>
            </motion.div>

            {/* Interactive Envelope Container */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 1.05, y: 10 }
                  : { y: [0, -8, 0] }
              }
              transition={
                isOpening
                  ? { duration: 0.6 }
                  : { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
              }
              className="relative cursor-pointer group select-none mx-auto flex justify-center items-center"
              onClick={handleOpenClick}
              whileHover={!isOpening ? { scale: 1.02 } : {}}
              whileTap={!isOpening ? { scale: 0.98 } : {}}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenClick()}
              aria-label="Open personal letter"
            >
              {/* Envelope Body */}
              <div className="relative w-[min(300px,84vw)] h-48 sm:w-96 sm:h-60 bg-gradient-to-br from-[#2a134a] via-[#1c0c32] to-[#120622] rounded-2xl border border-rosegold-300/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(226,149,120,0.25)] overflow-hidden mx-auto">
                {/* Back paper shadow */}
                <div className="absolute inset-x-5 top-4 bottom-4 bg-[#fdf2e9]/10 rounded-lg blur-[1px]" />

                {/* Inside letter sliding up on open */}
                <motion.div
                  initial={false}
                  animate={isOpening ? { y: -65, opacity: 1 } : { y: 0, opacity: 0.8 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute inset-x-6 top-6 h-36 bg-gradient-to-b from-[#faf5ee] to-[#f4ebe1] rounded-t-lg shadow-xl p-3 sm:p-4 flex flex-col justify-start text-left"
                >
                  <div className="w-12 h-1 bg-rosegold-400/40 rounded-full mb-2" />
                  <p className="font-dancing text-lg sm:text-xl text-[#3b1259] leading-tight font-bold">
                    Dear {config.recipientName},
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#553c6e] mt-1 line-clamp-2">
                    I don't know where all this will end, but without you, it's really hard for me...
                  </p>
                </motion.div>

                {/* Flap Triangles for Envelope effect */}
                {/* Left flap */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-tr from-[#1b0a33] to-[#260f47] border-r border-rosegold-500/10 pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                />
                {/* Right flap */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-tl from-[#190930] to-[#230d42] border-l border-rosegold-500/10 pointer-events-none"
                  style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
                />
                {/* Bottom flap */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#140626] to-[#1e0a38] border-t border-rosegold-500/10 pointer-events-none"
                  style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                />

                {/* Top Folding Flap */}
                <motion.div
                  animate={isOpening ? { rotateX: 180, opacity: 0.2 } : { rotateX: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#35165c] to-[#220d3f] border-b border-rosegold-400/20 pointer-events-none"
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-[#35165c] to-[#250d42]"
                    style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                  />
                </motion.div>

                {/* Heart Wax Seal */}
                <motion.div
                  animate={
                    isOpening
                      ? { scale: 0, opacity: 0 }
                      : { scale: [1, 1.08, 1] }
                  }
                  transition={
                    isOpening
                      ? { duration: 0.4 }
                      : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
                  }
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-rosegold-400 via-rose-500 to-rosegold-600 shadow-[0_0_20px_rgba(244,114,182,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center border-2 border-rosegold-200/50 z-10"
                >
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Action Callout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 sm:mt-8 text-center max-w-[88vw] sm:max-w-md mx-auto px-2 flex flex-col items-center justify-center"
            >
              <p className="font-playfair italic text-sm sm:text-lg md:text-xl text-rosegold-light/90 leading-relaxed text-center break-words max-w-xs sm:max-w-sm">
                "Every word here is honest, humble, and meant only for you."
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] sm:text-xs tracking-wider uppercase text-rosegold-400/80 text-center">
                <MailOpen className="w-3.5 h-3.5 animate-bounce shrink-0" />
                <span>Tap the envelope to open with music</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
