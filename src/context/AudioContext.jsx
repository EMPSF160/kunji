import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import mediaData from '../media.json';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const songs = mediaData.music || [];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex] || null;

  // Initialize or handle track change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    audio.src = currentSong.src;
    audio.volume = volume;
    audio.muted = isMuted;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play prevented or interrupted:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex]);

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasUserInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback error:', e);
      });
    }
  };

  const playMusic = () => {
    if (!audioRef.current) return;
    setHasUserInteracted(true);
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((e) => {
      console.warn('Auto-play blocked:', e);
    });
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const nextSong = () => {
    if (songs.length <= 1) return;
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    if (songs.length <= 1) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const selectSong = (index) => {
    if (index >= 0 && index < songs.length) {
      if (index === currentSongIndex) {
        togglePlay();
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
      }
    }
  };

  const playTrack = (index) => {
    selectSong(index);
  };

  const seek = (timeInSeconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      nextSong();
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [songs.length]);

  return (
    <AudioContext.Provider
      value={{
        songs,
        currentSong,
        currentSongIndex,
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        hasUserInteracted,
        togglePlay,
        playMusic,
        pauseMusic,
        toggleMute,
        nextSong,
        prevSong,
        selectSong,
        playTrack,
        seek,
        setVolume: (val) => {
          setVolume(val);
          if (audioRef.current) audioRef.current.volume = val;
        },
      }}
    >
      <audio ref={audioRef} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within an AudioProvider');
  return ctx;
}
