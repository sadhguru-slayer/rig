'use client';
import { usePathname } from 'next/navigation';
import services from '../data/services'; // Assuming your services.js file has the necessary data
import Link from 'next/link';
import { Suspense } from 'react';

const SpecializationsComponent = () => {
  const pathname = usePathname();
  const isServicePage = pathname === '/services';  // Ensure we match the correct route

  // Define the services layout based on the columns you mentioned
  const specializationGroups = [
    [services[0], services[1]],  // Invisible Grills, Bird Safety Nets (First Row)
    [services[2], services[3]],  // Ceiling Clothes Hangers, Balcony Safety Nets (Second Row)
    [services[4]]               // Cricket Practice Nets (Third Row)
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-teal-700 mb-8 text-center">
          Our Specializations
        </h2>

        {/* Grid Layout */}
        <div className="flex flex-col gap-4">
          {/* First Row: 50/50 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specializationGroups[0].map((service) => (
              <div
                key={service.id}
                className={`relative group rounded-4xl overflow-hidden ${isServicePage ? 'h-80' : ''}`} // Apply increased height on services page
              >
                {/* Service Image as Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:opacity-90"
                  style={{
                    backgroundImage: `url('${service.imageUrl}')`
                  }}
                ></div>

                {/* Service Content */}
                <div className="relative flex flex-col  justify-end h-full z-10 text-center p-6 bg-black/20 bg-opacity-50 transition-all duration-300 group-hover:bg-black/60 text-gray-100 group-hover:text-white">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm">{service.shortDescription}</p> {/* Use description if on service page */}
                  <Link href={service.moreInfoUrl}>
                    <p className="mt-4 inline-block text-sm text-teal-300 hover:text-teal-500 transition-colors duration-200">
                      Learn more →
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row: 40/60 */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {specializationGroups[1].map((service, index) => (
              <div
                key={service.id}
                className={`relative group ${index === 0 ? 'col-span-2' : 'col-span-3'} rounded-4xl overflow-hidden ${isServicePage ? 'h-80' : ''}`} // Apply increased height on services page
              >
                {/* Service Image as Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:opacity-90"
                  style={{
                    backgroundImage: `url('${service.imageUrl}')`
                  }}
                ></div>

                {/* Service Content */}
                <div className="relative flex flex-col justify-end h-full z-10 text-center p-6 bg-black/20 bg-opacity-50 transition-all duration-300 group-hover:bg-black/60 text-gray-100 group-hover:text-white">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm">{service.shortDescription}</p> {/* Use description if on service page */}
                  <Link href={service.moreInfoUrl}>
                    <p className="mt-4 inline-block text-sm text-teal-300 hover:text-teal-500 transition-colors duration-200">
                      Learn more →
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Third Row: 100% */}
          <div className="grid grid-cols-1 gap-4">
            {specializationGroups[2].map((service) => (
              <div
                key={service.id}
                className={`relative group rounded-4xl overflow-hidden ${isServicePage ? 'h-80' : ''}`} // Apply increased height on services page
              >
                {/* Service Image as Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:opacity-80"
                  style={{
                    backgroundImage: `url('${service.imageUrl}')`
                  }}
                ></div>

                {/* Service Content */}
                <div className="relative flex flex-col  justify-end h-full z-10 text-center p-6 bg-black/20 bg-opacity-50 transition-all duration-300 group-hover:bg-black/60 text-gray-100 group-hover:text-white">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm">{service.shortDescription}</p> {/* Use description if on service page */}
                  <Link href={service.moreInfoUrl}>
                    <p className="mt-4 inline-block text-sm text-teal-300 hover:text-teal-500 transition-colors duration-200">
                      Learn more →
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const Specializations = () => (
  <Suspense fallback={<div className="text-center py-8 h-screen text-teal-500">Loading...</div>}>
    <SpecializationsComponent />
  </Suspense>
);

export default Specializations;
