"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { useState } from "react";
import { Play, Square, Terminal as TerminalIcon } from "lucide-react";

export default function ExecutionPanel() {
  const { activeFileId, files } = useIDEStore();
  const [output, setOutput] = useState<string[]>(["Antigravity Sandbox Initialized v1.0.0", "Waiting for execution..."]);
  const [isRunning, setIsRunning] = useState(false);

  const activeFile = files.find(f => f._id === activeFileId);

  const handleRun = async () => {
    if (!activeFile) return;
    
    setIsRunning(true);
    setOutput(prev => [...prev, `\n> Executing ${activeFile.fileName}...`]);

    try {
      // In production, this proxies to the Kubernetes/Docker worker
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: activeFile.language,
          content: activeFile.content // or use unsaved content
        })
      });

      const data = await res.json();
      
      if (data.output) {
        setOutput(prev => [...prev, data.output]);
      }
      if (data.error) {
        setOutput(prev => [...prev, `Error: ${data.error}`]);
      }
    } catch {
      setOutput(prev => [...prev, `[System Error]: Failed to connect to execution engine.`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#333333]">
      <div className="h-10 border-b border-[#333333] flex items-center justify-between px-4 bg-[#252526]">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-300">
          <TerminalIcon size={14} /> Output
        </h2>
        <div className="flex gap-2">
          {isRunning ? (
            <button className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
              <Square size={12} fill="currentColor" /> Stop
            </button>
          ) : (
            <button 
              onClick={handleRun}
              disabled={!activeFile}
              className="flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
            >
              <Play size={12} fill="currentColor" /> Run Code
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-[#1e1e1e] font-mono text-sm text-gray-300 whitespace-pre-wrap">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
