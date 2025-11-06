import GsapReveal from './GsapReveal'; // Assuming GsapReveal is imported

const HowItWorks = () => {

  return (
    <GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-white relative">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">How It Works</h2>
        <p className="mt-3 text-gray-600">A clear, guided process from consultation to completion.</p>
      </div>

      {/* Process Container */}
      <div className="relative mt-10 w-full h-[500px]">
        {/* Row 1 */}
        <div className="flex justify-between">
          {/* Box 1 - Consultation */}
          <div className="w-1/2 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
            <h3 className="font-medium text-gray-900">1. Consultation</h3>
            <p className="mt-2 text-sm text-gray-600">Share your space details and requirements.</p>
          </div>

          {/* Box 2 - Site Visit */}
          <div className="w-1/2 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
            <h3 className="font-medium text-gray-900">2. Site Visit</h3>
            <p className="mt-2 text-sm text-gray-600">We assess dimensions, anchors, and safety constraints.</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between mt-10">
          {/* Box 4 - Handover & Care */}
          <div className="w-1/2 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}>
            <h3 className="font-medium text-gray-900">4. Handover & Care</h3>
            <p className="mt-2 text-sm text-gray-600">Final checks, warranty briefing, and maintenance tips.</p>
          </div>

          {/* Box 3 - Installation */}
          <div className="w-1/2 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
            <h3 className="font-medium text-gray-900">3. Installation</h3>
            <p className="mt-2 text-sm text-gray-600">Precise fitting with professional finishing and cleanup.</p>
          </div>
        </div>

        {/* Dashed Line Using Divs with clip-path */}
        <div className="absolute top-[20%] left-0 w-full h-full">
          <div className="relative">
            {/* Dashed Line from Box 1 to Box 2 */}
            <div className="dashed-line w-[50px] h-[2px] absolute top-[30%] left-[calc(50%-25px)] animate-dash" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
            <div className="dashed-line w-[50px] h-[2px] absolute top-[45%] left-[calc(50%-25px)] animate-dash" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
            <div className="dashed-line w-[50px] h-[2px] absolute top-[60%] left-[calc(50%-25px)] animate-dash" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          </div>
        </div>
      </div>
    </div>
  </section>
</GsapReveal>


  );
};

export default HowItWorks;
