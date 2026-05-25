import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { businessType, techStack, regions } = body;

  if (!businessType || !Array.isArray(techStack) || !Array.isArray(regions)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      businessType,
      techStack,
      regions,
    },
  });

  return NextResponse.json({ success: true });
}
