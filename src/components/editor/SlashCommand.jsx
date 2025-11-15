'use client';

import { useEffect, useState } from 'react';

const COMMANDS = [
  { label: 'Heading 1', action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: 'Heading 2', action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: 'Heading 3', action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
  { label: 'Bullet List', action: (e) => e.chain().focus().toggleBulletList().run() },
  { label: 'Numbered List', action: (e) => e.chain().focus().toggleOrderedList().run() },
  { label: 'Task List', action: (e) => e.chain().focus().toggleTaskList().run() },
  { label: 'Quote', action: (e) => e.chain().focus().toggleBlockquote().run() },
  { label: 'Divider', action: (e) => e.chain().focus().setHorizontalRule().run() },
  { label: 'Code Block', action: (e) => e.chain().focus().toggleCodeBlock().run() },
];

export default function SlashCommand({ editor }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!editor) return;

    const onKeyDown = (e) => {
      if (e.key === '/') {
        setOpen(true);
        setQuery('');
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    editor.view.dom.addEventListener('keydown', onKeyDown);

    return () => {
      editor.view.dom.removeEventListener('keydown', onKeyDown);
    };
  }, [editor]);

  const filtered = COMMANDS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="absolute bg-white shadow-lg border rounded-md p-2 text-sm w-56 z-50">
      <input
        autoFocus
        placeholder="Type command..."
        className="w-full mb-2 border px-2 py-1 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            item.action(editor);
            setOpen(false);
          }}
          className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
