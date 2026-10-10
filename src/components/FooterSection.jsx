import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function FooterSection() {
  return (
    <footer className="relative py-20 px-4 text-center border-t border-rosegold-500/15 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent">
      {/* Glow dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-rosegold-accent mx-auto mb-6 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-playfair italic text-xl sm:text-2xl text-gradient-rosegold mb-4 max-w-lg mx-auto"
      >
        "{config.footerMessage}"
      </motion.p>

      <div className="flex items-center justify-center gap-2 text-xs text-rose-300/60 font-sans tracking-wide">
        <span>Handcrafted with all my love for {config.recipientName}</span>
        <span>•</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
      </div>

      <p className="mt-2 text-[11px] text-rose-400/40 font-mono">
        Forever yours, {config.senderName}
      </p>
    </footer>
  );
}
