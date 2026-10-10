import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, Music, RotateCcw, Maximize2, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function HerSpecialSongSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const audioRef = useRef(null);
  const { pauseMusic } = useAudio(); // To pause background soundtrack if this special song plays

  const photoSrc = '/photos/WhatsApp Image 2026-10-10 at 10.01.57 PM.jpeg';
  const songSrc = '/videos/sms.mp4';

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause global background music so they don't clash
      pauseMusic();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback error:', e);
      });
    }
  };

  const restartSong = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = fraction * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Hidden dedicated audio element */}
      <audio
        ref={audioRef}
        src={songSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        preload="auto"
      />

      {/* Radiant ambient glow matching her yellow dress & rose gold theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-600/15 blur-[160px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-14 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-midnight-900/70 backdrop-blur-md text-xs uppercase tracking-widest text-amber-200 font-medium mb-3 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>A Dedicated Song For You</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-rosegold mb-4">
          The Smile That Stole My Heart
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/90 max-w-xl mx-auto">
          "In that yellow dress, you weren't just beautiful—you were my whole universe."
        </p>
      </motion.div>

      {/* The Showcase Centerpiece Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-xl mx-auto glass-card rounded-3xl overflow-hidden border border-amber-400/30 shadow-[0_25px_60px_-15px_rgba(245,158,11,0.25),0_0_40px_rgba(244,114,182,0.2)] flex flex-col items-center backdrop-blur-2xl"
      >
        {/* Top Header Bar */}
        <div className="w-full p-4 flex items-center justify-between z-10 bg-midnight-950/60 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Special Dedication
            </span>
            <span className="text-xs text-rose-200/90 font-medium hidden sm:inline">
              SMS Melody 🎶
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLightbox(true)}
              className="p-1.5 rounded-full text-rose-300 hover:text-white transition-colors cursor-pointer"
              title="Full screen view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={() => setIsLiked(!isLiked)}
              className="p-1.5 rounded-full text-rose-300 hover:text-white transition-colors cursor-pointer"
              title="Heart this moment"
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked
                    ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                    : 'text-rose-300/60'
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Photo Container with Play Button Overlay */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-midnight-950 group">
          {/* Ambient blurred fill */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
            style={{ backgroundImage: `url("${photoSrc}")` }}
          />

          {/* Main Photo of her */}
          <img
            src={photoSrc}
            alt="The Smile That Stole My Heart"
            className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Golden glow pulse when playing */}
          {isPlaying && (
            <div className="absolute inset-0 z-20 pointer-events-none border-4 border-amber-400/40 rounded-none animate-pulse" />
          )}

          {/* Play/Pause Button Floating on Photo */}
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              onClick={togglePlay}
              className="p-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-rosegold-500 text-white shadow-[0_0_35px_rgba(245,158,11,0.9)] border-2 border-white/50 cursor-pointer"
              aria-label={isPlaying ? 'Pause song' : 'Play SMS song for her'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-white" />
              ) : (
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              )}
            </motion.button>
          </div>

          {/* Equalizer Frequency Bars Overlay on bottom of photo when playing */}
          {isPlaying && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-end justify-center gap-1 h-6 pointer-events-none">
              {[40, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 50].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + (i % 4) * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-gradient-to-t from-amber-400 to-rose-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Music Controls & Message Bar */}
        <div className="w-full p-5 sm:p-6 bg-midnight-950/80 backdrop-blur-xl border-t border-amber-400/20 text-center flex flex-col items-center">
          
          {/* Track Details */}
          <div className="mb-3">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Music className="w-3.5 h-3.5" />
              <span>Siva Manasula Sakthi (SMS Melody)</span>
            </div>
            <p className="font-playfair text-xl sm:text-2xl font-bold text-white">
              Her Sweetest Smile
            </p>
            <p className="font-dancing text-sm sm:text-base text-rosegold-light mt-1">
              "Every note of this song was made for this exact smile."
            </p>
          </div>

          {/* Scrubbable Progress Bar */}
          <div
            onClick={handleSeek}
            className="group/seek relative w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden my-3 hover:h-2.5 transition-all"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-rosegold-400 rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Time & Mini Controls */}
          <div className="w-full flex items-center justify-between text-xs text-rose-200/80 font-sans px-1">
            <span className="font-mono">{formatTime(currentTime)}</span>

            <div className="flex items-center gap-3">
              <button
                onClick={restartSong}
                className="p-1.5 rounded-full hover:bg-white/10 text-rose-300 hover:text-white transition-colors cursor-pointer"
                title="Replay from start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-white/10 text-rose-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <span className="font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-amber-300 transition-colors cursor-pointer z-20"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[85vh] flex flex-col items-center justify-center text-center"
            >
              <img
                src={photoSrc}
                alt="Her Sweetest Smile"
                className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-amber-400/40 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
              />
              <p className="font-dancing text-xl text-amber-200 mt-4">
                "The smile that stole my heart forever."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
