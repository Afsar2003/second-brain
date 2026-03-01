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
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: `Summarize the following in 2-3 sentences:\n\nTitle: ${item.title}\n\n${item.content}`,
      },
    ],
  });

  const summary = (message.content[0] as { type: string; text: string }).text;

  const updated = await prisma.knowledgeItem.update({
    where: { id },
    data: { summary },
  });

  return NextResponse.json(updated);
}
