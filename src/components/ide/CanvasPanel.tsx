"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useIDEStore } from "@/store/useIDEStore";
import { useEffect } from "react";

export default function CanvasPanel() {
  const { activeProjectId } = useIDEStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your notes or design doc here...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none max-w-none text-gray-300 min-h-[500px]',
      },
    },
  });

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] p-6 text-white overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-200">Canvas</h2>
      {!activeProjectId ? (
        <p className="text-gray-500">Select a project to enable canvas.</p>
      ) : (
        <div className="flex-1 bg-[#252526] p-6 rounded-lg border border-gray-800">
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}
