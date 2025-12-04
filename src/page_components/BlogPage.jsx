"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GsapReveal from "@/components/GsapReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalPages: 1,
    total: 0,
  });

  async function fetchBlogs(page = 1) {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?page=${page}&limit=${pagination.limit}`);
      const json = await res.json();
      if (json?.success) {
        setBlogs(json.data || []);
        setPagination((prev) => ({ ...prev, ...json.pagination }));
      }
    } catch (e) {
      console.error("Blog Fetch Error:", e);
    }
    setLoading(false);
    // Scroll to top of list on page change
    if (page > 1) {
      const listElement = document.getElementById("blog-list");
      if (listElement) {
        listElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

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
      <section id="blog-list" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <GsapReveal triggerOnView>
            <h2 className="text-3xl sm:text-4xl font-semibold text-teal-700 mb-10">
              Latest Blogs
            </h2>
          </GsapReveal>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-gray-600 text-center py-10">No blogs available.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog, i) => (
                  <GsapReveal key={blog.id} triggerOnView delay={0.05 * i}>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group block rounded-xl border border-gray-200 shadow-md hover:shadow-xl bg-white overflow-hidden h-full flex flex-col"
                    >
                      <div className="relative h-56 w-full overflow-hidden shrink-0">
                        <Image
                          src={blog.coverImage || "/images/placeholder.jpg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-1">
                          {blog.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                          <span>{blog.readTime || 2} min read</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>

                        {blog.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-md border border-teal-100"
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

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-full border border-gray-300 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Simple logic to show limited page numbers could be added here for many pages
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${pagination.page === pageNum
                              ? "bg-teal-600 text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 rounded-full border border-gray-300 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
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
