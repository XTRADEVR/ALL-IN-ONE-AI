"use client";

import { CHAT_MODELS, IMAGE_MODELS, AIModel } from "@/lib/models";

interface SidebarProps {
  activeTab: "chat" | "image";
  activeModel: string;
  setActiveModel: (id: string) => void;
  isOpen: boolean;
}

export default function Sidebar({ activeTab, activeModel, setActiveModel, isOpen }: SidebarProps) {
  const models: AIModel[] = activeTab === "chat" ? CHAT_MODELS : IMAGE_MODELS;

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 w-[280px] bg-[#121212] border-r border-[#262626] flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="p-4 border-b border-[#262626]">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI All-In-One
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Mode: {activeTab === "chat" ? "Chatbot" : "Image Generator"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <p className="text-xs font-semibold text-zinc-500 px-3 uppercase tracking-wider mb-2">
          Pilih Model
        </p>
        {models.map((m) => {
          const isActive = activeModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id)}
              className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 border ${
                isActive
                  ? "bg-[#222222] border-zinc-600 text-white shadow-sm"
                  : "bg-transparent border-transparent text-zinc-400 hover:bg-[#1a1a1a] hover:text-zinc-200"
              }`}
            >
              <span className="text-xl">{m.icon}</span>
              <div>
                <div className={`text-sm font-medium ${isActive ? "text-white" : "text-zinc-300"}`}>
                  {m.name}
                </div>
                <div className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{m.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#262626] text-xs text-zinc-500 text-center">
        Powered by OpenRouter API
      </div>
    </aside>
  );
        }
