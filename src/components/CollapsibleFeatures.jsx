'use client'
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import gsap from "gsap";

const features = [
  {
    title: "High-Tensile Cables",
    desc: "304/316 grade stainless steel with up to 400kg tensile strength.",
  },
  {
    title: "Minimal Visual Impact",
    desc: "Slimline wires maintain open views and natural light.",
  },
  {
    title: "Weather & Rust Resistant",
    desc: "Built to withstand coastal and urban environments.",
  },
  {
    title: "Custom Fit",
    desc: "Tailored to your balcony dimensions and safety needs.",
  },
];

const CollapsibleFeatures = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    features.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;

      if (openIndex === idx) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [openIndex]);

  return (
    <div className="mt-8 flex flex-col gap-4">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="border-b border-teal-800  overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <dt
            className="flex justify-between items-center p-5 cursor-pointer bg-white hover:bg-teal-50 transition-colors duration-200"
            onClick={() => toggle(idx)}
          >
            <span className="font-medium text-teal-700">{feature.title}</span>
            <span className="text-teal-700">
              {openIndex === idx ? <FiMinus size={20} /> : <FiPlus size={20} />}
            </span>
          </dt>
          <dd className="bg-gray-50 overflow-hidden h-0 opacity-0" ref={(el) => (contentRefs.current[idx] = el)}>
  <div className="p-5 pt-0 text-gray-600 text-sm sm:text-base">
    {feature.desc}
  </div>
</dd>

        </div>
      ))}
    </div>
  );
};

export default CollapsibleFeatures;
