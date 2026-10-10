import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, Maximize2, X, Film, RotateCcw } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function TealSareeCinematicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [showPhotoLightbox, setShowPhotoLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'photo' | 'video'
  const videoRef = useRef(null);
  const { pauseMusic } = useAudio();

  const photoSrc = '/photos/WhatsApp Image 2026-10-10 at 10.00.19 PM.jpeg';
  const videoSrc = '/videos/154135-807166717_medium.mp4';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      pauseMusic(); // Pause global music so audio doesn't clash
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback error:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = fraction * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Background ambient lighting in teal & rose-gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-r from-teal-500/15 via-blue-500/15 to-purple-600/15 blur-[160px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-midnight-900/70 backdrop-blur-md text-xs uppercase tracking-widest text-teal-200 font-medium mb-3 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin-slow" />
          <span>Cinematic Spotlight</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-gradient-rosegold mb-4">
          Elegance in Motion
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/90 max-w-xl mx-auto">
          "Draped in grace, you looked like a dream I never wanted to wake up from."
        </p>
      </motion.div>

      {/* Dual Showcase Card: Portrait & Video in Harmony */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto glass-card rounded-3xl overflow-hidden border border-teal-400/30 shadow-[0_25px_60px_-15px_rgba(20,184,166,0.25),0_0_40px_rgba(244,114,182,0.15)] backdrop-blur-2xl"
      >
        {/* Top Bar */}
        <div className="w-full p-4 flex items-center justify-between z-10 bg-midnight-950/70 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
              Pure Grace 💙
            </span>
            <span className="text-xs text-rose-200/90 font-medium hidden sm:inline">
              Portrait & Cinematic Motion
            </span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={() => setIsLiked(!isLiked)}
              className="p-1.5 rounded-full text-rose-300 hover:text-white transition-colors cursor-pointer"
              title="Heart this memory"
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

        {/* Side-by-Side Dual Stage (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-white/10">
          {/* Left: The Saree Portrait */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-midnight-950 group/portrait border-b md:border-b-0 md:border-r border-white/10">
            {/* Ambient Blurred Fill */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
              style={{ backgroundImage: `url("${photoSrc}")` }}
            />

            {/* Main Portrait of her */}
            <img
              src={photoSrc}
              alt="Elegance in Teal Saree"
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/portrait:scale-105"
            />

            {/* Vignette */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-midnight-950/70 via-transparent to-transparent opacity-40 pointer-events-none" />

            {/* Click to expand button */}
            <button
              onClick={() => setShowPhotoLightbox(true)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-midnight-900/80 backdrop-blur-md text-white hover:text-teal-300 transition-colors shadow-lg cursor-pointer"
              title="View full portrait"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Pill on Photo */}
            <div className="absolute bottom-3 inset-x-3 z-20 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-midnight-950/80 backdrop-blur-md text-teal-200 border border-teal-400/20">
                The Saree That Left Me Breathless
              </span>
            </div>
          </div>

          {/* Right: The Cinematic Video Clip Player */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-black flex flex-col justify-between group/video">
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              src={videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />

            {/* Center Play Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10 transition-colors"
              >
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={togglePlay}
                  className="p-5 sm:p-6 rounded-full bg-gradient-to-tr from-teal-500 via-blue-500 to-rosegold-500 text-white shadow-[0_0_30px_rgba(20,184,166,0.8)] border-2 border-white/50 cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                </motion.button>
              </div>
            )}

            {/* Floating Video Badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                <Film className="w-3 h-3 text-teal-300" />
                <span>Motion Clip</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Story & Dedicated Player Control Bar */}
        <div className="p-5 sm:p-7 w-full bg-midnight-950/80 backdrop-blur-xl text-center flex flex-col items-center">
          <div className="max-w-xl mx-auto mb-4">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-2">
              A Glimpse of Timeless Beauty
            </h3>
            <p className="font-sans text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light">
              "Some moments are meant to be cherished forever. Seeing your gentle smile, the gold necklace, and the sheer elegance of you... I knew I was looking at the most special person in this world."
            </p>
            <p className="font-dancing text-sm sm:text-base text-teal-200 mt-2 italic">
              — "Forever mesmerized by every single look of yours."
            </p>
          </div>

          {/* Scrubbable Video Progress Bar */}
          <div
            onClick={handleSeek}
            className="group/seek relative w-full max-w-lg h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden my-2 hover:h-2.5 transition-all"
          >
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-blue-400 to-rosegold-400 rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Video Control Bar Buttons */}
          <div className="w-full max-w-lg flex items-center justify-between text-xs text-rose-200/80 font-sans px-1 mt-1">
            <span className="font-mono">{formatTime(currentTime)}</span>

            <div className="flex items-center gap-3">
              <button
                onClick={restartVideo}
                className="p-1.5 rounded-full hover:bg-white/10 text-rose-300 hover:text-white transition-colors cursor-pointer"
                title="Restart clip"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-teal-500/25 border border-teal-400/40 text-white hover:bg-teal-500/40 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
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

      {/* Lightbox for the portrait */}
      <AnimatePresence>
        {showPhotoLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={() => setShowPhotoLightbox(false)}
          >
            <button
              onClick={() => setShowPhotoLightbox(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-midnight-900/80 border border-white/10 text-white hover:text-teal-300 transition-colors cursor-pointer z-20"
              aria-label="Close view"
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
                alt="Elegance in Teal Saree"
                className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-teal-400/40 shadow-[0_0_50px_rgba(20,184,166,0.3)]"
              />
              <p className="font-dancing text-xl text-teal-200 mt-4">
                "Draped in elegance, forever in my heart."
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
