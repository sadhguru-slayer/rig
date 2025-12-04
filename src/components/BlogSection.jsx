"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import GsapReveal from "@/components/GsapReveal";

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecentBlogs() {
            try {
                // Fetch only the latest 3 blogs
                const res = await fetch("/api/blog?page=1&limit=6");
                const json = await res.json();
                if (json?.success) {
                    setBlogs(json.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch recent blogs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecentBlogs();
    }, []);

    if (!loading && blogs.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <GsapReveal triggerOnView>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm">
                                Our Blog
                            </h2>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Latest Insights & Updates
                            </h3>
                            <p className="mt-4 text-gray-600 text-lg">
                                Stay informed with expert tips on home safety, invisible grill maintenance, and modern architectural trends.
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden md:flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                        >
                            View all articles <ArrowRight size={18} />
                        </Link>
                    </div>
                </GsapReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {loading
                        ? // Skeleton Loading State
                        [...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-96 animate-pulse"
                            >
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))
                        : blogs.map((blog, i) => (
                            <GsapReveal key={blog.id} triggerOnView delay={i * 0.1}>
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                >
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <Image
                                            src={blog.coverImage || "/images/placeholder.jpg"}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-700 shadow-sm">
                                            {blog.tags?.[0] || "Insight"}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>
                                                    {new Date(blog.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{blog.readTime || 3} min read</span>
                                            </div>
                                        </div>

                                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h4>

                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex items-center text-teal-600 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                                            Read Article <ArrowRight size={16} className="ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </GsapReveal>
                        ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                    >
                        View all articles <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
