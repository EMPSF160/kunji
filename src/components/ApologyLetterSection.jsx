import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart, Sparkles, HeartHandshake } from 'lucide-react';
import { config } from '../config';

export default function ApologyLetterSection() {
  const { salutation, paragraphs, closing } = config.letter;

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] rounded-full bg-gradient-to-b from-purple-900/15 via-rosegold-accent/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Feather className="w-3.5 h-3.5 text-rosegold-light" />
          <span>What Has Been In My Heart</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          A Letter From My Soul
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/80 max-w-xl mx-auto">
          "The words I never had the courage to tell you before."
        </p>
      </motion.div>

      {/* Parchment Glass Container */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-10 md:p-14 border border-rosegold-light/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden text-center flex flex-col items-center">
        
        {/* Subtle decorative stamp / corner watermark */}
        <div className="absolute top-6 right-6 opacity-10 pointer-events-none select-none hidden sm:block">
          <Feather className="w-28 h-28 text-rosegold-300" />
        </div>

        {/* Salutation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <span className="font-dancing text-3xl sm:text-5xl text-rosegold-light font-bold">
            {salutation}
          </span>
        </motion.div>

        {/* Mistake acknowledgement callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-midnight-800/80 to-purple-950/60 border border-rosegold-accent/30 shadow-inner text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-wider text-rosegold-400 font-semibold mb-2 flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-rosegold-accent" />
            <span>The Fear That Ruined Us</span>
          </p>
          <p className="font-playfair italic text-base sm:text-lg text-rose-100 font-medium leading-relaxed">
            "{config.mistakeStatement}"
          </p>
        </motion.div>

        {/* Letter Paragraphs Revealed as you scroll */}
        <div className="space-y-6 text-center max-w-2xl mx-auto font-sans text-base sm:text-lg text-rose-100/90 leading-relaxed font-light">
          {paragraphs.map((p, idx) => {
            const isLast = idx === paragraphs.length - 1;
            const isFatherAnalogy = p.includes('father can never stop loving');
            const isFearConfession = p.includes('scared of losing you');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                className={`relative px-3 py-2 transition-all text-center flex flex-col items-center justify-center ${
                  isLast
                    ? 'p-6 sm:p-8 rounded-2xl bg-rosegold-500/15 border border-rosegold-light/35 shadow-xl text-center'
                    : isFatherAnalogy
                    ? 'p-5 sm:p-6 rounded-2xl bg-purple-950/40 border border-rosegold-accent/30 shadow-md text-center'
                    : isFearConfession
                    ? 'p-5 sm:p-6 rounded-2xl bg-midnight-900/60 border border-pink-400/30 text-center'
                    : ''
                }`}
              >
                <p className={isLast ? 'font-dancing text-xl sm:text-2xl text-white font-medium leading-relaxed text-center' : 'text-center'}>
                  {p}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing & Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-rosegold-500/20 text-center w-full max-w-md mx-auto"
        >
          <p className="text-sm sm:text-base text-rose-200/80 italic font-sans mb-1 text-center">
            {closing}
          </p>
          <p className="font-dancing text-3xl sm:text-4xl text-gradient-rosegold font-bold mt-2 text-center">
            {config.senderName}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
