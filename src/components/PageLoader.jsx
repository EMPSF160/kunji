import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 text-center px-4">
      {/* Background radial glow */}
      <div className="absolute w-72 h-72 rounded-full bg-rosegold-500/20 blur-[120px] pointer-events-none" />

      {/* Pulsing heart */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-rosegold-500/20 blur-xl animate-pulse" />
        <Heart className="w-12 h-12 text-rose-400 fill-rose-500 animate-heartbeat drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-playfair text-xl sm:text-2xl text-gradient-rosegold font-bold"
      >
        For {config.recipientName}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="font-dancing text-base sm:text-lg text-rose-200/80 mt-2"
      >
        Gathering our memories...
      </motion.p>
    </div>
  );
}
