import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { Severity } from "@prisma/client";

export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { regions: true, techStack: true, businessType: true },
  });

  if (!user?.businessType) {
    return NextResponse.json({ regulations: [], needsOnboarding: true });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const severity = searchParams.get("severity") || "";
  const category = searchParams.get("category") || "";
  const dateRange = searchParams.get("dateRange") || "";

  // Build where clause
  const where: Record<string, unknown> = {};

  // Filter by user's regions
  if (user.regions.length > 0) {
    where.region = { in: user.regions };
  }

  // Search filter
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortName: { contains: search, mode: "insensitive" } },
      { summary: { contains: search, mode: "insensitive" } },
    ];
  }

  // Severity filter
  if (severity && Object.values(Severity).includes(severity as Severity)) {
    where.severity = severity as Severity;
  }

  // Category filter
  if (category) {
    where.category = category;
  }

  // Date range filter
  if (dateRange) {
    const now = new Date();
    let dateFrom: Date | null = null;
    if (dateRange === "7d") {
      dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (dateRange === "30d") {
      dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (dateRange === "90d") {
      dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    }
    if (dateFrom) {
      where.publishedAt = { gte: dateFrom };
    }
  }

  const regulations = await prisma.regulation.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    include: {
      _count: {
        select: { actionItems: true },
      },
    },
  });

  return NextResponse.json({
    regulations: regulations.map((r) => ({
      id: r.id,
      name: r.name,
      shortName: r.shortName,
      severity: r.severity,
      category: r.category,
      region: r.region,
      summary: r.summary,
      publishedAt: r.publishedAt.toISOString(),
      affectedArea: r.affectedArea,
      actionItemCount: r._count.actionItems,
    })),
  });
}
