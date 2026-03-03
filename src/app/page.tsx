import Link from "next/link";
import { ArrowRight, Code2, Bot, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 pt-20 font-sans">
      <main className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center mt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8 animate-fade-in relative z-10 w-fit cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Introducing KOOLAGE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 relative z-10">
          Antigravity IDE
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 relative z-10">
          An AI-Native Learning & Development Environment. 
          Code, chat, and collaborate with your personal AI agent in a unified cloud workspace.
        </p>

        <div className="flex items-center gap-4 mb-24 relative z-10">
          <Link 
            href="/ide" 
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-neutral-50 transition-all duration-300 hover:bg-blue-700 hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 hover:ring-offset-black"
          >
            <span className="mr-2">Enter Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left relative z-10">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Code2 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Execution Sandbox</h3>
            <p className="text-gray-500 leading-relaxed">Run code in a secure sandboxed environment with remote backend execution capacities.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bot className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">AI Chat Engine</h3>
            <p className="text-gray-500 leading-relaxed">Full context-aware LLM agents pair-program with you dynamically on your project.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Layout className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Canvas & Editor</h3>
            <p className="text-gray-500 leading-relaxed">Notion-style rich text capabilities mixed seamlessly with a Monaco-backed IDE.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
