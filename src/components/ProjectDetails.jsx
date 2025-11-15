"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GsapReveal from "@/components/GsapReveal";
import CtaSection from "@/components/CtaSection";
import Divider from "./Divider";

const ProjectDetails = ({ project }) => {

  if (!project) return null;

  const [openChallenge, setOpenChallenge] = useState(null);

  return (
    <article className="bg-white relative">
      {/* HERO SECTION */}
<GsapReveal delay={0.5}>
  <section className="relative bg-gradient-to-br from-teal-50 to-sky-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      
      <div>
        {/* Breadcrumb */}
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-teal-700 font-medium">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/projects" className="hover:text-teal-700 font-medium">Projects</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">{project.name}</li>
          </ol>
        </nav>

        {/* Category Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-800 uppercase tracking-wider animate-pulse">
          {project.category}
        </span>

        {/* Project Title */}
        <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-teal-700 leading-tight">
          {project.name}
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 flex-wrap">
          <Link
            href="/projects"
            className="rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 px-8 py-4 text-white font-semibold shadow-lg transform transition duration-300 hover:scale-105"
          >
            Back to Projects
          </Link>
          {/* Optional extra button, e.g., Contact */}
          <Link
            href="/contact"
            className="rounded-xl border border-teal-500 text-teal-700 px-8 py-4 font-semibold hover:bg-teal-50 transform transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl transform transition duration-500">
        <Image
          src={project.imgSource}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
          fetchPriority="high"
        />
      </div>
    </div>

    {/* Floating Shapes */}
    <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-100 rounded-full opacity-40 animate-pulse-slow"></div>
    <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-sky-200 rounded-full opacity-40 animate-pulse-slow"></div>
  </section>
</GsapReveal>

      {/* KEY METRICS / QUICK FACTS */}
      <GsapReveal triggerOnView>
        <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { label: "Client", value: project.client },
              { label: "Location", value: project.location },
              { label: "Completed On", value: project.completedOn },
              { label: "Service Type", value: project.serviceType },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transform transition-all duration-300"
              >
                <h3 className="text-gray-500 font-semibold mb-2">
                  {item.label}
                </h3>
                <p className="text-xl font-bold text-teal-700">
                 {item.value instanceof Date ? item.value.toLocaleDateString() : item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </GsapReveal>

      {/* COMBINED INFO GRID: SCOPE + BENEFITS + HIGHLIGHTS */}
      <GsapReveal triggerOnView>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Scope */}
            {project.scope?.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-teal-700 mb-4">
                  Scope
                </h2>
                <ul className="space-y-2 text-gray-700">
                  {project.scope.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-teal-500 font-bold">•</span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-teal-700 mb-4">
                  Highlights
                </h2>
                <ul className="space-y-2 text-gray-700">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-teal-500 font-bold">✔</span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Client Benefits */}
            {project.clientBenefits?.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-teal-700 mb-4">
                  Client Benefits
                </h2>
                <ul className="space-y-2 text-gray-700">
                  {project.clientBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-teal-500 font-bold">★</span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </GsapReveal>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <GsapReveal triggerOnView>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-semibold text-teal-700 text-center mb-12">
                Gallery
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transform transition duration-500"
                  >
                    <Image
                      src={img.url}
                      alt={`${project.name} image ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>
      )}

{/* CHALLENGES & SOLUTIONS – MINIMAL DESIGN */}
{project.challengesAndSolutions?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-12">
          Challenges & Solutions
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {project.challengesAndSolutions.map((cs, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-md"
            >
              {/* Challenge */}
              <div>
                <h3 className="text-lg font-medium text-red-500 mb-1">
                  Challenge
                </h3>
                <p className="text-gray-700 text-base">{cs.challenge}</p>
              </div>
              <Divider/>

              {/* Solution */}
              <div>
                <h3 className="text-lg font-medium text-teal-600 mb-1">
                  Solution
                </h3>
                <p className="text-gray-700 text-base">{cs.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </GsapReveal>
)}


      {/* FINAL OUTCOME */}
      {project.finalOutcome && (
        <GsapReveal triggerOnView>
          <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-700 mb-6 relative inline-block">
                Final Outcome
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-teal-400 rounded-full"></span>
              </h2>
              <p className="text-gray-700 text-lg">{project.finalOutcome}</p>
            </div>
          </section>
        </GsapReveal>
      )}

      {/* CTA */}
      <GsapReveal triggerOnView>
        <CtaSection
          cta={{
            text: "Get in touch today for reliable, durable installation!",
            buttonLabel: "Contact Us",
            link: "/contact",
          }}
        />
      </GsapReveal>
    </article>
  );
};

export default ProjectDetails;
