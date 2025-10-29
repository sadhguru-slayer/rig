import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
          <Link href="/" className="inline-flex items-center gap-2">
          <span className="px-4 py-1 text-xl tracking-tight rounded bg-teal-700 font-bold text-white">RIG<span className="w-1 h-1 bg-teal-500 rounded-full inline-block ml-1"></span></span>
        </Link>
            <p className="mt-3 text-sm text-gray-600">
              Premium invisible grill solutions for modern homes and high-rises.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-teal-700">Company</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-700">About</Link></li>
              <li><Link href="/#benefits" className="hover:text-teal-700">Services</Link></li>
              <li><Link href="/#projects" className="hover:text-teal-700">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-teal-700">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-teal-700">Support</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-teal-700">Warranty</Link></li>
              <li><Link href="/" className="hover:text-teal-700">Installation</Link></li>
              <li><Link href="/" className="hover:text-teal-700">Maintenance</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-teal-700">Get in touch</h5>
            <p className="mt-3 text-sm text-gray-600">sales@invisiblegrills.example</p>
            <p className="text-sm text-gray-600">+91 90000 00000</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-xs text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} InvisibleGrills. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-teal-700">Privacy</Link>
            <Link href="/" className="hover:text-teal-700">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
