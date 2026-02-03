import React from 'react'
import { Github, Linkedin, Instagram, Facebook, Mail, MapPin, Heart } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO, SOCIAL_LINKS } from '../../Utils/constants'
import FadeIn from '../Animations/FadeIn'
import { scrollToSection } from '../../Hooks/useScrollSpy'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook
}

const Footer = () => {
  return (
    <footer className="relative bg-black overflow-hidden">

      {/* ===== Background Glow ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-96 h-96 -translate-y-1/2 bg-primary/10 blur-3xl rounded-full opacity-50" />
        <div className="absolute right-0 top-1/2 w-96 h-96 -translate-y-1/2 bg-primary/10 blur-3xl rounded-full opacity-50" />
      </div>

      {/* ===== Main Content ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

            {/* ===== LEFT: Brand + Contact ===== */}
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-transparent mb-4">
                {PERSONAL_INFO.name.split(' ')[0]}
              </h3>
              <p className="text-white/60 mb-6 max-w-sm">{PERSONAL_INFO.tagline}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-primary transition text-sm">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-white/70 text-sm">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* ===== CENTER: Quick Links ===== */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-center gap-2 text-white/70 hover:text-primary transition text-sm"
                    >
                      <span className="w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-6" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== RIGHT: Social ===== */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-white mb-6">Connect with Me</h4>
              <p className="text-white/60 text-sm mb-4 max-w-xs mx-auto ml-auto">
                Let's build something amazing together.
              </p>
              <div className="flex justify-center md:justify-end gap-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const Icon = socialIcons[platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition opacity-70 hover:opacity-100"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>
        </FadeIn>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-white/10">
        <FadeIn delay={200}>
          <div className="max-w-7xl mx-auto px-4 py-6 text-center space-y-2">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <p className="text-sm text-white/50 flex items-center justify-center gap-1">
              Built with <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> using React, JavaScript & Tailwind CSS
            </p>
          </div>
        </FadeIn>
      </div>

    </footer>
  )
}

export default Footer
