import React from 'react'
import CtaSection from '@/components/CtaSection'
import GsapReveal from '@/components/GsapReveal'
import CommonHero from '@/components/CommonHero'
import Image from 'next/image'
const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Hero / Intro */}
        
<GsapReveal delay={0.05}>
  <CommonHero
    eyebrow="About Us"
    title="Crafting safety that preserves your view"
    subtitle="We design and install premium invisible grills that integrate effortlessly with modern architecture—combining safety, durability, and unobstructed aesthetics."
    primaryCta={{ label: 'Get a Quote', href: '/contact' }}
    secondaryCta={{ label: 'View Projects', href: '/projects' }}
    mediaNote="Installation or hero image placeholder"
    mediaSrc='/images/aboutpage/hero.png'
  />
</GsapReveal>


        {/* Who We Are */}
        <GsapReveal triggerOnView>
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
            <div className=''>
              <Image 
              alt='Who are we?'
              width={450}
              height={400}
              src='/images/aboutpage/whoarewe_illustration.png'
              className="mx-auto rounded-xl border border-dashed border-gray-300 bg-gray-50" />
 </div>
          </div>
        </section>
        </GsapReveal>

        {/* Mission & Vision */}
<GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-12">
      {/* Mission Card */}
      <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 group ">
        {/* Decorative Icon */}
        <div className="absolute -top-6 left-6 bg-teal-100 text-teal-700 w-12 h-12 flex items-center justify-center rounded-full shadow-md text-xl font-bold">
          🚀
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 mt-4">Our Mission</h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Enable safer homes without compromising views, light, or modern design—through engineering-grade materials and precise installations.
        </p>
        <div className="mt-6">
          <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 text-xs font-medium rounded-full shadow-sm">
            Safety First
          </span>
        </div>
      </div>

      {/* Vision Card */}
      <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 group ">
        {/* Decorative Icon */}
        <div className="absolute -top-6 left-6 bg-teal-100 text-teal-700 w-12 h-12 flex items-center justify-center rounded-full shadow-md text-xl font-bold">
          🌟
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 mt-4">Our Vision</h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          To be the most trusted name in invisible safety systems, setting the benchmark for quality, durability, and aesthetics.
        </p>
        <div className="mt-6">
          <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 text-xs font-medium rounded-full shadow-sm">
            Excellence & Trust
          </span>
        </div>
      </div>
    </div>
  </section>
</GsapReveal>


        {/* Our Story */}
        <GsapReveal triggerOnView>
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

          </div>
<div className="flex flex-col md:flex-row gap-6 my-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Origins */}
  <div className="group relative flex-1 overflow-hidden rounded-xl shadow-sm">
    <Image
      src="/images/aboutpage/s1.png"
      alt="Our Story - Origins"
      width={400}
      height={300}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
      <h3 className="text-white text-lg font-semibold">Our Origins</h3>
      <p className="text-white text-sm">Born from architectural and safety expertise, we saw a need for modern solutions.</p>
    </div>
  </div>

  {/* Innovation */}
  <div className="group relative flex-1 overflow-hidden rounded-xl shadow-sm">
    <Image
      src="/images/aboutpage/s2.png"
      alt="Our Story - Innovation"
      width={600}
      height={400}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
      <h3 className="text-white text-lg font-semibold">Innovation</h3>
      <p className="text-white text-sm">Refining materials and anchoring systems for faster, cleaner, and longer-lasting installations.</p>
    </div>
  </div>

  {/* Modern Living */}
  <div className="group relative flex-1 overflow-hidden rounded-xl shadow-sm">
    <Image
      src="/images/aboutpage/s3.png"
      alt="Our Story - Modern Living"
      width={600}
      height={400}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
      <h3 className="text-white text-lg font-semibold">Modern Living</h3>
      <p className="text-white text-sm">Elegant and safe solutions that enhance homes and high-rises while preserving open views.</p>
    </div>
  </div>
</div>


        </section>
        </GsapReveal>

        <GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">
        Why Invisible Grills?
      </h2>
      <p className="mt-3 text-gray-600 max-w-3xl">
        Invisible grills use high-tensile stainless steel cables and discreet anchoring to protect without visual bulk. They maintain natural light and views, reduce maintenance, and suit contemporary interiors and façades.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
          <div className="absolute -top-6 left-6 bg-teal-100 text-teal-700 w-12 h-12 flex items-center justify-center rounded-full shadow-md text-xl font-bold">
            🎨
          </div>
          <h4 className="text-lg font-semibold text-teal-700 mt-4">Aesthetic Minimalism</h4>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            Clean lines and near-invisible presence complement modern spaces.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
          <div className="absolute -top-6 left-6 bg-teal-100 text-teal-700 w-12 h-12 flex items-center justify-center rounded-full shadow-md text-xl font-bold">
            🛡️
          </div>
          <h4 className="text-lg font-semibold text-teal-700 mt-4">Engineered Safety</h4>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            304/316 grade SS cables, securely anchored, child-safe spacing.
          </p>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
          <div className="absolute -top-6 left-6 bg-teal-100 text-teal-700 w-12 h-12 flex items-center justify-center rounded-full shadow-md text-xl font-bold">
            ⏱️
          </div>
          <h4 className="text-lg font-semibold text-teal-700 mt-4">Practical Longevity</h4>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            Corrosion resistance and low upkeep for urban and coastal environments.
          </p>
        </div>
      </div>
    </div>
  </section>
</GsapReveal>


        {/* Our Team */}
<GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Our Team</h2>
        <p className="mt-3 text-gray-600">Engineers, installers, and customer success—aligned on quality and care.</p>
      </div>

      {/* Team Grid */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="relative rounded-2xl border border-gray-200 p-6 text-center bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 group overflow-hidden"
          >
            {/* Avatar */}
            <div className="mx-auto relative h-24 w-24 rounded-full bg-gray-200 ring-4 ring-teal-100 shadow-md overflow-hidden">
              {/* Optional: Replace with <Image src="/teamX.png" ... /> */}
            </div>

            {/* Name */}
            <h4 className="mt-4 font-semibold text-gray-900 text-lg">Member {id}</h4>

            {/* Role */}
            <p className="text-sm text-teal-700 font-medium">Role / Title</p>

            {/* Short Bio */}
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Short bio or area of expertise.
            </p>

            
          </div>
        ))}
      </div>
    </div>
  </section>
</GsapReveal>


        {/* CTA */}
        <GsapReveal triggerOnView>
        <CtaSection/>
        </GsapReveal>

      </main>
    </div>
  )
}

export default AboutPage
