'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const KeyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeyProjects = async () => {
      try {
        const res = await fetch('/api/project/key-project/');
        const result = await res.json();

        if (result.success) {
          const formattedProjects = result.data.map((project) => ({
            id: project.id,
            imgSource: project.imgSource,
            title: project.name,
            description: project.description,
            cta: 'View Project Details',
          }));

          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error('Failed to fetch key projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeyProjects();
  }, []);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">
            Key Projects
          </h2>
          <p className="mt-3 text-gray-600">
            Select installations demonstrating performance, finish, and longevity.
          </p>
        </div>

        {loading ? (
          <p className="mt-10 text-gray-500">Loading projects...</p>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <Image
                  alt={p.title}
                  src={p.imgSource || '/g2.png'}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover bg-gray-100 border-b border-gray-200"
                />

                <div className="p-5">
                  <h3 className="font-bold text-teal-700">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {p.description}
                  </p>

                  <div className="mt-4">
                    <button className="inline-flex items-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
                      {p.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default KeyProjects;
