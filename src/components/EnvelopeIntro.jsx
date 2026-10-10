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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950/95 backdrop-blur-xl px-4"
        >
          {/* Subtle cosmic glow behind envelope */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rosegold-accent/20 blur-3xl pointer-events-none animate-pulse-slow" />
          <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

          {/* Invitation Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-rosegold-light/20 bg-midnight-900/60 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-rosegold-accent animate-spin-slow" />
            <span className="text-xs uppercase tracking-widest text-rosegold-light font-medium">
              A Personal Letter For {config.recipientName}
            </span>
          </motion.div>

          {/* Interactive Envelope Container */}
          <motion.div
            animate={
              isOpening
                ? { scale: 1.08, y: 10 }
                : { y: [0, -10, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.6 }
                : { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
            }
            className="relative cursor-pointer group select-none"
            onClick={handleOpenClick}
            whileHover={!isOpening ? { scale: 1.03 } : {}}
            whileTap={!isOpening ? { scale: 0.98 } : {}}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenClick()}
            aria-label="Open personal letter"
          >
            {/* Envelope Body */}
            <div className="relative w-72 h-48 sm:w-96 sm:h-64 bg-gradient-to-br from-[#2a134a] via-[#1c0c32] to-[#120622] rounded-2xl border border-rosegold-300/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(226,149,120,0.25)] overflow-hidden">
              
              {/* Back paper shadow */}
              <div className="absolute inset-x-6 top-4 bottom-4 bg-[#fdf2e9]/10 rounded-lg blur-[1px]" />

              {/* Inside letter sliding up on open */}
              <motion.div
                initial={false}
                animate={isOpening ? { y: -70, opacity: 1 } : { y: 0, opacity: 0.8 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute inset-x-8 top-6 h-40 bg-gradient-to-b from-[#faf5ee] to-[#f4ebe1] rounded-t-lg shadow-xl p-4 flex flex-col justify-start"
              >
                <div className="w-16 h-1 bg-rosegold-400/40 rounded-full mb-3" />
                <p className="font-dancing text-xl text-[#3b1259] leading-tight font-bold">
                  Dear {config.recipientName},
                </p>
                <p className="font-sans text-[11px] text-[#553c6e] mt-1 line-clamp-2">
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
                styleClip={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-rosegold-400 via-rose-500 to-rosegold-600 shadow-[0_0_20px_rgba(244,114,182,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center border-2 border-rosegold-200/50 z-10"
              >
                <Heart className="w-7 h-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Action Callout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="font-playfair italic text-lg sm:text-xl text-rosegold-light/90">
              "Every word here is honest, humble, and meant only for you."
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs tracking-wider uppercase text-rosegold-400/80">
              <MailOpen className="w-3.5 h-3.5 animate-bounce" />
              <span>Tap the envelope to open with music</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
