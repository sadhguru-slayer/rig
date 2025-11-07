'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const CommonHero = ({
  eyebrow = '',
  title,
  subtitle,
  primaryCta = { label: 'Get a Quote', href: '/#contact' },
  secondaryCta = null,
  mediaSrc = null,
  mediaAlt = 'Hero media',
  mediaNote = 'Placeholder for hero media',
}) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

      if (heroRef.current) {
        tl.from('.hero-eyebrow', { opacity: 0, y: -10 })
          .from('.hero-title', { opacity: 0, x: -20 }, '-=0.5')
          .from('.hero-subtitle', { opacity: 0, y: 10 }, '-=0.5')
          .from('.hero-cta', { opacity: 0, y: 10, stagger: 0.2 }, '-=0.5')
          .from('.hero-media', { opacity: 0, scale: 0.95 }, '-=0.6');
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-teal-50 via-sky-50 to-white overflow-hidden min-h-[85vh] flex items-center"
    >
      {/* Background decorative shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-100 rounded-full opacity-30 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-200 rounded-full opacity-20 animate-pulse-slow pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 lg:items-center relative z-10">
        {/* Left Content */}
        <div>
          {eyebrow && (
            <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700 tracking-wider uppercase">
              {eyebrow}
            </div>
          )}

          <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-700 leading-tight tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="hero-subtitle mt-4 text-gray-700 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="hero-cta inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="hero-cta inline-flex items-center justify-center rounded-xl border-2 border-teal-400 px-8 py-4 text-base font-medium text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right Media */}
        <div className="hero-media relative w-full flex justify-center lg:justify-end">
          {mediaSrc ? (
            <div className="relative w-full bg-red-300 lg:w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-teal-800/40 hover:shadow-teal-800/60 transition-all duration-500 hover:scale-[1.02]">
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
                placeholder="blur"
                blurDataURL="/low_res.png"
                priority
                draggable={false}
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full lg:w-[500px] rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
              {mediaNote}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommonHero;
