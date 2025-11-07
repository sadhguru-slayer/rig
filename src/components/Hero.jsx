'use client'
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: -20 })
        .from(".hero-title", { opacity: 0, x: -30 }, "-=0.5")
        .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.2 }, "-=0.4")
        .from(".hero-feature", { opacity: 0, y: 10, stagger: 0.15 }, "-=0.6")
        .from(".hero-image", { opacity: 0, scale: 0.95 }, "-=0.7");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-teal-50 to-sky-100"
    >
      {/* Background floating shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-200 rounded-full opacity-20 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-200 rounded-full opacity-20 animate-pulse-slow pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Text Section */}
        <div className="relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-white/70 px-4 py-1.5 text-sm font-medium text-teal-700 backdrop-blur-sm shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
            Premium Invisible Grills • Safety Meets Design
          </div>

          <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Unobstructed Views.
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent">
              Uncompromised Safety.
            </span>
          </h1>

          <p className="hero-subtitle mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
            Elevate your living spaces with sleek, durable, and rust-proof invisible grills — engineered with high-tensile SS cables and precision locking systems for ultimate safety and elegance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="hero-cta inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200/30 hover:from-teal-700 hover:to-sky-600 transition-all duration-300"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/benefits"
              className="hero-cta inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-teal-700 hover:bg-teal-50 hover:border-teal-400 transition-all duration-300"
            >
              See Benefits
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-500 font-medium">
            {["Child-safe", "Corrosion-resistant", "Low maintenance", "Quick installation"].map((text, i) => (
              <div key={i} className="hero-feature flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative group hero-image">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-2xl scale-105 blur-2xl transition-transform duration-500 group-hover:scale-110"></div>
          <Image
            src="/images/premium_apartment.png"
            alt="Invisible Grill"
            width={800}
            height={600}
            priority
            className="relative z-10 w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-2xl shadow-teal-100/40 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 90vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
