"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Sidebar from "@/components/ide/Sidebar";
import ChatPanel from "@/components/ide/ChatPanel";
import EditorPanel from "@/components/ide/EditorPanel";
import CanvasPanel from "@/components/ide/CanvasPanel";
import ExecutionPanel from "@/components/ide/ExecutionPanel";

export default function IDEPage() {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={15} minSize={10} className="border-r border-gray-800">
          <Sidebar />
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize hover:bg-blue-500 transition-colors" />
        
        <Panel defaultSize={25} minSize={20} className="border-r border-gray-800">
          <ChatPanel />
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize hover:bg-blue-500 transition-colors" />
        
        <Panel defaultSize={40} minSize={30} className="border-r border-gray-800">
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} minSize={30}>
              <EditorPanel />
            </Panel>
            <PanelResizeHandle className="h-1 bg-gray-800 cursor-row-resize hover:bg-blue-500 transition-colors" />
            <Panel defaultSize={30} minSize={10} className="bg-[#1e1e1e]">
              <ExecutionPanel />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize hover:bg-blue-500 transition-colors" />
        
        <Panel defaultSize={20} minSize={15}>
          <CanvasPanel />
        </Panel>
      </PanelGroup>
    </div>
  );
}
