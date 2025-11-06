import React from 'react'
import Image from "next/image";

const AboutUs = () => {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
          <div>
            <h2 className="text-3xl text-teal-700 sm:text-4xl font-semibold tracking-tight">Why Invisible Grills?</h2>
            <p className="mt-4 text-gray-600">
              Our invisible grills combine safety with panoramic views. Designed for balconies, windows,
              and facades—ideal for homes, high-rises, and commercial spaces.
            </p>

            <dl className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-200 p-5">
                <dt className="font-medium text-teal-700">High-Tensile Cables</dt>
                <dd className="mt-1 text-sm text-gray-600">304/316 grade stainless steel with up to 400kg tensile strength.</dd>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <dt className="font-medium text-teal-700">Minimal Visual Impact</dt>
                <dd className="mt-1 text-sm text-gray-600">Slimline wires maintain open views and natural light.</dd>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <dt className="font-medium text-teal-700">Weather & Rust Resistant</dt>
                <dd className="mt-1 text-sm text-gray-600">Built to withstand coastal and urban environments.</dd>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <dt className="font-medium text-teal-700">Custom Fit</dt>
                <dd className="mt-1 text-sm text-gray-600">Tailored to your balcony dimensions and safety needs.</dd>
              </div>
            </dl>
          </div>


<div className="relative w-full group">
  {/* Main base image */}
  <Image
    src="/balcony.png"
    alt="Invisible Grill Main"
    width={500}
    height={300}
    priority
    className="w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-2xl shadow-teal-100/40 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
  />

  {/* Overlay image — smaller and neat */}
  <div className="absolute -top-12 -left-12 w-1/3 sm:w-1/4 lg:w-1/3 rounded-xl overflow-hidden border-4 border-white  hover:scale-105 transition-transform duration-500">
    <Image
      src="/g2.png"
      alt="Close-up Invisible Grill Detail"
      width={500}
      height={400}
      className="aspect-[4/5] w-full h-full object-cover"
    />
  </div>
</div>


        </div>
      </div>
    </section>
  )
}

export default AboutUs
