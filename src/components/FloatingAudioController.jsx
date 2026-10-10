import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, ListMusic, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function FloatingAudioController() {
  const {
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    nextSong,
    prevSong,
    playTrack,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:bottom-6 sm:translate-x-0 z-40 flex flex-col items-center sm:items-end gap-2 w-auto max-w-[94vw]">
      {/* Quick Floating Playlist Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-[88vw] sm:w-80 max-h-72 glass-card p-3 rounded-2xl border border-rosegold-light/25 shadow-2xl overflow-y-auto mb-1 text-left"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
              <span className="text-xs uppercase tracking-widest text-rosegold-300 font-bold">
                Choose A Song ({songs.length})
              </span>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 rounded-full text-rose-300 hover:text-white"
                aria-label="Close list"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {songs.map((song, idx) => {
                const isSelected = currentSongIndex === idx;
                const isTrackPlaying = isSelected && isPlaying;

                return (
                  <button
                    key={song.id || idx}
                    onClick={() => {
                      playTrack(idx);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-rosegold-500/25 text-white font-medium border border-rosegold-accent/40'
                        : 'bg-white/5 text-rose-200/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-[10px] text-rosegold-300/60 font-mono w-4 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{song.title}</span>
                    </div>

                    <div className="p-1 rounded-full bg-white/10 shrink-0">
                      {isTrackPlaying ? (
                        <Pause className="w-3 h-3 fill-white" />
                      ) : (
                        <Play className="w-3 h-3 fill-white translate-x-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Control Bar Pill */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-midnight-950/95 via-midnight-900/95 to-midnight-950/95 backdrop-blur-2xl border border-rosegold-light/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(244,114,182,0.25)]"
      >
        {/* Previous Track Button */}
        <button
          onClick={prevSong}
          className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Previous track"
          title="Previous song"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Master Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className="p-2.5 sm:p-3 rounded-full bg-gradient-to-tr from-rosegold-500 to-rose-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.8)] border border-white/30 cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white translate-x-0.5" />
          )}
        </motion.button>

        {/* Next Track Button */}
        <button
          onClick={nextSong}
          className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Next track"
          title="Next song"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Track Title Info (Desktop) */}
        <div className="hidden md:flex items-center gap-2 px-2 max-w-[150px] truncate border-l border-white/10">
          <div className="flex items-end gap-0.5 h-3 shrink-0">
            {[60, 100, 40].map((h, i) => (
              <div
                key={i}
                className={`w-0.5 bg-rosegold-accent rounded-full ${isPlaying ? 'animate-pulse' : 'h-1'}`}
                style={{ height: isPlaying ? `${h}%` : '20%' }}
              />
            ))}
          </div>
          <span className="text-xs text-rose-200 truncate font-medium">
            {currentSong.title}
          </span>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Playlist Drawer Toggle */}
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            showDrawer ? 'bg-rosegold-500/30 text-white' : 'text-rose-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="All songs"
          title="View all songs"
        >
          <ListMusic className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
