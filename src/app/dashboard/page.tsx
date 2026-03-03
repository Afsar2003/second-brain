"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import QueryPanel from "@/components/QueryPanel";
import { Search, Brain } from "lucide-react";
import Link from "next/link";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  summary?: string;
  sourceUrl?: string;
}

export default function Dashboard() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type) params.set("type", type);
    const res = await fetch(`/api/items?${params}`);
    setItems(await res.json());
    setLoading(false);
  }, [search, type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur z-40">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Brain size={22} className="text-violet-400" />
          Second Brain
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Docs
          </Link>
          <AddItemModal onAdd={(item) => setItems((prev) => [item, ...prev])} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Items", value: items.length },
            {
              label: "Notes",
              value: items.filter((i) => i.type === "note").length,
            },
            {
              label: "Insights",
              value: items.filter((i) => i.type === "insight").length,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center"
            >
              <div className="text-3xl font-bold text-violet-400">
                {s.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <QueryPanel />
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              placeholder="Search your brain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-violet-500"
          >
            <option value="">All Types</option>
            <option value="note">Notes</option>
            <option value="link">Links</option>
            <option value="insight">Insights</option>
          </select>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-48 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-zinc-500">
            <Brain size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-lg">Your brain is empty. Start capturing!</p>
            <p className="text-sm mt-2">
              Click Capture Idea to add your first note.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDelete={(id: string) =>
                    setItems((prev) => prev.filter((i) => i.id !== id))
                  }
                  onUpdate={(updated: KnowledgeItem) =>
                    setItems((prev) =>
                      prev.map((i) => (i.id === updated.id ? updated : i)),
                    )
                  }
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
