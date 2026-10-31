import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCanvasScrollProps {
  isModalOpen?: boolean;
}

export function useCanvasScroll({ isModalOpen = false }: UseCanvasScrollProps = {}) {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animFrameId = useRef<number | null>(null);

  // Sync scroll with window scroll event on a tall container
  useEffect(() => {
    const handleScroll = () => {
      if (isModalOpen) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      targetProgress.current = Math.max(0, Math.min(1, scrollY / maxScroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalOpen]);

  // Smooth lerp animation loop for camera progress
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const factor = Math.min(1, delta * 6.5);
      currentProgress.current += (targetProgress.current - currentProgress.current) * factor;

      if (Math.abs(targetProgress.current - currentProgress.current) < 0.0001) {
        currentProgress.current = targetProgress.current;
      }

      setProgress(currentProgress.current);
      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const scrollToProgress = useCallback((val: number) => {
    const target = Math.max(0, Math.min(1, val));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: target * maxScroll,
      behavior: 'smooth'
    });
  }, []);

  return {
    progress,
    scrollToProgress
  };
}
