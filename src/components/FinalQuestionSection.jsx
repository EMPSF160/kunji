import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, Phone, Mail, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function FinalQuestionSection() {
  const [decision, setDecision] = useState(null); // 'yes' | 'time' | null

  const handleYes = () => {
    setDecision('yes');

    // Heart confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f472b6', '#fb7185', '#e29578', '#ffd1dc', '#c084fc'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleNeedTime = () => {
    setDecision('time');
  };

  const whatsappUrl = `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(
    config.contact.whatsappPrefill
  )}`;

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl rounded-full bg-rosegold-accent/10 blur-[130px] pointer-events-none" />

      {/* Header / Question */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>The Question In My Heart</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-rosegold mb-4 leading-tight">
          Can We Talk Again?
        </h2>

        <p className="font-dancing text-xl sm:text-2xl text-rose-200/85 max-w-xl mx-auto">
          "Whatever your heart chooses, there is only gratitude from my side."
        </p>
      </motion.div>

      {/* Decision State Container */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-10 border border-rosegold-light/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {decision === null && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4"
            >
              {/* Option 1: Yes, let's talk */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleYes}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rosegold-500 via-rose-500 to-rosegold-600 text-white font-medium shadow-[0_0_25px_rgba(244,114,182,0.6)] border border-white/30 flex items-center justify-center gap-2.5 cursor-pointer text-base group"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Yes, let's talk</span>
              </motion.button>

              {/* Option 2: I need more time (Respectful, honest, no tricks) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNeedTime}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-midnight-900/80 hover:bg-midnight-800 text-rose-200 hover:text-white font-medium border border-rosegold-light/20 flex items-center justify-center gap-2.5 cursor-pointer text-base transition-colors"
              >
                <Clock className="w-5 h-5 text-rosegold-300" />
                <span>I need more time</span>
              </motion.button>
            </motion.div>
          )}

          {/* Response State: YES */}
          {decision === 'yes' && (
            <motion.div
              key="response-yes"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-rosegold-500/20 border border-rosegold-light/30 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-rosegold-accent animate-spin-slow" />
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gradient-rosegold mb-2">
                {config.contact.yesMessageTitle}
              </h3>

              <p className="font-dancing text-xl text-rose-100 max-w-lg mx-auto mb-6">
                "{config.contact.yesMessageBody}"
              </p>

              {/* Contact Actions Grid */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                {/* WhatsApp Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-emerald-200 hover:text-white flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Message on WhatsApp</span>
                </a>

                {/* Direct Phone Call */}
                <a
                  href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rosegold-500/20 hover:bg-rosegold-500/30 border border-rosegold-light/30 text-rose-100 hover:text-white flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-lg"
                >
                  <Phone className="w-5 h-5 text-rosegold-accent" />
                  <span>Call {config.contact.phone}</span>
                </a>
              </div>

              {/* Reset link if she wants to re-read */}
              <button
                onClick={() => setDecision(null)}
                className="mt-6 text-xs text-rose-300/60 hover:text-rose-200 transition-colors underline cursor-pointer"
              >
                Change my answer
              </button>
            </motion.div>
          )}

          {/* Response State: I NEED MORE TIME */}
          {decision === 'time' && (
            <motion.div
              key="response-time"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-purple-900/30 border border-purple-400/30 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-rosegold-300" />
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gradient-rosegold mb-2">
                {config.needTimeResponse.title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-rose-100/90 max-w-lg mx-auto leading-relaxed font-light mb-6">
                {config.needTimeResponse.message}
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-rose-200/80 font-sans max-w-md mx-auto">
                There are no reminders, no follow-ups, and no expectations. Your peace is everything.
              </div>

              {/* Reset link */}
              <button
                onClick={() => setDecision(null)}
                className="mt-6 text-xs text-rose-300/60 hover:text-rose-200 transition-colors underline cursor-pointer"
              >
                Change my answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
