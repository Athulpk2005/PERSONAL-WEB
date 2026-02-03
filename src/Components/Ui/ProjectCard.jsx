import React from 'react'

import { ExternalLink, Github, TrendingUp } from 'lucide-react'



const ProjectCard = ({ project }) => {

  const { title, description, image, category, Technologies, Demo, GitHub, Behance } = project



  return (

    <div className="group relative h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:border-primary/40 hover:-translate-y-1">



      {/* ===== Image ===== */}

      <div className="relative h-48 overflow-hidden">

        <img

          src={image}

          alt={title}

          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"

        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <span className="absolute top-4 left-4 px-4 py-1 text-xs rounded-full bg-black/60 border border-white/10 text-white">

          {category}

        </span>

      </div>



      {/* ===== Content ===== */}

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">



        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">

          {title}

        </h3>



        <p className="text-sm text-white/60 mb-4 line-clamp-3">

          {description}

        </p>



        {/* ===== Tech Stack ===== */}

        <div className="flex flex-wrap gap-2 mb-5">

          {Technologies?.slice(0, 4).map((tech, index) => (

            <span

              key={index}

              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/40 backdrop-blur-md animate-pulse"

            >

              {tech}

            </span>

          ))}

          {Technologies?.length > 4 && (

            <span className="px-3 py-1 text-xs rounded-full bg-primary/15 text-primary border border-primary/50 backdrop-blur-md animate-pulse">

              +{Technologies.length - 4}

            </span>

          )}

        </div>



        {/* ===== Actions with hover text and glow ===== */}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">



          <div className="flex items-center gap-3">



            {/* GitHub */}

            {GitHub && (

              <a

                href={GitHub}

                target="_blank"

                rel="noopener noreferrer"

                className="relative flex items-center p-2 rounded-full bg-white/5 border border-white/10 text-white hover:text-primary hover:border-white/30 transition group-hover:shadow-[0_0_10px_rgba(137,255,105,0.7)]"

              >

                <Github className="w-4 h-4" />

              </a>

            )}



            {/* Live Demo */}

            {Demo && (

              <a

                href={Demo}

                target="_blank"

                rel="noopener noreferrer"

                className="relative flex items-center p-2 rounded-full bg-white/5 border border-white/10 text-white hover:text-primary hover:border-white/30 transition group-hover:shadow-[0_0_10px_rgba(137,255,105,0.7)]"

              >

                <ExternalLink className="w-4 h-4" />

              </a>

            )}

          </div>



          <TrendingUp className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />

        </div>

      </div>

    </div>

  )

}



export default ProjectCard

