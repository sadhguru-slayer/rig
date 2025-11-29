"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import GsapReveal from './GsapReveal';

const clients = [
    { id: 1, name: 'JLL', logo: '/images/partners/JLL.png' },
    { id: 2, name: 'Aparna Constructions', logo: '/images/partners/aparna.png' },
    { id: 3, name: 'Crystal', logo: '/images/partners/crystal.png' },
    { id: 4, name: 'IIT Madras', logo: '/images/partners/iit_madras.png' },
    { id: 5, name: 'Imperial Heights', logo: '/images/partners/imperial_heights.png' },
    { id: 6, name: 'KIMS Hospitals', logo: '/images/partners/kims.png' },
    { id: 7, name: 'Saket', logo: '/images/partners/saket.png' },
    { id: 8, name: 'The Bridge School', logo: '/images/partners/the_bridge_school.png' },
    { id: 9, name: 'Vasavi Groups', logo: '/images/partners/vasavi_groups.png' },
];

const OurPartners = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Clone the content for seamless loop
        const content = marquee.innerHTML;
        marquee.innerHTML = content + content;

        const width = marquee.scrollWidth / 2;

        const tl = gsap.to(marquee, {
            x: -width,
            duration: 40, // Adjusted duration for smoother scroll with images
            ease: "none",
            repeat: -1,
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <GsapReveal>
                    <h2 className="text-3xl font-bold text-teal-800 mb-4">Trusted by Leading Brands</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We are proud to have partnered with some of the most prestigious names in the industry.
                    </p>
                </GsapReveal>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex gap-16 w-max items-center px-4" ref={marqueeRef}>
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="relative w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 hover:scale-110 transform"
                        >
                            <Image
                                src={client.logo}
                                alt={client.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100px, 160px"
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlays for smooth fade effect */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
};

export default OurPartners;
