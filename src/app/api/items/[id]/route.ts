import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const item = await prisma.knowledgeItem.findUnique({
    where: { id: params.id },
  });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  await prisma.knowledgeItem.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
