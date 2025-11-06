import Image from 'next/image'
import React from 'react'

const items = [
  { id: 1, name: 'Aarav N.', quote: 'Flawless installation. The balcony feels open and safe for our kids.', role: 'Homeowner, Bengaluru' },
  { id: 2, name: 'Priya S.', quote: 'Minimal look, zero rust so far. Worth the investment.', role: 'Apartment Owner, Mumbai' },
  { id: 3, name: 'Rahul K.', quote: 'Quick turnaround and great service. Highly recommend.', role: 'Builder Partner, Hyderabad' },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">What Clients Say</h2>
          <p className="mt-3 text-gray-600">Real feedback from homeowners and partners.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map(t => (
            <div
  key={t.id}
  className="rounded-xl border border-sky-200 p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
>
  <div className="flex items-center gap-4">
<div className="w-14 h-14 overflow-hidden rounded-full bg-gray-200 flex-shrink-0">
  <Image
    alt={t.name}
    src={`/images/testimonials/${t.id}.png`}
    width={100}
    height={100}
    className="w-full h-full object-cover" // Ensures square and no distortion
  />
</div>

    <div>
      <p className="text-sm font-medium text-teal-700">{t.name}</p>
      <p className="text-xs text-gray-600">{t.role}</p>
    </div>
  </div>
  <blockquote className="mt-6 text-gray-900 text-sm md:text-base flex-1">“{t.quote}”</blockquote>
</div>

          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
