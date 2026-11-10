"use client";

import { useState } from "react";
import { generateImage } from "@/lib/openrouter";
import Image from "next/image";

interface ImageHistory {
  prompt: string;
  url: string;
  model: string;
}

interface ImageBoxProps {
  activeModel: string;
}

export default function ImageBox({ activeModel }: ImageBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<ImageHistory[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const url = await generateImage(activeModel, prompt);
      setHistory((prev) => [{ prompt, url, model: activeModel }, ...prev]);
      setPrompt("");
    } catch (err: any) {
      setError(err.message || "Error, cek API Key lu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4 overflow-y-auto">
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-4 mb-6 shadow-lg">
        <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
          Prompt Gambar
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Contoh: Seekor kucing astronot sedang minum kopi di Mars..."
            className="flex-1 bg-[#111] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-md"
          >
            {loading ? "Lagi gambar..." : "Generate Gambar"}
          </button>
        </div>
        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-12 bg-[#171717]/50 border border-[#262626] rounded-2xl mb-6">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-zinc-400">Lagi gambar... Tunggu sebentar ya!</p>
        </div>
      )}

      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        History Gambar ({history.length})
      </h2>

      {history.length === 0 && !loading && (
        <div className="text-center py-12 text-zinc-600 border border-dashed border-[#262626] rounded-2xl">
          Belum ada gambar yang di-generate. Yuk buat sekarang!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        {history.map((item, idx) => (
          <div key={idx} className="bg-[#171717] border border-[#262626] rounded-2xl overflow-hidden shadow-lg flex flex-col">
            <div className="relative w-full h-72 bg-black">
              <Image
                src={item.url}
                alt={item.prompt}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <p className="text-xs text-zinc-300 line-clamp-2">"{item.prompt}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                <span className="text-[10px] text-zinc-500 bg-[#222] px-2 py-1 rounded-md">{item.model}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(item.prompt)}
                    className="text-xs bg-[#262626] hover:bg-[#333] text-zinc-300 px-3 py-1.5 rounded-xl transition-all"
                  >
                    Copy Prompt
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    download
                    className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl transition-all"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  }
