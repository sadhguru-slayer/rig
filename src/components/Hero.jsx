import React from "react";
import Link from "next/link";
import Image from "next/image";
const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-fit h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-teal-50 to-sky-100"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Text Section */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-white/70 px-4 py-1.5 text-sm font-medium text-teal-700 backdrop-blur-sm shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
            Premium Invisible Grills • Safety Meets Design
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Unobstructed Views.
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent">
              Uncompromised Safety.
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
            Elevate your living spaces with sleek, durable, and rust-proof
            invisible grills — engineered with high-tensile SS cables and
            precision locking systems for ultimate safety and elegance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200/30 hover:from-teal-700 hover:to-sky-600 transition-all duration-300"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/benefits"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-teal-700 hover:bg-teal-50 hover:border-teal-400 transition-all duration-300"
            >
              See Benefits
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-500 font-medium">
            <Feature text="Child-safe" />
            <Feature text="Corrosion-resistant" />
            <Feature text="Low maintenance" />
            <Feature text="Quick installation" />
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-2xl scale-105 blur-2xl transition-transform duration-500 group-hover:scale-110"></div>
                   <Image
              src="/images/premium_apartment.png" // image placed in public/g2.png
              alt="Invisible Grill"
              width={800} // intrinsic width
              height={600} // intrinsic height
              priority // loads immediately for better LCP
              className="relative z-10 w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-2xl shadow-teal-100/40 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
        </div>
      </div>
    </section>
  );
};

// Small reusable feature chip
const Feature = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
    <span>{text}</span>
  </div>
);

export default Hero;
