import React, { useState } from 'react'
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  MessageSquare
} from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../Utils/constants'
import FadeIn from '../Animations/FadeIn'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill all fields' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' })
      return
    }

    setStatus({
      type: 'success',
      message: 'Message sent successfully! I will get back to you soon.'
    })

    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus({ type: '', message: '' }), 5000)
  }

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 h-80 w-80 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-0 h-80 w-80 bg-primary/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-white mb-4">
              Let’s Work Together
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Have a project in mind? Let’s build something amazing.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FORM */}
          <FadeIn delay={100}>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/50"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none focus:ring-2 focus:ring-primary/50"
                />

                <button className="w-full py-3 px-6 bg-gradient-to-r from-primary/10 to-primary rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-primary/30 transition group">
                  Send Message <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>

                {status.message && (
                  <div
                    className={`p-4 rounded-xl ${
                      status.type === 'success'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </FadeIn>

          {/* INFO SIDE */}
          <FadeIn delay={200}>
            <div className="flex flex-col gap-8">

              {/* Email & Location Cards */}
              <div className="flex flex-col gap-6">
                {/* Email Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/30 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="text-primary" />
                    <h4 className="text-white font-medium">Email</h4>
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-white/70 hover:text-primary transition break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                {/* Location Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/30 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-primary" />
                    <h4 className="text-white font-medium">Location</h4>
                  </div>
                  <p className="text-white/70">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-white mb-4">Connect With Me</p>
                <div className="flex gap-4">
                  {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                    const Icon = socialIcons[platform]
                    if (!Icon) return null

                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/20 hover:border-primary/40 transition"
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
      </div>
    </section>
  )
}

export default Contact
