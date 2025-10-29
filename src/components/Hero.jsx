import React from 'react'
import Link from 'next/link'
const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700">
            Premium Invisible Grills • Safety meets design
          </div>
          <h1 className="mt-4 text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight">
            Unobstructed Views. Uncompromised Safety.
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Elegant, durable, and rust-resistant invisible grills for balconies and windows.
            Engineered with high-tensile SS cables and secure locking systems.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="inline-flex rounded-md bg-teal-700 px-5 py-3 text-sm font-medium text-white hover:bg-teal-800">
              Get a Free Quote
            </Link>
            <Link href="/benefits" className="inline-flex rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50 text-teal-700 hover:border-teal-300">
              See Benefits
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-gray-500">
            <span>Child-safe</span>
            <span>Corrosion-resistant</span>
            <span>Low maintenance</span>
            <span>Quick installation</span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
          <p className="mt-2 text-xs text-gray-500">Placeholder for hero image (balcony with invisible grills)</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
