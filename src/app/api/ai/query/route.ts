import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const items = await prisma.knowledgeItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const context = items
    .map(
      (i: { type: string; title: string; content: string }) =>
        `[${i.type.toUpperCase()}] ${i.title}\n${i.content}`,
    )
    .join("\n\n---\n\n");

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `You are a knowledge assistant. Answer the question using only the provided knowledge base. Be concise.\n\nKnowledge Base:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return NextResponse.json({
    answer: (message.content[0] as { type: string; text: string }).text,
    sourcesCount: items.length,
  });
}
