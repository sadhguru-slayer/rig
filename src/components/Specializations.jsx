'use client';
import { usePathname } from 'next/navigation';
import services from '../data/services';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const SpecializationsComponent = () => {
  const pathname = usePathname();
  const isServicePage = pathname === '/services';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);   // ✅ FIXED
  const [error, setError] = useState(null);        // ✅ FIXED



  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/service/");
        const data = await res.json();
        if (data.success) {
          setServices(data.data || []);

        } else {
          setError(data.error || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-700">
            Our Specializations
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore our range of safety and performance-driven solutions — engineered to protect, perform, and impress.
          </p>
        </div>

        {/* Services Grid - 2 per row */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={service.imageUrl || '/logo_c.png'}
                  alt={service.title}
                  fill                  
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-teal-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{service.shortDescription}</p>

                {/* Features + Specifications */}
                <div className="flex flex-col gap-6">

                  {/* Key Features Grid */}
                  <div className="flex-1 bg-gradient-to-r from-teal-700/30 via-teal-700/20 to-sky-700/20 shadow-inner p-4 rounded-lg">
                    <h4 className="text-teal-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Key Features
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service?.features?.slice(0, 4).map((feature, index) => (
                        <div
                          key={index}
                          className="border bg-white border-gray-200 rounded-lg p-2 flex items-center gap-2 hover:shadow-md transition-shadow duration-200"
                        >
                          <FiCheckCircle className="text-teal-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature.title}</span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-teal-600 text-xs font-medium mt-1">+ More</div>
                      )}
                    </div>
                  </div>

                  {/* Specifications Vertical */}
                  <div className="flex-1  border-gray-100">
                    <h4 className="text-teal-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Specifications
                    </h4>
                    <ul className="space-y-1 text-gray-600 text-sm list-disc list-inside marker:text-teal-600">
                      {service.specifications.slice(0, 4).map((spec, i) => (
                        <li key={i}>
                          <span className="font-medium text-gray-800 capitalize">
                            {spec.key.replace(/([A-Z])/g, ' $1')}:
                          </span>{' '}
                          {spec.value}
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={`services/${service.slug}`}
                    className="inline-flex items-center text-teal-700 font-medium hover:text-teal-500 transition-colors"
                  >
                    Learn More
                    <FiArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

const Specializations = () => (
  <Suspense
    fallback={
      <div className="text-center py-8 h-screen text-teal-500">Loading...</div>
    }
  >
    <SpecializationsComponent />
  </Suspense>
);

export default Specializations;
