import React from 'react'
import { skills } from '../../Data/Skills'
import * as icons from 'lucide-react'
import FadeIn from '../Animations/FadeIn'

const Skills = () => {

  // Categorize skills
  const skillCategories = {
    'Frontend Development': [
      skills.find(s => s.name === 'React.js'),
      skills.find(s => s.name === 'JavaScript'),
      skills.find(s => s.name === 'HTML'),
      skills.find(s => s.name === 'CSS'),
      skills.find(s => s.name === 'Bootstrap'),
      skills.find(s => s.name === 'Tailwind CSS'),
      skills.find(s => s.name === 'Next.js'),
      skills.find(s => s.name === 'Redux'),
      skills.find(s => s.name === 'TypeScript'),
    ].filter(Boolean),

    'Backend & APIs': [
      skills.find(s => s.name === 'Node.js'),
      skills.find(s => s.name === 'Express.js'),
      skills.find(s => s.name === 'MongoDB'),
      skills.find(s => s.name === 'PostgreSQL'),
      skills.find(s => s.name === 'REST APIs'),
    ].filter(Boolean),

    'Tools & Others': [
      skills.find(s => s.name === 'Git'),
      skills.find(s => s.name === 'GitHub'),
      skills.find(s => s.name === 'Figma'),
      skills.find(s => s.name === 'Postman'),
      skills.find(s => s.name === 'Vite'),
      skills.find(s => s.name === 'npm'),
      skills.find(s => s.name === 'VS Code'),
    ].filter(Boolean),

    'Deployment': [
      skills.find(s => s.name === 'Netlify'),
      skills.find(s => s.name === 'Vercel'),
      skills.find(s => s.name === 'Firebase'),
      skills.find(s => s.name === 'AWS'),
      skills.find(s => s.name === 'Render'),
    ].filter(Boolean),
  }

  // Get proficiency percentage
  const getProficiencyLevel = (level) => {
    const levels = {
      Expert: 95,
      Advanced: 80,
      Intermediate: 65,
      Beginner: 50,
    }
    return levels[level] || 50
  }

  // Get badge color
  const getLevelColor = (level) => {
    const colors = {
      Expert: 'text-[#8dff69] bg-[#8dff69]/20 border-[#8dff69]/30',
      Advanced: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      Intermediate: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      Beginner: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    }
    return colors[level] || 'text-gray-400 bg-gray-500/20 border-gray-500/30'
  }

  return (
    <section id="skills" className="relative py-20 bg-black overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <icons.Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                My Expertise
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-normal mb-4 text-white">
              Skills & Technologies
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels.
            </p>
          </div>
        </FadeIn>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
            <FadeIn key={category} delay={categoryIndex * 100}>
              <div className="relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group">

                {/* Category header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary/40 to-primary/10 rounded-full" />
                  <h3 className="text-xl text-white font-medium">{category}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-5">
                  {categorySkills.map((skill) => {
                    const IconComponent = icons[skill.icon] || icons.Code2
                    const proficiency = getProficiencyLevel(skill.level)

                    return (
                      <div key={skill.id} className="space-y-2">

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-white text-sm font-medium">
                              {skill.name}
                            </span>
                          </div>

                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(skill.level)}`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/30 to-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${proficiency}%` }}
                          />
                        </div>

                      </div>
                    )
                  })}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5  group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills
