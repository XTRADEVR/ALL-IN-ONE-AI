"use client";

import { useState, useRef, useEffect } from "react";
import { sendToAI } from "@/lib/openrouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  activeModel: string;
}

export default function ChatBox({ activeModel }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const reply = await sendToAI(activeModel, newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setMessages([...newMessages, { role: "assistant", content: `❌ ${err.message || "Error, cek API Key lu"}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
            <span className="text-4xl">💬</span>
            <p className="text-lg font-medium">Mulai percakapan baru dengan AI</p>
            <p className="text-xs">Pilih model di sidebar dan ketik pesan di bawah.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-[#1f1f1f] text-zinc-200 border border-[#2d2d2d] rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1f1f1f] text-zinc-400 border border-[#2d2d2d] rounded-2xl rounded-bl-sm px-4 py-3 text-sm animate-pulse">
              AI lagi mikir...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative bg-[#171717] border border-[#262626] rounded-2xl p-2 flex items-center shadow-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan... (Enter untuk kirim)"
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none px-3 py-2 text-sm text-white placeholder-zinc-500 max-h-32"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          Kirim
        </button>
      </div>
    </div>
  );
    }
