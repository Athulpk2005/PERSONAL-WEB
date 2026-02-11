import React, { Children, useState, useEffect, useRef } from 'react'

const ScrollReveal = ({ children, animation = 'fade-up', duration = 500, delay = 0, threshold = 0.1 }) => {

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
        rootMargin: '0px 0px -50px 0px'
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

  const animationClasses = {
    fadeUp: 'opacity-0 translate-y-8',
    fadeIn: 'opacity-0',
    slideLeft: 'opacity-0 -translate-x-12',
    slideRight: 'opacity-0 translate-x-12',
    slideIn: 'opacity-0 scale-90',
  }

  const VisibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100'

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${isVisible ? VisibleClasses : animationClasses[animation]}`}
      style={{
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
      }}
    >{children}</div>
  )
}

export default ScrollReveal
