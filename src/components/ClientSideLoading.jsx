"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ClientSideLoading() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);

  // Rotating subtitle list
  const subtitles = [
    "Securing Homes",
    "Premium Quality",
    "Expert Installation",
    "Customer First",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
      // Initial states
      gsap.set([logoRef.current, textRef.current, lineRef.current], { opacity: 0 });
      gsap.set(lineRef.current, { width: 0 });
      gsap.set(textRef.current, { y: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
  
      // Main animation
      tl.to(logoRef.current, {
        opacity: 1,
        duration: 0.8,
        scale: 1,
      })
        .to(
          lineRef.current,
          { opacity: 1, width: 150, duration: 0.8 },
          "-=0.3"
        )
        .to(
          logoRef.current,
          { y: -60, duration: 1 },
          "+=0.2"
        )
        .to(
          textRef.current,
          { opacity: 1, y: 40, duration: 1 },
          "<"
        );
  
      // -----------------------------
      // FIXED ROTATING SUBTITLE LOGIC
      // -----------------------------
      let index = 0;
      let intervalId = null;
  
      const rotateSubtitle = () => {
        const subtitle = subtitleRef.current;
        if (!subtitle) return; // prevent null crash
  
        gsap.to(subtitle, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          onComplete: () => {
            if (!subtitleRef.current) return; // double safety
            subtitleRef.current.textContent = subtitles[index];
            index = (index + 1) % subtitles.length;
  
            gsap.to(subtitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
            });
          },
        });
      };
  
      // Start subtitle cycle AFTER main animation
      setTimeout(() => {
        rotateSubtitle();
        intervalId = setInterval(rotateSubtitle, 1800);
      }, 1500);
  
      // Fade out loader
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 2.5,
        ease: "power2.inOut",
        onComplete: () => setIsVisible(false),
      });
  
      // Cleanup (this is the correct place)
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, containerRef);
  
    return () => ctx.revert();
  }, []);
  

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-teal-600 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* LOGO */}
      <div
        ref={logoRef}
        className="absolute z-[99]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/logo_c.png"
          alt="Invisible Grills Logo"
          width={120}
          height={120}
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
          priority
        />
      </div>

      {/* LINE */}
      <div
        ref={lineRef}
        className="absolute h-[2px] bg-white"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* MAIN TEXT */}
      <div
        ref={textRef}
        className="absolute opacity-0 text-center"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight whitespace-nowrap">
          Invisible Grills
        </h2>

        {/* ROTATING SUBTITLE */}
        <p
          ref={subtitleRef}
          className="text-white text-sm mt-2 tracking-wide opacity-0"
        >
          {/* dynamic text inserted here */}
        </p>
      </div>
    </div>
  );
}
