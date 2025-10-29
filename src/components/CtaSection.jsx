import React from 'react'
import Link from 'next/link'
const CtaSection = () => {
  return (
    <section id="cta" className="py-16 lg:py-24 bg-teal-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/5 p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-white">Ready to secure your view?</h3>
              <p className="mt-3 text-teal-50">
                Get a free consultation and quote tailored to your balcony or window dimensions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-md bg-white px-5 py-3 text-sm font-medium text-teal-700 hover:bg-teal-50">
                Request Free Quote
              </Link>
              <Link href="/projects" className="inline-flex rounded-md border border-white/70 px-5 py-3 text-sm font-medium text-white hover:bg-white/10">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
