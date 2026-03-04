"use client";

import Editor from "@monaco-editor/react";
import { useIDEStore } from "@/store/useIDEStore";
export default function EditorPanel() {
  const { activeFileId, files, unsavedContent, setUnsavedContent } = useIDEStore();

  const activeFile = files.find(f => f._id === activeFileId);
  
  const currentContent = activeFile 
    ? (unsavedContent[activeFile._id] ?? activeFile.content) 
    : "";

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      setUnsavedContent(activeFile._id, value);
    }
  };

  if (!activeFile) {
    return (
      <div className="flex flex-col h-full bg-[#1e1e1e] items-center justify-center">
        <p className="text-gray-500 text-sm">No file selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <div className="flex border-b border-gray-800 bg-[#252526] h-10 px-2 items-center">
        <div className="flex bg-[#1e1e1e] border-t border-blue-500 text-gray-300 text-sm px-4 py-2 cursor-pointer items-center">
          {activeFile.fileName}
          {unsavedContent[activeFile._id] !== undefined && <span className="ml-2 w-2 h-2 rounded-full bg-white"></span>}
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={activeFile.language || "javascript"}
          theme="vs-dark"
          value={currentContent}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}
