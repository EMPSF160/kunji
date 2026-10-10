import React, { useState, useEffect, useRef } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import CustomHeartCursor from './components/CustomHeartCursor';
import PageLoader from './components/PageLoader';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeroSection from './components/HeroSection';
import TimePassedCounter from './components/TimePassedCounter';
import ApologyLetterSection from './components/ApologyLetterSection';
import SpecialMomentsSection from './components/SpecialMomentsSection';
import MirrorSelfiesSection from './components/MirrorSelfiesSection';
import HerSpecialSongSection from './components/HerSpecialSongSection';
import TealSareeCinematicSection from './components/TealSareeCinematicSection';
import MemoryGallerySection from './components/MemoryGallerySection';
import VideoMessageSection from './components/VideoMessageSection';
import MusicPlayerSection from './components/MusicPlayerSection';
import FloatingAudioController from './components/FloatingAudioController';
import PromisesSection from './components/PromisesSection';
import FinalQuestionSection from './components/FinalQuestionSection';
import FooterSection from './components/FooterSection';
import { useAudio } from './context/AudioContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const { playMusic } = useAudio();
  const timeSectionRef = useRef(null);

  useEffect(() => {
    // Initial gentle page load delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    playMusic();
  };

  const scrollToNext = () => {
    if (timeSectionRef.current) {
      timeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="relative min-h-screen selection:bg-rosegold-500/30 selection:text-white">
      {/* Background Starlight & Nebula Canvas */}
      <StarfieldCanvas />

      {/* Desktop Heart Cursor */}
      <CustomHeartCursor />

      {/* Persistent Floating Music Controller */}
      {isEnvelopeOpen && <FloatingAudioController />}

      {/* Section 1: Envelope Intro (Interactivity unlocks audio) */}
      <EnvelopeIntro isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />

      {/* Main Single Page Experience */}
      <main className="relative z-10 transition-opacity duration-1000">
        {/* Section 2: Hero */}
        <HeroSection onScrollToNext={scrollToNext} />

        {/* Section 3: Time Has Passed */}
        <div ref={timeSectionRef}>
          <TimePassedCounter />
        </div>

        {/* Section 4: The Apology Letter */}
        <ApologyLetterSection />

        {/* Section 5: Standalone Chapter 1 (The 3 Special Photos of Us) */}
        <SpecialMomentsSection />

        {/* Section 6: Standalone Chapter 2 (The 4 Mirror Selfies of Us) */}
        <MirrorSelfiesSection />

        {/* Section 7: Standalone Chapter 3 (Her Sweetest Smile in Yellow + Dedicated SMS Song) */}
        <HerSpecialSongSection />

        {/* Section 8: Standalone Chapter 4 (Elegance in Teal Saree + Cinematic Motion Video) */}
        <TealSareeCinematicSection />

        {/* Section 9: Memory Gallery */}
        <MemoryGallerySection />

        {/* Section 6: Video Message */}
        <VideoMessageSection />

        {/* Section 7: Our Song (Vinyl Turntable) */}
        <MusicPlayerSection />

        {/* Section 8: What I Promise You */}
        <PromisesSection />

        {/* Section 9: Final Question */}
        <FinalQuestionSection />

        {/* Section 10: Footer */}
        <FooterSection />
      </main>
    </div>
  );
}
