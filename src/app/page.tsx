"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Brain, Zap, Search, Globe } from "lucide-react";

export default function LandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Zap,
      title: "AI Summarization",
      desc: "Instantly distill any note into its essence with Claude AI.",
      color: "text-amber-400",
    },
    {
      icon: Search,
      title: "Conversational Query",
      desc: "Ask your knowledge base questions in plain English.",
      color: "text-blue-400",
    },
    {
      icon: Brain,
      title: "Auto-Tagging",
      desc: "AI automatically categorizes and tags your entries.",
      color: "text-violet-400",
    },
    {
      icon: Globe,
      title: "Public API",
      desc: "Expose your brain's intelligence via a public REST endpoint.",
      color: "text-emerald-400",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <div
        ref={ref}
        className="relative h-screen flex items-center justify-center"
      >
        <motion.div
          style={{ y, opacity }}
          className="text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-violet-600/20 rounded-3xl border border-violet-500/30 mb-8"
          >
            <Brain size={36} className="text-violet-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent"
          >
            Your Second Brain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 mb-10 leading-relaxed"
          >
            Capture knowledge. Surface insights. Query your mind.
            <br />
            AI-powered intelligence for everything you know.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/dashboard"
              className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-2xl font-semibold text-lg transition-colors"
            >
              Open Dashboard
            </Link>
            <Link
              href="/docs"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-8 py-3 rounded-2xl font-semibold text-lg transition-colors"
            >
              Read Docs
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-zinc-200"
        >
          Everything your brain needs
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              <f.icon size={28} className={`${f.color} mb-4`} />
              <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                {f.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
