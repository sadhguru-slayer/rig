import React from 'react'
import CtaSection from '@/components/CtaSection'


const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Hero / Intro */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700">
                About Us
              </div>
              <h1 className="mt-4 text-teal-700 text-4xl sm:text-5xl font-semibold tracking-tight">
                Crafting safety that preserves your view
              </h1>
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                We design and install premium invisible grills that integrate effortlessly with modern architecture—combining safety, durability, and unobstructed aesthetics.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Who We Are</h2>
              <p className="mt-4 text-gray-600">
                We’re a team of engineers, installers, and designers focused on high-performance invisible grills for homes and high-rises. Our approach is product-first and service-led—safety is our baseline; elegance is our standard.
              </p>
              <p className="mt-3 text-gray-600">
                From consultation to installation and aftercare, we ensure every balcony and window gets the right solution with impeccable finish.
              </p>
            </div>
            {/* Image placeholder */}
            <div>
              <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              <p className="mt-2 text-xs text-gray-500">Team or workshop photo placeholder</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-teal-700">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                Enable safer homes without compromising views, light, or modern design—through engineering-grade materials and precise installations.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-teal-700">Our Vision</h3>
              <p className="mt-2 text-gray-600">
                To be the most trusted name in invisible safety systems, setting the benchmark for quality, durability, and aesthetics.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Our Story</h2>
              <p className="mt-4 text-gray-600">
                Born from architectural and safety backgrounds, we saw an opportunity to replace heavy, rust-prone grills with a solution engineered for modern living.
              </p>
              <p className="mt-3 text-gray-600">
                Over time, we refined materials, anchoring systems, and service processes—so installations are faster, cleaner, and longer-lasting.
              </p>
            </div>
            {/* Timeline/Photo placeholder */}
            <div>
              <div className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              <p className="mt-2 text-xs text-gray-500">Milestones/timeline graphic placeholder</p>
            </div>
          </div>
        </section>

        {/* Why Invisible Grills? */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Why Invisible Grills?</h2>
            <p className="mt-3 text-gray-600 max-w-3xl">
              Invisible grills use high-tensile stainless steel cables and discreet anchoring to protect without visual bulk. They maintain natural light and views, reduce maintenance, and suit contemporary interiors and façades.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg border border-gray-200 p-5">
                <h4 className="font-medium text-teal-700">Aesthetic Minimalism</h4>
                <p className="mt-2 text-sm text-gray-600">Clean lines and near-invisible presence complement modern spaces.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <h4 className="font-medium text-teal-700">Engineered Safety</h4>
                <p className="mt-2 text-sm text-gray-600">304/316 grade SS cables, securely anchored, child-safe spacing.</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <h4 className="font-medium text-teal-700">Practical Longevity</h4>
                <p className="mt-2 text-sm text-gray-600">Corrosion resistance and low upkeep for urban and coastal environments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Our Team</h2>
              <p className="mt-3 text-gray-600">Engineers, installers, and customer success—aligned on quality and care.</p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map((id) => (
                <div key={id} className="rounded-xl border border-gray-200 p-6 text-center">
                  {/* Avatar placeholder */}
                  <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />
                  <h4 className="mt-4 font-medium text-gray-900">Member {id}</h4>
                  <p className="text-sm text-teal-700">Role / Title</p>
                  <p className="mt-2 text-sm text-gray-600">Short bio or area of expertise.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaSection/>
      </main>
    </div>
  )
}

export default AboutPage
