import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSmoothScrollOptions {
  isModalOpen?: boolean;
}

export function useSmoothScroll({ isModalOpen = false }: UseSmoothScrollOptions = {}) {
  const [progress, setProgress] = useState<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isModalOpenRef = useRef<boolean>(isModalOpen);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  // Handle Wheel Events directly on window
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If a modal or case study is open, allow normal scrolling inside the modal
      if (isModalOpenRef.current) return;

      // Normalize delta
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 28; // line mode
      else if (e.deltaMode === 2) delta *= 300; // page mode

      // Step tuning: smooth deliberate scroll progression
      const step = delta * 0.00038;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + step));

      // Synchronize native scrollbar position so user sees real scroll progress in scrollbar
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo(0, targetProgressRef.current * maxScroll);
    };

    // Handle Native Scroll events (e.g. scrollbar thumb drag)
    const handleScroll = () => {
      if (isModalOpenRef.current) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, scrollY / maxScroll));
      // Only sync if there is a meaningful discrepancy (e.g. thumb drag)
      if (Math.abs(ratio - targetProgressRef.current) > 0.05) {
        targetProgressRef.current = ratio;
      }
    };

    // Touch events for mobile/tablet
    const handleTouchStart = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      const step = deltaY * 0.0015;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + step));

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo(0, targetProgressRef.current * maxScroll);
    };

    // Keyboard support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current + 0.05));
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo(0, targetProgressRef.current * maxScroll);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current - 0.05));
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo(0, targetProgressRef.current * maxScroll);
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetProgressRef.current = 0;
        window.scrollTo(0, 0);
      } else if (e.key === 'End') {
        e.preventDefault();
        targetProgressRef.current = 1;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo(0, maxScroll);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
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

  // Programmatic jump to target progress
  const scrollToProgress = useCallback((target: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, target));
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: target * maxScroll,
      behavior: 'smooth'
    });
  }, []);

  return {
    progress,
    targetProgress: targetProgressRef.current,
    scrollToProgress
  };
}
