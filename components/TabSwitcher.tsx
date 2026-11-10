"use client";

interface TabSwitcherProps {
  activeTab: "chat" | "image";
  setActiveTab: (tab: "chat" | "image") => void;
}

export default function TabSwitcher({ activeTab, setActiveTab }: TabSwitcherProps) {
  return (
    <div className="flex bg-[#171717] p-1 rounded-2xl border border-[#262626] w-fit mb-4">
      <button
        onClick={() => setActiveTab("chat")}
        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
          activeTab === "chat"
            ? "bg-[#262626] text-white shadow-md"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        💬 Chat AI
      </button>
      <button
        onClick={() => setActiveTab("image")}
        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
          activeTab === "image"
            ? "bg-[#262626] text-white shadow-md"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        🎨 Gambar AI
      </button>
    </div>
  );
                                    }
