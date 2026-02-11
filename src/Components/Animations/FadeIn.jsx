import React, { useEffect, useRef, useState } from 'react'

const FadeIn = ({ children, delay = 0, duration = 500, threshold = 0.1 }) => {

  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px 50px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, prefersReducedMotion])

  return (
    <div ref={elementRef} className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{
        animationDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        animationDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn
