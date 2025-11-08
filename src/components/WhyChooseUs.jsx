import React from "react";
import { FiEye, FiShield, FiStar } from "react-icons/fi"; // Feather-style icons

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
            Why Choose <span className="text-gray-900">Invisible Grills?</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Experience the perfect blend of safety, elegance, and unobstructed beauty — rethinking the way grills protect and enhance your space.
          </p>
        </div>

{/* VS Comparison Section */}
<div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-4">
  {/* Traditional Grills */}
  <div className="flex-1 w-full rounded-2xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 max-w-md">
    <h3 className="text-xl font-semibold text-gray-900 text-center">
      Traditional Grills
    </h3>
    <ul className="mt-5 space-y-3 text-gray-600 text-sm list-disc list-inside">
      <li>Bulky bars block natural light</li>
      <li>Prone to rust and paint chipping</li>
      <li>Visually heavy and outdated</li>
      <li>Limited design flexibility</li>
    </ul>
  </div>

  {/* VS Divider */}
  <div className="relative flex items-center justify-center h-full">
    <span className="text-3xl font-bold text-teal-700 bg-white rounded-full px-4 py-2 shadow-lg border border-teal-200 z-10">
      VS
    </span>
    {/* Decorative line behind VS */}
    <div className="absolute w-px h-24 bg-gradient-to-b from-teal-200 via-teal-400 to-teal-200 -z-0 hidden lg:block"></div>
  </div>

  {/* Invisible Grills */}
  <div className="flex-1 rounded-2xl bg-gradient-to-br from-teal-800 to-teal-400 text-white p-8 shadow-md hover:shadow-2xl transition-all duration-300 max-w-md">
    <h3 className="text-xl font-semibold text-white text-center">
      Invisible Grills
    </h3>
    <ul className="mt-5 space-y-3 text-sm list-disc list-inside">
      <li>Crystal-clear, unobstructed views</li>
      <li>Rust-proof 304/316 SS cables</li>
      <li>Modern, minimal, and elegant design</li>
      <li>Flexible spacing for custom needs</li>
    </ul>
  </div>
</div>


        {/* Benefits Cards */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FiEye className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">Aesthetics</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Clean lines and unobstructed views that elevate your interiors and exteriors.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FiShield className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">Safety</h4>
            </div>
            <p className="text-gray-600 text-sm">
              High-tensile SS cables and locking systems ensure ultimate child-safe protection.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <FiStar className="text-teal-600 w-6 h-6" />
              <h4 className="font-semibold text-teal-700">Practicality</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Low maintenance, quick installation, and easy to clean — built for real living.
            </p>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -top-24 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl"></div>
    </section>
  );
};

export default WhyChooseUs;
