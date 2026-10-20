import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Native-friendly smooth scroll hook.
 * Uses the browser's standard scroll container and scroll events,
 * preserving natural trackpad inertia, touch swipe, scrollbar dragging,
 * and keyboard navigation, while dampening the 3D camera timeline.
 */
export function useSmoothScroll() {
  const [progress, setProgress] = useState<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);

  // Synchronize target progress with window.scrollY
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth dampening loop for 60fps camera motion
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.085;
        currentProgressRef.current = Math.max(0, Math.min(1, currentProgressRef.current));
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Programmatic scroll to target progress (0.0 to 1.0)
  const scrollToProgress = useCallback((target: number) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = target * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  return {
    progress,
    targetProgress: targetProgressRef.current,
    scrollToProgress
  };
}
