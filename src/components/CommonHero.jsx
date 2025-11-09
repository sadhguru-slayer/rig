'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CommonHero = ({
  eyebrow = "",
  title,
  subtitle = "",
  primaryCta = { label: "Get a Quote", href: "/#contact" },
  secondaryCta = null,
  mediaSrc = null, // will be used as background banner
  mediaAlt = "Hero background",
  mediaNote = "Hero section",
}) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.set(self.selector(".hero-eyebrow"), { autoAlpha: 0, y: -20 });
      gsap.set(self.selector(".hero-title"), { autoAlpha: 0, y: 30 });
      gsap.set(self.selector(".hero-subtitle"), { autoAlpha: 0, y: 20 });
      gsap.set(self.selector(".hero-cta"), { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
      tl.to([
        self.selector(".hero-eyebrow"),
        self.selector(".hero-title"),
        self.selector(".hero-subtitle"),
        self.selector(".hero-cta")
      ], {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out"
      });

      // Subtle parallax zoom
      gsap.to(self.selector("img"), {
        scale: 1.05,
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen max-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {mediaSrc ? (
          <Image
            src={mediaSrc}
            alt={mediaAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-sky-50 to-white flex items-center justify-center text-gray-400 text-sm">
            {mediaNote}
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 py-16 text-center">
        {eyebrow && (
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white shadow-lg mb-4">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            {eyebrow}
          </div>
        )}

        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="hero-subtitle mt-4 text-gray-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="hero-cta mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-sky-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-teal-500/30 hover:from-teal-700 hover:to-sky-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonHero;
