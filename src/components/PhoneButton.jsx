import Link from 'next/link'
import React from 'react'

const PhoneButton = () => {
  return (  <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
              {/* 📞 Call Button */}
              <Link
                href="tel:+919676282296" // change to your actual number
                aria-label="Call Us"
                className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
              >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.88 19.88 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a1 1 0 0 1 1 .75 12.05 12.05 0 0 0 .65 2.27 1 1 0 0 1-.23 1L8.09 8.91a16 16 0 0 0 7 7l1.9-1.39a1 1 0 0 1 1-.12 12.05 12.05 0 0 0 2.27.65 1 1 0 0 1 .74 1v.02z" />
            </svg>
            
              </Link>
            </div>
    
  )
}

export default PhoneButton