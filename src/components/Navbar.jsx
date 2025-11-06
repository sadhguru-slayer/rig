"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; // Importing social icons from react-icons
import { LinkIcon } from '@heroicons/react/outline'; // Import Heroicons' LinkIcon (you can also import others as needed)

const Navbar = ({
  variant = "light",
  showUtilityBar = true,
  phone = "+91 96764 91117",
  email = "sales@invisiblegrills.example",
  socials = [
  { label: "Instagram", href: "https://www.instagram.com/invisiblegrills/" },
  { label: "Facebook", href: "https://www.facebook.com/invisiblegrills" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/invisiblegrills/" },
],

  language = "EN",
  cta = { label: "Get Quote", href: "#cta" },
}) => {
  const pathname = usePathname()
  const [isUtilityBarVisible, setUtilityBarVisible] = useState(showUtilityBar)
  const toggleUtilityBar = () => setUtilityBarVisible(!isUtilityBarVisible)
const socialIcons = {
  Instagram: <FaInstagram className="h-4 w-4 text-white" />,
  Facebook: <FaFacebookF className="h-4 w-4  text-white" />,
  LinkedIn: <FaLinkedinIn className="h-4 w-4 text-white" />,
};
  const isDark = variant === 'dark'

  // Scroll-aware state for subtle navbar animation
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Base header styling with smooth transitions
  const headerClass = `
    sticky top-0 z-40 w-full bg-white border-b transition-all duration-300
    ${isDark
      ? 'bg-gray-900/40 border-gray-800 backdrop-blur-sm'
      : scrolled
        ? 'bg-white/70 border-gray-200 backdrop-blur-md shadow-sm'
        : 'bg-gray-50/80 border-gray-200 backdrop-blur-md'
    }
  `

  const utilLink = 'text-gray-200 hover:text-teal-200'

  const brandBox = isDark
    ? "px-4 py-1 text-xl tracking-tight rounded bg-white/10 font-bold text-white"
    : "px-4 py-1 text-xl tracking-tight rounded bg-teal-600 font-bold text-teal-100"

  const linkBase = isDark
    ? "text-sm text-white/80 hover:text-white transition duration-300 ease-in-out"
    : "text-sm text-gray-700 hover:text-teal-600 transition duration-300 ease-in-out"

  const active = isDark ? "text-white font-medium" : "text-teal-600 font-medium"

  const ctaClass = isDark
    ? "hidden sm:inline-flex rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
    : "hidden sm:inline-flex rounded-md bg-gradient-to-br from-teal-600 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition duration-300 ease-in-out"

  // Sliding underline for desktop
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const [underline, setUnderline] = useState({ left: 0, width: 0, visible: false })

  const links = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/about", label: "About", active: pathname?.startsWith("/about") },
    { href: "/services", label: "Services", active: pathname?.startsWith("/services") },
    { href: "/projects", label: "Projects", active: pathname?.startsWith("/projects") },
    { href: "/contact", label: "Contact", active: pathname?.startsWith("/contact") },
  ]

  const recalcUnderline = () => {
    const container = navRef.current
    if (!container) return
    const idx = links.findIndex(l => l.active)
    if (idx === -1 || !linkRefs.current[idx]) {
      setUnderline(u => ({ ...u, visible: false }))
      return
    }
    const linkEl = linkRefs.current[idx]
    const cRect = container.getBoundingClientRect()
    const lRect = linkEl.getBoundingClientRect()
    const left = lRect.left - cRect.left
    const width = lRect.width
    setUnderline({ left, width, visible: true })
  }

  useLayoutEffect(() => {
    recalcUnderline();
  }, [pathname, isDark])

  useEffect(() => {
    const onResize = () => recalcUnderline()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 👇 Mobile menu state
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className={headerClass} data-scrolled={scrolled ? 'true' : 'false'}>
      {isUtilityBarVisible && (
        <div className="bg-teal-700 w-full transition-all duration-300">
          <div className="
            mx-auto max-w-7xl w-full 
            px-4 sm:px-6 lg:px-8 
            flex flex-wrap items-center justify-between 
            text-xs text-gray-200 h-auto py-2 sm:py-0 min-h-8
          ">
            {/* Left side: contact info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0">
              <Link href={`tel:${phone.replace(/\s+/g, '')}`} className={`${utilLink} flex items-center gap-1`}>
                <span className="hidden sm:inline">📞</span>{phone}
              </Link>
              <Link href={`mailto:${email}`} className={`${utilLink} truncate max-w-[180px] sm:max-w-none`}>
                {email}
              </Link>
            </div>
    
            {/* Right side: socials, language, close */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
              {/* Socials */}
              <div className="flex items-center gap-4">
    {socials.map((social, i) => (
      <Link key={i} href={social.href} aria-label={social.label}>
        {socialIcons[social.label]} {/* Dynamically render the appropriate icon */}
      </Link>
    ))}
  </div>
    
    
              {/* Close button */}
              <button
                onClick={toggleUtilityBar}
                className={`ml-2 sm:ml-4 ${utilLink}`}
                aria-label="Close utility bar"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-[padding] duration-300">
        <div className={`flex ${scrolled ? 'h-14' : 'h-16'} items-center justify-between transition-all duration-300`}>
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-8 w-8" />
            <span className={brandBox}>RIG<span className="w-1 h-1 bg-teal-900 rounded-full inline-block ml-1"></span></span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8 relative">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={el => { linkRefs.current[i] = el }}
                className={`${linkBase} ${l.active ? active : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1 h-0.5 bg-teal-600 transition-all duration-300 ease-out ${underline.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: underline.left, width: underline.width }}
            />
          </nav>

          {/* CTA + Mobile button */}
          <div className="flex items-center gap-3">
            <Link href="#cta" className={ctaClass}>
              Get Quote
            </Link>
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden inline-flex items-center justify-center rounded-md p-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition`}
              aria-label="Toggle menu"
            >
              <svg className={`h-5 w-5 text-teal-700`} viewBox="0 0 24 24" fill="none">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 👇 Mobile Menu (collapsible) */}
        {isMobileMenuOpen && (
          <div
            className={`
              absolute ${isUtilityBarVisible?'top-28':'top-16'} left-0 w-full
              bg-white shadow-lg border-t border-gray-200
              md:hidden flex flex-col gap-3 py-4 px-4
              z-50
              animate-fadeIn
            `}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)} // close on click
                className={`${linkBase} ${l.active ? active : ""} block py-2`}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href={cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              {cta.label}
            </Link>
          </div>
        )}

      </div>
    </header>
  )
}

export default Navbar