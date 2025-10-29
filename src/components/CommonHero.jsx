import React from 'react'

const CommonHero = ({
  eyebrow = '',
  title,
  subtitle,
  primaryCta = { label: 'Get a Quote', href: '/#contact' },
  secondaryCta = null, // { label, href }
  mediaNote = 'Placeholder for hero media',
}) => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:items-center">
        <div>
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mt-4 text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight text-teal-700">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-gray-600 text-base sm:text-lg">{subtitle}</p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryCta ? (
                <a href={primaryCta.href} className="inline-flex rounded-md bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 transition duration-300 ease-in-out">
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a href={secondaryCta.href} className="inline-flex rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50 text-teal-700 hover:border-teal-300">
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
          <p className="mt-2 text-xs text-gray-500">{mediaNote}</p>
        </div>
      </div>
    </section>
  )
}

export default CommonHero
