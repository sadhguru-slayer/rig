import React from 'react'
import Image from 'next/image'
const projects = [
  { id: 1, imgSource:'/images/balcony2.png', title: 'High-Rise Balcony, Bengaluru', desc: 'Invisible grills installed across 12 balconies, enhancing views and safety.', cta: 'View Project Details' },
  { id: 2, imgSource:'/images/apartments.png', title: 'Premium Apartment, Hyderabad', desc: 'Discreet window grills preserving natural light in living spaces.', cta: 'View Project Details' },
  { id: 3, imgSource:'/images/high_rise.png', title: 'Seaside Residence, Mumbai', desc: '316-grade SS cables for superior corrosion resistance in coastal air.', cta: 'View Project Details' },
]

const KeyProjects = () => {
  return (
    <section id="projects" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Key Projects</h2>
          <p className="mt-3 text-gray-600">Select installations demonstrating performance, finish, and longevity.</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              {/* Image placeholder */}
              <Image
              alt={`${p.title}`}
              src={p.imgSource}
              width={200}
              height={400}

              className=" aspect-[4/3] w-full bg-gray-100 border-b border-gray-200" />
              <div className="p-5">
                <h3 className="font-medium text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
                <div className="mt-4">
                  <button className="inline-flex items-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
                    {p.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyProjects
