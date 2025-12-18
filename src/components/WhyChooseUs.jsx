import React from "react";
import { FiEye, FiShield, FiStar } from "react-icons/fi";

const WhyChooseUs = () => {
  return (
    <section
      id="why"
      className="relative py-20 bg-gradient-to-b from-white to-teal-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-teal-700 tracking-tight">
            Why <span className="text-gray-900">RIGrills?</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Built for modern living — delivering safety, elegance, and clarity
            without compromise.
          </p>
        </div>

        {/* Others vs RIGrills */}
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-6">

          {/* Others */}
          <div className="flex-1 w-full max-w-md rounded-2xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              Others
            </h3>
            <p className="text-center text-xs text-gray-500 mt-1">
              Conventional providers
            </p>

            <ul className="mt-6 space-y-3 text-gray-600 text-sm list-disc list-inside">
              <li>Generic designs with visual obstruction</li>
              <li>Limited material and spacing options</li>
              <li>Inconsistent finishing and alignment</li>
              <li>Higher maintenance over time</li>
            </ul>
          </div>

          {/* VS */}
          <div className="relative flex items-center justify-center">
            <span className="text-3xl font-bold text-teal-700 bg-white rounded-full px-4 py-2 shadow-lg border border-teal-200 z-10">
              VS
            </span>
            <div className="absolute w-px h-24 bg-gradient-to-b from-teal-200 via-teal-400 to-teal-200 hidden lg:block"></div>
          </div>

          {/* RIGrills */}
          <div className="flex-1 w-full max-w-md rounded-2xl bg-gradient-to-br from-teal-800 to-teal-500 text-white p-8 shadow-xl hover:shadow-2xl transition-all transform lg:-translate-y-2">
            <h3 className="text-xl font-semibold text-center">
              RIGrills
            </h3>
            <p className="text-center text-xs text-teal-100 mt-1">
              Designed for modern spaces
            </p>

            <ul className="mt-6 space-y-3 text-sm list-disc list-inside">
              <li>Clean, minimal designs that preserve views</li>
              <li>Engineered materials with precise spacing</li>
              <li>Professional installation and finish</li>
              <li>Low maintenance, long-term reliability</li>
            </ul>
          </div>
        </div>

        {/* Brand Benefits */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <FiEye className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">
                Uninterrupted Views
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Thoughtfully designed solutions that enhance openness and natural
              light across balconies, windows, and staircases.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <FiShield className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">
                Engineered Protection
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Built with high-quality materials and proven systems that meet
              real-world safety needs.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <FiStar className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">
                Effortless Living
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Clean finishes, minimal upkeep, and reliable performance —
              solutions that simply work.
            </p>
          </div>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute -top-24 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl"></div>
    </section>
  );
};

export default WhyChooseUs;
