import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, SkipForward, SkipBack, Sparkles } from 'lucide-react';
import mediaData from '../media.json';
import { config } from '../config';

export default function VideoMessageSection() {
  const videos = (mediaData.videos || []).filter(v => v.filename !== 'sms.mp4' && v.filename !== '154135-807166717_medium.mp4');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Video play interrupted:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setDuration(dur);
    if (dur > 0) {
      setProgress((curr / dur) * 100);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = percent * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(percent * 100);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.warn(err));
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!videos || videos.length === 0) {
    return null; // Gracefully hide if no videos
  }

  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-purple-900/15 blur-[140px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rosegold-300/20 bg-midnight-900/60 backdrop-blur-md text-xs uppercase tracking-widest text-rosegold-300 font-medium mb-3">
          <Film className="w-3.5 h-3.5 text-rosegold-light" />
          <span>Moments In Motion</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-gradient-rosegold mb-4">
          {config.videoSection.title}
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-rose-200/80 max-w-xl mx-auto">
          "{config.videoSection.subtitle}"
        </p>
      </motion.div>

      {/* Video Player Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        ref={containerRef}
        className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden glass-card border border-rosegold-light/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group"
      >
        {/* HTML5 Video element */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={currentVideo.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Big Center Play Overlay Button when paused */}
          {!isPlaying && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="absolute p-5 sm:p-6 rounded-full bg-gradient-to-tr from-rosegold-500 to-rose-400 text-white shadow-[0_0_30px_rgba(244,114,182,0.8)] border-2 border-white/40 cursor-pointer z-10"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
            </motion.button>
          )}
        </div>

        {/* Video Control Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-t from-midnight-950 via-midnight-900/95 to-midnight-900/70 backdrop-blur-md border-t border-rosegold-500/20 text-left">
          
          {/* Progress Bar (Scrubbable) */}
          <div
            onClick={handleSeek}
            className="group/seek relative w-full h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden mb-3 hover:h-2.5 transition-all"
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-rose-400 to-rosegold-accent rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left Controls: Play/Pause, Time, Current Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <div className="text-xs font-sans text-rose-200/80">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-white/30">/</span>
                <span>{formatTime(duration)}</span>
              </div>

              <span className="text-xs font-medium text-rosegold-light hidden sm:inline-block border-l border-white/15 pl-3">
                {currentVideo.title}
              </span>
            </div>

            {/* Right Controls: Volume, Fullscreen */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-rose-200/80 hover:text-white transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-rosegold-accent h-1 bg-white/20 rounded-lg cursor-pointer hidden sm:block"
                  aria-label="Volume slider"
                />
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Playlist Selector (if more than 1 video) */}
      {videos.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-3xl mx-auto text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 mb-3 px-1 text-center">
            <span className="text-xs uppercase tracking-widest text-rosegold-300 font-medium">
              Video Playlist ({videos.length} clips)
            </span>
            <span className="text-xs text-rose-300/60 font-sans">
              Select any moment to watch
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {videos.map((vid, idx) => (
              <button
                key={vid.id || idx}
                onClick={() => setCurrentVideoIndex(idx)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  currentVideoIndex === idx
                    ? 'bg-rosegold-500/25 border-rosegold-accent text-white shadow-md'
                    : 'bg-midnight-900/50 border-white/10 text-rose-200/70 hover:bg-midnight-800/80 hover:text-white'
                }`}
              >
                <Film className={`w-3.5 h-3.5 shrink-0 ${currentVideoIndex === idx ? 'text-rosegold-accent' : 'text-rose-400/60'}`} />
                <span className="text-xs font-medium truncate">{vid.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
