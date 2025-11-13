'use client';

import dynamic from "next/dynamic";
const SimpleEditor = dynamic(
  () => import("@/components/tiptap-templates/simple/simple-editor").then(mod => mod.SimpleEditor),
  { ssr: false }
);

import { useState } from "react";

export default function BlogForm() {
  const [content, setContent] = useState(null);
  console.log(content)
  return (
    <div className="flex flex-col items-center">
      <div className="editor-wrapper w-full px-4">
        <h2 className="text-xl font-bold mb-4">Blog Content</h2>

        {/* If your SimpleEditor exposes a toolbar prop or className, pass or wrap it.
            Many CLI templates render a toolbar inside — you can target it with .tiptap-toolbar CSS above */}
        <div className="border rounded-lg shadow-sm bg-white">
          <SimpleEditor
            content={content}
            onChange={(newContent) => setContent(newContent)}
            className="p-2" // pass className if your editor accepts it
          />
        </div>
      </div>
    </div>
  );
}
