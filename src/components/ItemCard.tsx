"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Wand2, Tag, FileText, Link, Lightbulb } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  note: FileText,
  link: Link,
  insight: Lightbulb,
};

const typeColors: Record<string, string> = {
  note: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  link: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  insight: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

interface Item {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  summary?: string;
  sourceUrl?: string;
}

interface Props {
  item: Item;
  onDelete: (id: string) => void;
  onUpdate: (item: Item) => void;
}

export default function ItemCard({ item, onDelete, onUpdate }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const Icon = typeIcons[item.type] || FileText;

  async function handleSummarize() {
    setLoading("summary");
    const res = await fetch("/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    onUpdate(await res.json());
    setLoading(null);
  }

  async function handleAutoTag() {
    setLoading("tags");
    const res = await fetch("/api/ai/autotag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    onUpdate(await res.json());
    setLoading(null);
  }

  async function handleDelete() {
    await fetch(`/api/items/${item.id}`, { method: "DELETE" });
    onDelete(item.id);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`p-1.5 rounded-lg border ${typeColors[item.type] || ""}`}
          >
            <Icon size={14} />
          </span>
          <span className="text-xs text-zinc-500 capitalize">{item.type}</span>
        </div>
        <button
          onClick={handleDelete}
          className="text-zinc-600 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h3 className="font-semibold text-zinc-100 leading-snug">{item.title}</h3>
      <p className="text-sm text-zinc-400 line-clamp-3">{item.content}</p>

      {item.summary && (
        <div className="bg-zinc-800 rounded-xl p-3 text-xs text-zinc-400 border border-zinc-700">
          <span className="text-zinc-500 font-medium">AI Summary: </span>
          {item.summary}
        </div>
      )}

      {item.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-auto pt-2 border-t border-zinc-800">
        <button
          onClick={handleSummarize}
          disabled={!!loading}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors disabled:opacity-50"
        >
          <Wand2 size={12} />
          {loading === "summary" ? "Summarizing..." : "Summarize"}
        </button>
        <button
          onClick={handleAutoTag}
          disabled={!!loading}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors disabled:opacity-50"
        >
          <Tag size={12} />
          {loading === "tags" ? "Tagging..." : "Auto-tag"}
        </button>
      </div>
    </motion.div>
  );
}
