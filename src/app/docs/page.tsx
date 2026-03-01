import Link from "next/link";
import { Brain } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Brain size={22} className="text-violet-400" /> Second Brain
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400 text-sm">Docs</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Architecture & Docs</h1>
        <p className="text-zinc-400 text-lg mb-12">
          How Second Brain is built and why.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">
              1. Portable Architecture
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Every layer is independently swappable. The database uses Prisma
              ORM — switch from PostgreSQL to SQLite by changing one line in
              schema.prisma. The AI layer is isolated in /api/ai/* routes, so
              switching from Claude to GPT-4 means changing only the client
              import. The UI is purely presentational with zero business logic
              embedded in components.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-400">
              UI → Next.js API Routes → AI Client → Prisma ORM → PostgreSQL
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">
              2. Design Principles
            </h2>
            <div className="space-y-3">
              {[
                [
                  "Progressive Disclosure",
                  "Simple capture form first. AI actions appear contextually on cards after content exists.",
                ],
                [
                  "Immediate Feedback",
                  "Every button shows a loading state. Skeleton loaders during data fetch. Users always know the system state.",
                ],
                [
                  "Dark-First Aesthetics",
                  "Dark theme reduces cognitive load. Color is semantic, not decorative.",
                ],
                [
                  "Non-Destructive AI",
                  "AI adds summaries and tags but never overwrites your original content.",
                ],
                [
                  "Keyboard Accessible",
                  "All forms submit on Enter. Modals close on Escape. Focus is managed correctly.",
                ],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >
                  <div className="font-semibold text-zinc-200 mb-1 text-sm">
                    {title}
                  </div>
                  <div className="text-sm text-zinc-400">{desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">
              3. Agent Thinking
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              The auto-tag feature is an autonomous improvement loop: Claude
              analyzes content semantics, generates relevant tags, and merges
              them with existing ones — improving the system over time without
              manual work. The query endpoint synthesizes across all stored
              knowledge to surface connections the user has not explicitly made.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">
              4. Public API
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-400 text-sm mb-2">Query endpoint:</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-emerald-400">
                  GET /api/public/brain/query?q=your+question
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-2">Response format:</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-400">
                  {`{ "question": "...", "answer": "...", "sourcesCount": 12 }`}
                </div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-2">Embeddable widget:</p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-400 break-all">
                  {`<iframe src="https://your-domain.com/widget" width="400" height="500" />`}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
