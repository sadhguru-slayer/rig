import React from 'react'

const WhyChooseUs = () => {
  return (
    <section id="why" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">
            Why Choose Us
          </h2>
          <p className="mt-3 text-gray-600">
            We specialize in premium invisible grills engineered for safety, durability, and seamless aesthetics.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-lg font-medium text-gray-900">Traditional Grills</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 list-disc list-inside">
              <li>Bulky bars obstruct views and natural light</li>
              <li>Rust and paint maintenance over time</li>
              <li>Visual heaviness impacts façade aesthetics</li>
              <li>Fixed grid patterns may limit design options</li>
            </ul>
          </div>

          <div className="rounded-xl bg-teal-50 border border-teal-200 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-lg font-medium text-teal-700">Invisible Grills</h3>
            <ul className="mt-4 space-y-3 text-sm text-teal-900 list-disc list-inside">
              <li>Near-invisible cables preserve panoramic views</li>
              <li>304/316 SS cables resist corrosion</li>
              <li>Minimal visual footprint, modern look</li>
              <li>Flexible spacing and custom configurations</li>
            </ul>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h4 className="font-medium text-teal-700">Aesthetics</h4>
            <p className="mt-2 text-sm text-gray-600">
              Clean lines and unobstructed views enhance interiors and exteriors.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h4 className="font-medium text-teal-700">Safety</h4>
            <p className="mt-2 text-sm text-gray-600">
              High-tensile SS cables and reliable anchoring for child-safe protection.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h4 className="font-medium text-teal-700">Practicality</h4>
            <p className="mt-2 text-sm text-gray-600">
              Low maintenance, quick installation, easy to clean and inspect.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
