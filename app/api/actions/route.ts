import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { regions: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get all action items from regulations matching user's regions
  const actionItems = await prisma.actionItem.findMany({
    where: {
      regulation: {
        region: user.regions.length > 0 ? { in: user.regions } : undefined,
      },
    },
    include: {
      regulation: {
        select: { id: true, name: true, shortName: true },
      },
      userActionItems: {
        where: { userId: session.user.id },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = actionItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    priority: item.priority,
    techStackRelevance: item.techStackRelevance,
    regulationId: item.regulation.id,
    regulationName: item.regulation.name,
    regulationShortName: item.regulation.shortName,
    status: item.userActionItems[0]?.status || "TODO",
    completedAt: item.userActionItems[0]?.completedAt?.toISOString() || null,
  }));

  return NextResponse.json({ items });
}
