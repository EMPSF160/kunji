import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { config } from '../config';

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  HeartHandshake: HeartHandshake,
  Sparkles: Sparkles,
};

export default function PromisesSection() {
  const promises = config.promises || [];

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-purple-950/20 blur-[130px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-light" />
          <span>Solitary Commitments</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          What I Promise You
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/80 max-w-xl mx-auto">
          "Promises made not to win you back, but because you deserve nothing less."
        </p>
      </motion.div>

      {/* 3 Animated Promise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {promises.map((promise, index) => {
          const IconComponent = ICON_MAP[promise.icon] || ShieldCheck;

          return (
            <motion.div
              key={promise.id || index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Outer Card Glow on Hover */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-rosegold-400/20 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 blur-md transition duration-500" />

              <div className="relative h-full glass-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between text-center items-center border border-rosegold-light/20 shadow-xl overflow-hidden backdrop-blur-xl">
                
                {/* Top Number & Icon */}
                <div className="flex flex-col items-center text-center w-full">
                  <div className="flex items-center justify-center relative w-full mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosegold-500/20 to-purple-600/20 border border-rosegold-light/30 flex items-center justify-center text-rosegold-light group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="absolute right-0 font-playfair text-2xl font-extrabold text-white/10 group-hover:text-rosegold-400/30 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider font-semibold text-rosegold-400 block mb-1 text-center">
                    {promise.subtitle}
                  </span>

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-rosegold-light transition-colors text-center">
                    {promise.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-rose-200/75 leading-relaxed font-light text-center">
                    {promise.description}
                  </p>
                </div>

                {/* Bottom Assurance Badge */}
                <div className="mt-8 pt-4 border-t border-rosegold-500/15 flex items-center justify-center gap-2 text-xs text-rosegold-300/80 w-full text-center">
                  <CheckCircle2 className="w-4 h-4 text-rosegold-accent shrink-0" />
                  <span className="font-medium">My quiet vow to you</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
