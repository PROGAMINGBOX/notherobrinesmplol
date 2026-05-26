import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const regulation = await prisma.regulation.findUnique({
    where: { id: params.id },
    include: {
      actionItems: {
        include: {
          userActionItems: {
            where: { userId: session.user.id },
          },
        },
      },
    },
  });

  if (!regulation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: regulation.id,
    name: regulation.name,
    shortName: regulation.shortName,
    severity: regulation.severity,
    category: regulation.category,
    region: regulation.region,
    affectedArea: regulation.affectedArea,
    summary: regulation.summary,
    fullDescription: regulation.fullDescription,
    whatChanged: regulation.whatChanged,
    deadline: regulation.deadline?.toISOString() || null,
    publishedAt: regulation.publishedAt.toISOString(),
    actionItems: regulation.actionItems.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      priority: item.priority,
      techStackRelevance: item.techStackRelevance,
      status: item.userActionItems[0]?.status || "TODO",
    })),
  });
}
