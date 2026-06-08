import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export const useLenis = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: options.lerp ?? 0.1,
      duration: options.duration ?? 1.5,
      easing: options.easing ?? (t => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: options.touchMultiplier ?? 2,
      infinite: options.infinite ?? false,
      ...options,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
};

export const getLenisInstance = () => lenisInstance;

export default useLenis;
