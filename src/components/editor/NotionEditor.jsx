'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Blockquote from '@tiptap/extension-blockquote';
import ResizableImage from 'tiptap-extension-resizable-image';
import { useCallback } from 'react';

import SlashCommand from './SlashCommand';
import BubbleMenuBar from './BubbleMenuBar';

export default function NotionEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender:false,
    extensions: [
      StarterKit.configure({
        paragraph: { HTMLAttributes: { class: 'text-gray-800' } },
      }),
      Underline,
      Blockquote,
      Placeholder.configure({
        placeholder: 'Type something...',
        emptyNodeClass: 'text-gray-400',
      }),
      Link.configure({ openOnClick: false }),
      Image,
      ResizableImage,
      HorizontalRule,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral max-w-none focus:outline-none px-4 py-3 bg-white',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL:');
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-2 bg-white shadow-sm">
      <BubbleMenuBar editor={editor} />
      <SlashCommand editor={editor} />

      <EditorContent editor={editor} />

      <button
        onClick={addImage}
        className="mt-3 text-sm text-teal-600 hover:underline"
      >
        Add Image
      </button>
    </div>
  );
}
