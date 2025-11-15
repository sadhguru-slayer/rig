"use client";

import ReadOnlyEditor from "@/components/tiptap-templates/simple/read-only-editor";
import Image from "next/image";
import { useMemo } from "react";

// ---- Convert Tiptap JSON → HTML ----
function renderTiptapContent(json) {
  if (!json?.content) return "";

  const renderNode = (node) => {
    if (node.type === "paragraph") {
      const inner = (node.content || []).map(renderNode).join("");
      return `<p class="mb-4 leading-relaxed">${inner}</p>`;
    }

    if (node.type === "heading") {
      const level = node.attrs?.level || 2;
      const inner = (node.content || []).map(renderNode).join("");
      return `<h${level} class="mt-6 mb-3 font-semibold text-gray-900">${inner}</h${level}>`;
    }

    if (node.type === "text") {
      let text = node.text;

      if (node.marks) {
        node.marks.forEach((mark) => {
          if (mark.type === "bold") text = `<strong>${text}</strong>`;
          if (mark.type === "italic") text = `<em>${text}</em>`;
          if (mark.type === "underline") text = `<u>${text}</u>`;
        });
      }

      return text;
    }

    return "";
  };

  return json.content.map(renderNode).join("");
}

// -----------------------------------------

export default function BlogDetailsPage({ blog }) {
  const {
    title,
    coverImage,
    author,
    createdAt,
    tags,
    readTime,
    content,
  } = blog;

  const htmlContent = useMemo(() => renderTiptapContent(content), [content]);

  return (
    <div className="bg-white min-h-screen">
      {/* Cover Image */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={coverImage}
          alt={title || "Title"}
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold drop-shadow">{title}</h1>
          <p className="mt-2 text-gray-200">
            By {author} • {new Date(createdAt).toLocaleDateString()} • {readTime || 2} min read
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-teal-50 border text-teal-700 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <article
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
        >
        <ReadOnlyEditor content={content}/>
        </article>
      </section>
    </div>
  );
}
