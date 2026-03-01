import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const item = await prisma.knowledgeItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 128,
    messages: [
      {
        role: "user",
        content: `Generate 3-5 relevant tags for this content. Return ONLY a JSON array of lowercase strings, nothing else.\n\nTitle: ${item.title}\n\n${item.content}`,
      },
    ],
  });

  const raw = (message.content[0] as { type: string; text: string }).text;
  let tags: string[] = [];
  try {
    tags = JSON.parse(raw.match(/\[[\s\S]*?\]/)?.[0] || "[]");
  } catch {
    tags = [];
  }

  const updated = await prisma.knowledgeItem.update({
    where: { id },
    data: { tags: [...new Set([...item.tags, ...tags])] },
  });

  return NextResponse.json(updated);
}
