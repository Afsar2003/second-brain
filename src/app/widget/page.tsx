"use client";
import { useState } from "react";
import { Brain, Send } from "lucide-react";

export default function Widget() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    const res = await fetch("/api/ai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <Brain size={20} className="text-violet-400" />
        <span className="font-bold text-sm">Second Brain</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
        />
        <button
          disabled={loading || !q.trim()}
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-3 py-2 rounded-xl transition-colors"
        >
          <Send size={14} />
        </button>
      </form>

      {loading && <p className="text-xs text-zinc-500">Thinking...</p>}

      {answer && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
