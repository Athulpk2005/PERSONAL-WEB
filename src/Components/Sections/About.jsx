import React from 'react'
import { Download, Code2, Sparkles } from 'lucide-react'
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiExpress,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiGit,
  SiGithub,
} from 'react-icons/si'
import { PERSONAL_INFO } from '../../Utils/constants'
import FadeIn from '../Animations/FadeIn'
import RadialGradientBackground from '../backgrounds/RadialgradientBackground'

const About = () => {
  const skills = [
    { name: 'HTML', icon: SiHtml5, color: '#e44d26' },
    { name: 'CSS', icon: SiCss3, color: '#1572b6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'React Native', icon: SiReact, color: '#61dafb' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#ffffff' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'Figma', icon: SiFigma, color: '#336791' },
    { name: 'GitHub', icon: SiGithub, color: '#336791' },

  ]

  return (
    <section
      id="about"
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Background */}
      <RadialGradientBackground Variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col gap-12 items-start md:items-center lg:items-start">
            <FadeIn delay={60}>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  Full Stack Developer
                </span>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight md:text-center lg:text-left">
                Crafting Digital Experiences That Matter
              </h2>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex flex-col gap-4 max-w-xl md:text-center lg:text-left">
                {PERSONAL_INFO.bio.map((text, index) => (
                  <p
                    key={index}
                    className="text-base text-white/70 leading-relaxed"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                onClick={() =>
                  window.open(PERSONAL_INFO.resume, '_blank')
                }
                className="inline-flex items-center gap-3 bg-white text-black rounded-full px-8 py-4 text-base font-medium hover:bg-white/90 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </button>
            </FadeIn>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <FadeIn delay={200}>
            <div className="w-full max-w-xl md:mx-auto lg:ml-auto grid grid-cols-2 gap-4">

              {/* Expertise Card */}
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Expertise
                      </h3>
                      <p className="text-sm text-white/70">
                        Building scalable and responsive web applications
                        using modern MERN technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Code */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all h-full">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    Clean Code
                  </h3>
                  <p className="text-sm text-white/70">
                    Writing clean, readable, and maintainable code
                    following best practices.
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all h-full">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    Performance Focused
                  </h3>
                  <p className="text-sm text-white/70">
                    Optimized applications for speed, scalability,
                    and smooth user experience.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all">
                  <div className="grid grid-cols-3 text-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        100%
                      </div>
                      <p className="text-xs text-white/60">
                        Client Satisfaction
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        24/7
                      </div>
                      <p className="text-xs text-white/60">
                        Always Available
                      </p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        Fast
                      </div>
                      <p className="text-xs text-white/60">
                        Delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>

        {/*Skills Grid Section*/}
        <FadeIn delay={500}>
          <div className='flex flex-col items-center gap-8'>
            <div className="text-center">
              <h3 className='text-2xl font-normal text-white mb-2'>
                Tech Stack & Expertise
              </h3>
              <p className="text-sm text-white/60">
                Here's a snapshot of my tech stack and areas of expertise
              </p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl'>
              {skills.map((skill, index) => (
                <div key={index}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
                >
                  <skill.icon className='text-3xl text-primary' />
                  <div className='text-sm text-white/80 font-medium text-center'>
                    {skill.name}
                  </div>
                  {/* Hover Glow */}
                  <div className='absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/10 rounded-2xl transition-all duration-300'></div>

                </div>

              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

export default About
