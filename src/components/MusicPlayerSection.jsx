import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Heart, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MusicPlayerSection() {
  const {
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    nextSong,
    prevSong,
    playTrack,
    seek,
  } = useAudio();

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    seek(fraction * duration);
  };

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rosegold-accent/15 blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Disc className="w-3.5 h-3.5 text-rosegold-light" />
          <span>Our Soundtrack</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          The Songs We Shared
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/80 max-w-xl mx-auto">
          "Every melody still holds the warmth of your laughter and the silence that followed."
        </p>
      </motion.div>

      {/* Turntable / Vinyl Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-rosegold-light/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] mb-12"
      >
        {/* Turntable Top Stage */}
        <div className="relative flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-6 py-4">
          
          {/* Vinyl Disc Container */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Soft Vinyl Drop Shadow */}
            <div className="absolute inset-2 rounded-full bg-black/80 blur-xl pointer-events-none" />

            {/* Vinyl Record */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  duration: 6,
                  ease: 'linear',
                },
              }}
              className="relative w-full h-full rounded-full bg-[#0d0d12] border-4 border-[#22222b] shadow-[0_0_30px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(255,255,255,0.06)] flex items-center justify-center overflow-hidden"
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-9 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />

              {/* Vinyl Center Label */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-900 via-rosegold-600 to-purple-900 border-2 border-rosegold-light/40 flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                <span className="text-[9px] uppercase tracking-wider text-rose-100 font-bold mt-0.5 truncate max-w-[4.5rem]">
                  For Her
                </span>
                {/* Spindle hole */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d12] border border-white/30 mt-1" />
              </div>
            </motion.div>

            {/* Mechanical Tonearm */}
            <div className="absolute -top-3 -right-3 sm:-right-4 w-20 h-28 pointer-events-none z-20">
              <div className="w-7 h-7 rounded-full bg-neutral-700 border-2 border-neutral-500 shadow-lg relative">
                {/* Pivot dot */}
                <div className="w-2-h-2 rounded-full bg-rosegold-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <motion.div
                animate={{ rotate: isPlaying ? 24 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top left' }}
                className="w-1.5 h-24 bg-gradient-to-b from-neutral-400 via-neutral-300 to-rosegold-300 shadow-md rounded-full -mt-2 ml-3 relative"
              >
                {/* Cartridge / needle head */}
                <div className="absolute -bottom-1 -left-2 w-5 h-3 bg-neutral-800 rounded-sm border border-neutral-600" />
              </motion.div>
            </div>
          </div>

          {/* Right Side Info & Visualizer */}
          <div className="flex-1 text-center sm:text-left sm:pl-4 max-w-xs">
            <span className="text-[11px] uppercase tracking-widest text-rosegold-400 font-semibold flex items-center justify-center sm:justify-start gap-1.5 mb-1">
              <Music className="w-3.5 h-3.5 text-rosegold-accent" />
              <span>Track {currentSongIndex + 1} of {songs.length}</span>
            </span>

            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white truncate max-w-full">
              {currentSong?.title || 'Our Song'}
            </h3>
            
            <p className="text-xs text-rose-200/60 font-sans mt-0.5 truncate">
              {currentSong?.filename}
            </p>

            {/* Audio Wave Frequency Visualizer Bars */}
            <div className="flex items-end justify-center sm:justify-start gap-1 h-8 mt-5">
              {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70, 85, 50, 65, 30].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : '15%',
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (i % 5) * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-gradient-to-t from-purple-500 to-rosegold-accent rounded-full opacity-80"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrubbable Progress Bar */}
        <div className="mt-6 mb-2">
          <div
            onClick={handleProgressBarClick}
            className="group/progress relative w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden hover:h-3 transition-all"
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-rose-400 to-rosegold-accent rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-rose-300/70 font-sans mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Master Playback Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-rosegold-500/20">
          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Central Prev, Master Play/Pause, Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSong}
              className="p-3 rounded-full text-rose-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous track"
              title="Previous song"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="p-4 rounded-full bg-gradient-to-tr from-rosegold-500 to-rose-400 text-white shadow-[0_0_25px_rgba(244,114,182,0.8)] border border-white/30 cursor-pointer"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              )}
            </motion.button>

            <button
              onClick={nextSong}
              className="p-3 rounded-full text-rose-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next track"
              title="Next song"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-rosegold-300 font-mono">
            {currentSongIndex + 1} / {songs.length}
          </div>
        </div>
      </motion.div>

      {/* Control Buttons for EVERY Song */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 mb-4 px-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Music className="w-4 h-4 text-rosegold-accent" />
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white text-center">
              All Songs & Direct Controls
            </h3>
          </div>
          <span className="text-xs uppercase tracking-widest text-rosegold-300/80 font-medium text-center">
            {songs.length} Tracks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {songs.map((song, idx) => {
            const isThisTrackActive = currentSongIndex === idx;
            const isThisTrackPlaying = isThisTrackActive && isPlaying;

            return (
              <motion.div
                key={song.id || idx}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isThisTrackActive
                    ? 'bg-rosegold-500/20 border-rosegold-accent shadow-[0_0_20px_rgba(244,114,182,0.3)]'
                    : 'bg-midnight-900/60 border-white/10 hover:border-rosegold-light/30 hover:bg-midnight-800/80'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-center gap-3 truncate pr-2">
                  <span className="font-mono text-xs text-rosegold-300/70 w-6 shrink-0">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="truncate">
                    <p className={`text-sm font-medium truncate ${isThisTrackActive ? 'text-white font-semibold' : 'text-rose-100/90'}`}>
                      {song.title}
                    </p>
                    <p className="text-[11px] text-rose-300/60 font-mono truncate">
                      {song.filename}
                    </p>
                  </div>
                </div>

                {/* Right Direct Play/Pause Button */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Mini animated wave indicator if this song is playing */}
                  {isThisTrackPlaying && (
                    <div className="flex items-end gap-0.5 h-3.5 mr-1">
                      {[60, 100, 40].map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-rosegold-accent rounded-full animate-pulse"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => playTrack(idx)}
                    className={`p-2.5 rounded-full transition-all cursor-pointer shadow-md ${
                      isThisTrackPlaying
                        ? 'bg-gradient-to-tr from-rose-500 to-rosegold-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.6)]'
                        : isThisTrackActive
                        ? 'bg-rosegold-500/40 text-white border border-rosegold-accent'
                        : 'bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white'
                    }`}
                    aria-label={isThisTrackPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                    title={isThisTrackPlaying ? 'Pause this song' : 'Play this song'}
                  >
                    {isThisTrackPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
