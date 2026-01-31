import React, { Children } from 'react'
import { useScrollReveal } from '../../Hooks/useScrollReveal'

const ScrollReveal = ({ children, animation = 'fade-up', duration = 500, delay = 0, }) => {

  const {ref, isVisible} = useScrollReveal({
    threshold:0.1
  });

  const animationClasses = {
    fadeUp: 'opacity-0 translate-y-8',
    fadeIn: 'opacity-0',
    slideLeft: 'opacity-0 -translate-x-12',
    slideRight: 'opacity-0 translate-x-12',
    slideIn: 'opacity-0 scale-90',
  }

  const VisibleClasses ='opacity-100 translate-y-0 translate-x-0 scale-100'

  return (
    <div 
    ref={ref}
    className={`transition-all ease-out ${isVisible ? VisibleClasses : animationClasses[animation]}`}
    style={{
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    }}
    >{children}</div>
  )
}

export default ScrollReveal