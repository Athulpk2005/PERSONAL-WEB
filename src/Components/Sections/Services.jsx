import React from 'react'
import { services } from '../../Data/service'
import * as Icons from 'lucide-react'
import { Wrench } from 'lucide-react'
import FadeIn from '../Animations/FadeIn'

const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-black overflow-hidden">

      {/* ===== Background Blobs + Faded Grid ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blurred blobs */}
        <div className="absolute top-1/4 left-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl opacity-50" />

        {/* Faded grid */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              opacity: 0.3,
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== Header ===== */}
        <FadeIn delay={100}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                What I Offer
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-normal mb-4 text-white">
              Services & Solutions
            </h2>

            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              High-quality solutions crafted to turn ideas into scalable, performant digital products.
            </p>
          </div>
        </FadeIn>

        {/* ===== FIRST ROW (3 CARDS) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Code2
            return (
              <FadeIn key={service.id} delay={index * 100}>
                <ServiceCard service={service} IconComponent={IconComponent} />
              </FadeIn>
            )
          })}
        </div>

        {/* ===== SECOND ROW (4 CARDS) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(3, 7).map((service, index) => {
            const IconComponent = Icons[service.icon] || Icons.Code2
            return (
              <FadeIn key={service.id} delay={(index + 3) * 100}>
                <ServiceCard service={service} IconComponent={IconComponent} />
              </FadeIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Services

/* ===== Reusable Service Card Component ===== */
const ServiceCard = ({ service, IconComponent }) => {
  return (
    <div className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1
                    flex flex-col min-h-64">
      {/* h-64 makes the card smaller */}

      {/* Icon */}
      <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition shrink-0">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-medium text-white mb-3">
          {service.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed flex-1">
          {service.description}
        </p>
      </div>

      {/* Glow overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-linear-to-br from-primary/10 to-transparent" />
    </div>
  )
}

