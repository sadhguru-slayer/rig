"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GsapReveal from "@/components/GsapReveal";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog");
        const json = await res.json();
        if (json?.success) setBlogs(json.data || []);
      } catch (e) {
        console.error("Blog Fetch Error:", e);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <GsapReveal delay={0.05}>
        <section className="relative py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="mx-auto max-w-7xl px-6 text-left">
            <h1 className="text-4xl sm:text-5xl font-bold">Blogs & Insights</h1>
            <p className="mt-3 text-lg text-teal-100 max-w-xl">
              Expert guides, safety tips, installation insights and the latest updates from Invisible Grills industry.
            </p>
          </div>
        </section>
      </GsapReveal>

      {/* Blogs Listing */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <GsapReveal triggerOnView>
            <h2 className="text-3xl sm:text-4xl font-semibold text-teal-700 mb-10">
              Latest Blogs
            </h2>
          </GsapReveal>

          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-600 text-center py-10">No blogs available.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog, i) => (
                <GsapReveal key={blog.id} triggerOnView delay={0.05 * i}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group block rounded-xl border border-gray-200 shadow-md  hover:shadow-xl bg-white overflow-hidden "
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover  transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <span>{blog.readTime || 2} min read</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>

                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </GsapReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <GsapReveal triggerOnView>
        <section className="py-20 bg-gradient-to-r from-teal-50 to-white border-t">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-teal-700">
              Want to Install Invisible Grills?
            </h2>
            <p className="mt-3 text-gray-600">
              Contact our experts for professional consultation and installation.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition"
            >
              Get a Quote
            </Link>
          </div>
        </section>
      </GsapReveal>
    </div>
  );
}
