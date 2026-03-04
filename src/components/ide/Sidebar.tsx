"use client";

import { useIDEStore, DBFile } from "@/store/useIDEStore";
import { useEffect } from "react";
import { FileCode2 } from "lucide-react";

// Placeholder until convex query is connected
const EMPTY_FILES: DBFile[] = [];

export default function Sidebar() {
  const { activeProjectId, activeFileId, setActiveFileId, setFiles } = useIDEStore();

  const files = EMPTY_FILES;

  useEffect(() => {
    if (files) {
      setFiles(files);
    }
  }, [files, setFiles]);

  return (
    <div className="flex flex-col h-full bg-[#252526] text-[#cccccc] p-4">
      <h2 className="text-xs font-semibold mb-4 uppercase tracking-wider text-[#cccccc] opacity-80">Explorer</h2>
      <div className="flex-1 overflow-y-auto">
        {!activeProjectId && (
          <p className="text-gray-500 text-sm">No project loaded</p>
        )}
        {files?.map(file => (
          <div 
            key={file._id}
            onClick={() => setActiveFileId(file._id)}
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer text-sm rounded ${activeFileId === file._id ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}
          >
            <FileCode2 size={14} className="opacity-80" />
            <span className="truncate">{file.fileName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
