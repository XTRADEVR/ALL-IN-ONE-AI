"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TabSwitcher from "@/components/TabSwitcher";
import ChatBox from "@/components/ChatBox";
import ImageBox from "@/components/ImageBox";
import { CHAT_MODELS, IMAGE_MODELS } from "@/lib/models";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "image">("chat");
  const [activeChatModel, setActiveChatModel] = useState(CHAT_MODELS[0].id);
  const [activeImageModel, setActiveImageModel] = useState(IMAGE_MODELS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeModel = activeTab === "chat" ? activeChatModel : activeImageModel;
  const setActiveModel = activeTab === "chat" ? setActiveChatModel : setActiveImageModel;

  return (
    <main className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        activeModel={activeModel}
        setActiveModel={setActiveModel}
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar for mobile & tab switcher */}
        <header className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#121212] md:bg-transparent">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <TabSwitcher
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
            />
          </div>
          <div className="hidden md:block text-xs text-zinc-500 bg-[#171717] px-3 py-1.5 rounded-xl border border-[#262626]">
            Model Aktif: <span className="text-zinc-300 font-medium">{activeModel}</span>
          </div>
        </header>

        {/* Dynamic Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "chat" ? (
            <ChatBox activeModel={activeChatModel} />
          ) : (
            <ImageBox activeModel={activeImageModel} />
          )}
        </div>
      </div>
    </main>
  );
}
