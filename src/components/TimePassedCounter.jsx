import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { config } from '../config';

export default function TimePassedCounter() {
  const [timeDiff, setTimeDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(config.separationDate);
      const now = new Date();
      let diffMs = now.getTime() - start.getTime();

      if (diffMs < 0) diffMs = 0;

      // Approximate calendar difference with precision
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const totalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor((totalSec / 3600) % 24);
      const minutes = Math.floor((totalSec / 60) % 60);
      const seconds = Math.floor(totalSec % 60);

      setTimeDiff({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeDiff.years },
    { label: 'Months', value: timeDiff.months },
    { label: 'Days', value: timeDiff.days },
    { label: 'Hours', value: timeDiff.hours },
    { label: 'Minutes', value: timeDiff.minutes },
    { label: 'Seconds', value: timeDiff.seconds },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 max-w-3xl mx-auto bg-rosegold-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rosegold-300/20 bg-midnight-900/50 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Clock className="w-3.5 h-3.5 text-rosegold-accent" />
          <span>Every Passing Second</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          Time Has Passed
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/80 max-w-xl mx-auto">
          "The clock never stops, and neither does my longing to make things right."
        </p>
      </motion.div>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Glowing card border */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-rosegold-400/30 to-purple-600/30 opacity-70 group-hover:opacity-100 blur-[2px] transition duration-500" />
            
            <div className="relative glass-card rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border border-rosegold-light/20 shadow-xl overflow-hidden backdrop-blur-xl">
              {/* Soft interior highlight */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-rosegold-accent/15 blur-xl pointer-events-none" />

              <span className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(247,209,186,0.3)]">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[11px] sm:text-xs uppercase tracking-widest text-rosegold-300 font-medium">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reflection Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 max-w-lg mx-auto"
      >
        <p className="text-sm text-rose-200/65 font-sans leading-relaxed">
          Counting since{' '}
          <span className="text-rosegold-light font-medium">
            {new Date(config.separationDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          . Time has taught me the depth of what I lost, and how precious your peace has always been.
        </p>
      </motion.div>
    </section>
  );
}
