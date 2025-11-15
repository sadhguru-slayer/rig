'use client';

import { BubbleMenu } from '@tiptap/react';

export default function BubbleMenuBar({ editor }) {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
      <div className="flex gap-2 bg-white shadow-md border rounded-lg p-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
        >
          S
        </button>
      </div>
    </BubbleMenu>
  );
}
