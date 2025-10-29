'use client'
import React, { useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommonHero from '@/components/CommonHero'
import Testimonials from '@/components/Testimonials'
import CtaSection from '@/components/CtaSection'
import Link from 'next/link'
const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'balconies', label: 'Balconies' },
  { key: 'windows', label: 'Windows' },
  { key: 'staircases', label: 'Staircases' },
  { key: 'enclosures', label: 'Safety Enclosures' },
]

const SORTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'popular', label: 'Popular' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
]

const ALL_PROJECTS = [
  { id: 1, title: 'Skyline Heights Balcony', location: 'Bengaluru', category: 'balconies', type: 'residential' },
  { id: 2, title: 'Seaside Window Set', location: 'Mumbai', category: 'windows', type: 'residential' },
  { id: 3, title: 'Atrium Staircase Guard', location: 'Hyderabad', category: 'staircases', type: 'commercial' },
  { id: 4, title: 'Play Area Enclosure', location: 'Pune', category: 'enclosures', type: 'residential' },
  { id: 5, title: 'Hotel Balcony Series', location: 'Chennai', category: 'balconies', type: 'commercial' },
  { id: 6, title: 'Corner Window Grid', location: 'Bengaluru', category: 'windows', type: 'residential' },
]

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSort, setActiveSort] = useState('newest')

  const projects = useMemo(() => {
    let list = ALL_PROJECTS
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory)
    }
    if (activeSort === 'residential') {
      list = list.filter(p => p.type === 'residential')
    } else if (activeSort === 'commercial') {
      list = list.filter(p => p.type === 'commercial')
    }
    // simple stable ordering; extend with dates/popularity if needed
    return list
  }, [activeCategory, activeSort])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        <CommonHero
          eyebrow="Our Work"
          title="Explore Our Recent Invisible Grill Installations"
          subtitle="Browse through our portfolio showcasing precision, durability, and modern design."
          primaryCta={{ label: 'Get a Quote', href: '/contact' }}
          secondaryCta={{ label: 'View Services', href: '/services' }}
          mediaNote="Portfolio highlight image placeholder"
        />

        {/* Categories / Filters */}
        <section className="py-8 lg:py-10 bg-white border-t border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full px-4 py-2 text-sm border transition ${activeCategory === cat.key ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort:</span>
              <div className="flex flex-wrap gap-2">
                {SORTS.map(s => (
                  <button
                    key={s.key}
                    onClick={() => setActiveSort(s.key)}
                    className={`rounded-md px-3 py-1.5 text-xs border transition ${activeSort === s.key ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(card => (
                <div key={card.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden group">
                  <div className="relative">
                    <div className="aspect-[4/3] w-full bg-gray-100 border-b border-gray-200 group-hover:opacity-95 transition" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{card.location}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-0.5 text-xs">
                        {card.category}
                      </span>
                      <button className="text-sm text-teal-700 hover:text-teal-800">View Details →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Project Highlight */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:items-center">
            <div>
              <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              <p className="mt-2 text-xs text-gray-500">Featured project image / before-after slider placeholder</p>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Flagship High-Rise Balcony Series</h2>
              <p className="mt-4 text-gray-600">12-tower installation featuring 316-grade cables for coastal resistance, child-safe spacing, and custom anchoring for cantilevered slabs.</p>
              <p className="mt-3 text-gray-600">Result: unobstructed skyline views, near-zero maintenance, and uniform façade aesthetics.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex rounded-md bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 transition">Contact for Case Study</Link>
                <Link href="/services" className="inline-flex rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50 text-teal-700 hover:border-teal-300">View Related Service</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials (reuse) */}
        <Testimonials />

        {/* CTA (reuse) */}
        <CtaSection />
      </main>
    </div>
  )
}

export default ProjectsPage


