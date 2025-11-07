'use client'
import React, { useState, useMemo } from 'react'
import CommonHero from '@/components/CommonHero'
import Testimonials from '@/components/Testimonials'
import CtaSection from '@/components/CtaSection'
import Link from 'next/link'
import GsapReveal from '@/components/GsapReveal'
import Image from 'next/image'
import projectsData from '@/data/projects' // Adjust the import path accordingly

const ProjectsPage = () => {
  // Extract unique categories and serviceTypes from projects dynamically
  const categories = useMemo(() => {
    const allCats = projectsData.map(p => p.category)
    return ['all', ...Array.from(new Set(allCats))]
  }, [])

  const serviceTypes = useMemo(() => {
    const allTypes = projectsData.map(p => p.serviceType)
    return ['all', ...Array.from(new Set(allTypes))]
  }, [])

  // States for active filters
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeServiceType, setActiveServiceType] = useState('all')

  // Filtered and mapped projects with required minimal fields
  const filteredProjects = useMemo(() => {
    let filtered = projectsData

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }

    if (activeServiceType !== 'all') {
      filtered = filtered.filter(p => p.serviceType === activeServiceType)
    }

    // Map to required fields + default cta
    return filtered.map(({ id, slug, imgSource, name, description, keyProject }) => ({
      id,
      slug,
      imgSource: imgSource || '', // Use first image or fallback
      title: name,
      description,
      cta: 'View Project Details',
      keyProject,
    }))
  }, [activeCategory, activeServiceType])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        <GsapReveal delay={0.05}>
          <CommonHero
            eyebrow="Our Work"
            title="Explore Our Recent Invisible Grill Installations"
            subtitle="Browse through our portfolio showcasing precision, durability, and modern design."
            primaryCta={{ label: 'Get a Quote', href: '/contact' }}
            secondaryCta={{ label: 'View Services', href: '/services' }}
            mediaNote="Portfolio highlight image placeholder"
            mediaSrc="/images/projectspage/hero.png"
          />
        </GsapReveal>

        {/* Filters Section */}
        <GsapReveal triggerOnView>
          <section className="py-8 lg:py-10 bg-gray-50 border-t border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>

              {/* Service Type Filter */}
              <div className="flex flex-wrap gap-3">
                {serviceTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveServiceType(type)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-300 ${
                      activeServiceType === type
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700'
                    }`}
                  >
                    {type === 'all' ? 'All Services' : type}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>
<div className="max-w-6xl mx-auto bg-gray-50 flex gap-4 justify-center items-center px-4">
<div className='w-full h-0.5 bg-sky-800 '/>
<h1 className='whitespace-nowrap text-4xl font-bold text-teal-600'>Our Projects</h1>
<div className='w-full h-0.5 bg-sky-800'/>
</div>

        {/* Projects Grid */}
        <GsapReveal triggerOnView>
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length === 0 && (
                  <p className="text-center text-gray-500">No projects found.</p>
                )}
{filteredProjects.map(project => (
  <div
    key={project.id}
    className={`group relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
  >
    {/* Image Section */}
    <div className="relative overflow-hidden rounded-t-xl">
      <Image
        src={project.imgSource}
        alt={project.title}
        width={400}
        height={300}
        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Key Project Ribbon in a subtle corner */}
      {project.keyProject && (
        <div className="absolute top-2 right-0 bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-md shadow-md">
          Key Project
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 flex flex-col gap-2 justify-between h-36 max-h-40 min-h-fit">
      <h3 className="text-md font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="mt-1 text-gray-600 text-sm line-clamp-2">{project.description}</p>
      <div className="mt-3 flex justify-end">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors duration-300 flex items-center gap-1"
          aria-label={`View details for ${project.title}`}
        >
          {project.cta} <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  </div>
))}

              </div>
            </div>
          </section>
        </GsapReveal>

        {/* Featured Project Highlight (optional) */}
        {/* Additional page sections like Testimonials, CTA etc. */}
        <GsapReveal triggerOnView>
          <Testimonials />
        </GsapReveal>

        <GsapReveal triggerOnView>
          <CtaSection />
        </GsapReveal>
      </main>
    </div>
  )
}

export default ProjectsPage
