import { useEffect, useRef, useState } from "react";

export const useScrollReveal = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px'
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    useEffect(() => {
        // Skip animation if user prefers reduced motion
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold,
                rootMargin
            }
        );
        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        }
    }, [threshold, rootMargin, prefersReducedMotion]);

    return { ref, isVisible };
}
