import React from 'react'
import CtaSection from '@/components/CtaSection'
import GsapReveal from '@/components/GsapReveal'
import CommonHero from '@/components/CommonHero'
import Image from 'next/image'
import OurPartners from '@/components/OurPartners'
import { Target, Eye, ShieldCheck, HeartHandshake, Lightbulb, PenTool } from 'lucide-react'

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
          <section className="py-20 lg:py-28 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-50 rounded-full -z-10 blur-2xl opacity-60"></div>
                  <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Who We Are</h2>
                  <h3 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Architects of <span className="text-teal-600">Invisible Safety</span>
                  </h3>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    We are a collective of engineers, designers, and safety experts dedicated to transforming how safety is integrated into modern homes.
                  </p>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Traditional grills often compromise the beauty of a space. At RIG, we believe safety shouldn't come at the cost of aesthetics. Our invisible grills are designed to be strong yet unobtrusive, ensuring your loved ones are protected while your view remains boundless.
                  </p>

                  <div className="mt-8 flex gap-4">
                    <div className="flex flex-col border-l-2 border-teal-200 pl-4">
                      <span className="text-2xl font-bold text-teal-700">500+</span>
                      <span className="text-sm text-gray-500">Projects Delivered</span>
                    </div>
                    <div className="flex flex-col border-l-2 border-teal-200 pl-4">
                      <span className="text-2xl font-bold text-teal-700">100%</span>
                      <span className="text-sm text-gray-500">Safety Record</span>
                    </div>
                  </div>
                </div>

                <div className="relative lg:h-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
                    <Image
                      alt='Who are we?'
                      width={600}
                      height={500}
                      src='/images/aboutpage/whoarewe_illustration.png'
                      className="w-full h-auto object-cover transform transition-transform duration-700"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full -z-10 blur-3xl opacity-50"></div>
                </div>
              </div>
            </div>
          </section>
        </GsapReveal>

        {/* Mission & Vision */}
        <GsapReveal triggerOnView>
          <section className="py-20 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Mission */}
                <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                      <Target size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      To enable safer living spaces without compromising on natural light, ventilation, or modern design. We strive to deliver engineering-grade protection through precise installation and superior materials.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                      <Eye size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      To become the most trusted name in invisible safety systems across the region, setting the industry benchmark for quality, durability, and aesthetic integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </GsapReveal>

        {/* Core Values - The "Something Great" */}
        <GsapReveal triggerOnView>
          <section className="py-20 lg:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Our DNA</h2>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Drives Us</h3>
                <p className="mt-4 text-gray-600">
                  Our core values define how we work, how we build, and how we serve our customers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: ShieldCheck, title: 'Uncompromised Safety', desc: 'We never cut corners. Every cable, anchor, and fitting is tested to meet rigorous safety standards.' },
                  { icon: PenTool, title: 'Precision Craft', desc: 'Installation is an art. Our technicians are trained to ensure perfect tension and alignment.' },
                  { icon: Lightbulb, title: 'Innovation', desc: 'We constantly explore new materials and methods to make our grills stronger and less visible.' },
                  { icon: HeartHandshake, title: 'Customer First', desc: 'From the first call to the final inspection, your peace of mind is our top priority.' }
                ].map((value, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                    <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-teal-600 mb-4 transition-transform duration-300">
                      <value.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{value.title}</h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>

        {/* Our Story */}
        <GsapReveal triggerOnView>
          <section className="py-20 
bg-gradient-to-b from-white to-teal-50
          text-white relative overflow-hidden">

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:items-center mb-16">
                <div>
                  <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm">Our Journey</h2>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">From a Simple Idea to a Safety Standard</h3>
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                    Born from a background in architecture and structural safety, we noticed a gap in the market: homeowners were forced to choose between safety (bulky iron grills) and aesthetics (open balconies).
                  </p>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    We set out to bridge this gap. RIG was founded with a singular purpose—to provide a safety solution that disappears. Over the years, we have refined our materials, perfected our anchoring systems, and streamlined our installation process to deliver a product that is as durable as it is beautiful.
                  </p>
                </div>
                <div className="lg:text-right">
                  <p className="text-xl font-medium text-teal-600 italic">
                    "We didn't just want to build grills; we wanted to give people their views back."
                  </p>
                  <p className="mt-2 text-teal-400 font-semibold">— Founder, RIG</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Origins */}
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg border border-white/10">
                  <Image
                    src="/images/aboutpage/s1.png"
                    alt="Our Story - Origins"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-lg font-semibold translate-y-2 transition-transform duration-300">The Beginning</h3>
                    <p className="text-gray-300 text-sm mt-1 opacity-0 transition-opacity duration-300 delay-75">Identifying the need for modern safety.</p>
                  </div>
                </div>

                {/* Innovation */}
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg border border-white/10">
                  <Image
                    src="/images/aboutpage/s2.png"
                    alt="Our Story - Innovation"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-lg font-semibold translate-y-2 transition-transform duration-300">Innovation</h3>
                    <p className="text-gray-300 text-sm mt-1 opacity-0 transition-opacity duration-300 delay-75">Engineering 316-grade stainless steel solutions.</p>
                  </div>
                </div>

                {/* Modern Living */}
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg border border-white/10">
                  <Image
                    src="/images/aboutpage/s3.png"
                    alt="Our Story - Modern Living"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-lg font-semibold translate-y-2 transition-transform duration-300">Today</h3>
                    <p className="text-gray-300 text-sm mt-1 opacity-0 transition-opacity duration-300 delay-75">Protecting thousands of homes across the city.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-24 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl"></div>

          </section>
        </GsapReveal>

        {/* Partners */}
        <GsapReveal triggerOnView>
          <OurPartners />
        </GsapReveal>

        {/* CTA */}
        <GsapReveal triggerOnView>
          <CtaSection />
        </GsapReveal>

      </main>
    </div>
  )
}

export default AboutPage
