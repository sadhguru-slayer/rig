"use client"
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ✅ Correct import

// Register once
if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const GsapReveal = ({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  triggerOnView = false,
  once = true,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (triggerOnView) {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",

            toggleActions: "play none none reverse",
            once,
          },
        }
      );
    } else {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        { autoAlpha: 1, y: 0, duration, ease: "power2.out", delay }
      );
    }
  }, [triggerOnView, delay, y, duration, once]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default GsapReveal;