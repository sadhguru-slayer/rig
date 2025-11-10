import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-8 w-8" />
            <Image
  src='/logo_c.png'
  alt='RIG'
  height={400} // restrict height to navbar height
  width={400}  // optional, Next.js will auto-scale if you omit
  className="h-12 w-auto rounded-xl" // h-10 = 2.5rem ~ 40px
  priority // optional: preloads logo for better LCP
/>

            </Link>
            <p className="mt-3 text-sm text-teal-300 capitalize">
              Premium invisible grill solutions for modern homes and high-rises.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-teal-300">Company</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-teal-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-400">About</Link></li>
              <li><Link href="/#benefits" className="hover:text-teal-400">Services</Link></li>
              <li><Link href="/#projects" className="hover:text-teal-400">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-teal-400">Contact</Link></li>
            </ul>
          </div>

          

          <div>
            <h5 className="text-sm font-semibold text-teal-300">Get in touch</h5>
            <p className="mt-3 text-sm text-gray-400">reddyinvisiblegrills@gmail.com </p>
            <p className="text-sm text-gray-400">+91 9676282296</p>
          </div>
        </div>

        <div className="mt-8 border-t border-teal-600 pt-6 text-xs text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} InvisibleGrills. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-teal-400">Privacy</Link>
            <Link href="/" className="hover:text-teal-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
