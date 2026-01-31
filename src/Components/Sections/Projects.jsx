import React, { useState, useRef, useEffect } from 'react'
import { projects, categories } from '../../Data/project'
import {
  Briefcase,
  Sparkles,
  Target,
  Globe,
  Palette,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../Animations/FadeIn'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const scrollRef = useRef(null)

  /* =======================
     RESPONSIVE CARD COUNT
  ======================== */
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1)
      else if (window.innerWidth < 1024) setVisibleCards(2)
      else setVisibleCards(3)
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  /* =======================
     FILTER PROJECTS
  ======================== */
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(p => p.category === activeCategory)

  const categoryIcons = {
    All: Target,
    'Web Apps': Globe,
    'UI Components': Palette,
    'Full Stack': Zap,
  }

  /* =======================
     SCROLL TO CARD (FIXED)
  ======================== */
  const scrollToIndex = (index) => {
    if (!scrollRef.current) return

    const cards = scrollRef.current.querySelectorAll('[data-card]')
    if (!cards[index]) return

    setCurrentIndex(index)

    cards[index].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest', // ✅ prevents page jump
    })
  }


  const next = () =>
    scrollToIndex(
      Math.min(currentIndex + 1, filteredProjects.length - visibleCards)
    )

  const prev = () =>
    scrollToIndex(Math.max(currentIndex - 1, 0))

  /* =======================
     SYNC INDEX ON SCROLL
  ======================== */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const cards = el.querySelectorAll('[data-card]')
      let index = 0

      cards.forEach((card, i) => {
        if (card.offsetLeft <= el.scrollLeft + 10) index = i
      })

      setCurrentIndex(index)
    }

    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  /* =======================
     RENDER
  ======================== */
  return (
    <section id="projects" className="relative py-24 bg-black overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 border border-primary/30 bg-primary/10 rounded-full">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Projects</span>
            </div>

            <h2 className="text-4xl lg:text-5xl text-white mb-4">
              My Works
            </h2>

            <p className="text-white/60">
              A curated collection of projects showcasing my design and
              full-stack skills.
            </p>
          </div>
        </FadeIn>

        {/* Categories */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map(cat => {
              const Icon = categoryIcons[cat] || Sparkles
              const active = activeCategory === cat

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    setCurrentIndex(0)
                    scrollRef.current?.scrollTo({ left: 0 })
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all
                    ${active
                      ? 'bg-primary/15 border-primary/40 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{cat}</span>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={200}>
          <div className="relative">

            {/* Left Arrow */}
            {filteredProjects.length > visibleCards && (
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                bg-black/50 backdrop-blur-md border border-white/10
                rounded-full p-3 text-white hover:bg-primary/20
                disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Arrow */}
            {filteredProjects.length > visibleCards && (
              <button
                onClick={next}
                disabled={currentIndex >= filteredProjects.length - visibleCards}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                bg-black/50 backdrop-blur-md border border-white/10
                rounded-full p-3 text-white hover:bg-primary/20
                disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Project List */}
            <div ref={scrollRef} className="overflow-hidden">
              <div className="
                flex gap-6
                overflow-x-auto
                scroll-smooth
                snap-x snap-mandatory
                scrollbar-hide
                px-1
              ">
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    data-card
                    className="
                      snap-start
                      shrink-0
                      w-full
                      sm:w-1/2
                      lg:w-1/3
                    "
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            {filteredProjects.length > visibleCards && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({
                  length: filteredProjects.length - visibleCards + 1,
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`rounded-full transition-all
                      ${currentIndex === i
                        ? 'w-6 h-2 bg-primary'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Projects
