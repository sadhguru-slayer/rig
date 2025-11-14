'use client'
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Child-safe",
  "Corrosion-resistant",
  "Low maintenance",
  "Quick installation"
];

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({ defaults: { duration: 0.9, ease: "power3.out" } });

      // Initial intro animations
      gsap.set(self.selector(".banner-feature-btn"), { autoAlpha: 0 });
      gsap.set(self.selector(".banner-cta"), { autoAlpha: 0, y: 20 });
      gsap.set(self.selector(".banner-subtitle"), { autoAlpha: 0 });
      gsap.set(self.selector(".banner-title"), { autoAlpha: 0, y: 30 });
      gsap.set(self.selector(".banner-badge"), { autoAlpha: 0, y: -25, scale: 0.95 });

      tl.to([
        self.selector(".banner-badge"),
        self.selector(".banner-title"),
        self.selector(".banner-subtitle"),
        self.selector(".banner-cta"),
        self.selector(".banner-feature-btn")
      ], { 
        autoAlpha: 1, 
        y: 0, 
        scale: 1,
        duration: 0.9,
        ease: "power3.out"
      });

      // ----------- Subtle Scale Parallax on Scroll -----------
      // Image zoom
      gsap.to(self.selector("img"), {
        scale: 1.05, // slightly zoom in
        y:20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6, // smooth transition
        }
      });

      // Badge, title, subtitle scale down slightly
      gsap.to(self.selector(".banner-badge"), {
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        }
      });

      gsap.to(self.selector(".banner-title"), {
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        }
      });

      gsap.to(self.selector(".banner-subtitle"), {
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/premium_apartment.png"
          alt="Premium Invisible Grills"
          fill
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
          loading="eager"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/30"></div>
        {/* Subtle teal accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="banner-badge inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg mb-4">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
          Premium Invisible Grills • Safety Meets Design
        </div>

        {/* Main Title */}
        <h1 className="banner-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-snug sm:leading-tight md:leading-[4rem]">
          Unobstructed Views.
          <br />
          <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-sky-200 bg-clip-text text-transparent">
            Uncompromised Safety.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="banner-subtitle mt-4 text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed max-w-md sm:max-w-xl md:max-w-2xl">
          Elevate your space with sleek, rust-proof invisible grills — strong SS cables and secure locks for safety and style.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/contact"
            className="banner-cta w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-sky-500 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-xl shadow-teal-500/30 hover:from-teal-700 hover:to-sky-600 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-300 transform hover:scale-105"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Feature Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {features.map((text, i) => (
            <button
              key={i}
              type="button"
              className="banner-feature-btn cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-white/15 backdrop-blur-md shadow-lg hover:bg-white/25 hover:border-white/50 hover:shadow-xl active:scale-95 transition-all duration-200"
              style={{
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-teal-300 to-sky-300 shadow-sm"></span>
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
