import { useEffect, useRef, useCallback } from 'react';
import bgmUrl from '@/assets/audio/bgm.mp3';
import passUrl from '@/assets/audio/pass.mp3';
import failUrl from '@/assets/audio/fail.mp3';

export function useGameAudio() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const passRef = useRef<HTMLAudioElement | null>(null);
  const failRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio objects
    bgmRef.current = new Audio(bgmUrl);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2; // BGM is slightly lower

    passRef.current = new Audio(passUrl);
    passRef.current.volume = 0.8;

    failRef.current = new Audio(failUrl);
    failRef.current.volume = 0.8;

    // Cleanup on unmount
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
      if (passRef.current) {
        passRef.current.pause();
      }
      if (failRef.current) {
        failRef.current.pause();
      }
    };
  }, []);

  const playBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.currentTime = 0; // Start from beginning if it was stopped
      bgmRef.current.play().catch((err) => console.error('BGM play failed:', err));
    }
  }, []);

  const stopBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
    }
  }, []);

  const playPassSound = useCallback(() => {
    if (passRef.current) {
      passRef.current.currentTime = 0; // Reset to handle overlapping triggers
      passRef.current.play().catch((err) => console.error('Pass sound play failed:', err));
    }
  }, []);

  const playFailSound = useCallback(() => {
    if (failRef.current) {
      failRef.current.currentTime = 0;
      failRef.current.play().catch((err) => console.error('Fail sound play failed:', err));
    }
  }, []);

  return {
    playBGM,
    stopBGM,
    playPassSound,
    playFailSound,
  };
}
