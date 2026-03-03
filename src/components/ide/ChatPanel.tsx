"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "system", content: "AI: How can I help you build with Antigravity IDE today?" }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    // Pseudo-streaming placeholder
    setMessages(prev => [...prev, { role: "assistant", content: "..." }]);
    
    // Will be replaced with actual fetch to /api/chat
    setTimeout(() => {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: "assistant", content: "I am a KOOLAGE agent. Streaming functionality will connect to OpenRouter soon." };
        return newMsgs;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-x border-[#333333]">
      <div className="h-10 border-b border-[#333333] flex items-center px-4 bg-[#252526]">
        <h2 className="text-sm font-semibold text-gray-300">
          AI Chat
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[85%] rounded p-3 text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-[#2d2d2d] text-gray-200"}`}>
              {msg.content}
            </div>
            <span className="text-xs text-gray-500 mt-1 capitalize">{msg.role}</span>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-[#333333] bg-[#252526]">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI to write code, explain, or edit..." 
            className="flex-1 bg-[#1e1e1e] text-sm text-white px-3 py-2 rounded border border-[#3c3c3c] focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            title="Send message"
            aria-label="Send message"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
