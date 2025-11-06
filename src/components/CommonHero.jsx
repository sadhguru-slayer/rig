import React from 'react'
import Image from 'next/image'

const CommonHero = ({
  eyebrow = '',
  title,
  subtitle,
  primaryCta = { label: 'Get a Quote', href: '/#contact' },
  secondaryCta = null, // { label, href }
  mediaSrc = null, // optional hero image/video
  mediaAlt = 'Hero media',
  mediaNote = 'Placeholder for hero media',
}) => {
  return (
    <section className="bg-white flex items-center relative overflow-hidden min-h-fit h-[85vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:items-center">
        
        {/* Left Content */}
        <div>
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
              {eyebrow}
            </div>
          )}

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-teal-700 leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-md hover:bg-teal-700 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm sm:text-base font-medium text-teal-700 hover:bg-gray-50 hover:border-teal-300 transition-all duration-300 ease-in-out"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right Media */}
        <div className="relative">
          {mediaSrc ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-teal-100/30 transition-transform duration-500 hover:scale-[1.02]">
                  <Image
  src={mediaSrc}
  alt={mediaAlt}
  layout="fill"
  objectFit="cover"
  className="w-full h-full"
  priority // Ensures it loads immediately
  loading="eager" // Forces immediate loading for critical images
  placeholder="blur" // Adds a blurred version of the image until it's fully loaded
  blurDataURL="/low_res.png" // Low-res image for the blur effect (optional)
  draggable={false}
/>

                </div>
          ) : (
            <div className="aspect-[4/3] w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
              {mediaNote}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CommonHero
