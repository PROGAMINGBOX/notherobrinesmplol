import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/utils";
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

  const regionFilter = user.regions.length > 0 ? { region: { in: user.regions } } : {};

  // Total regulations matching user's regions
  const totalRegulations = await prisma.regulation.count({
    where: regionFilter,
  });

  // Get user action items
  const userActionItems = await prisma.userActionItem.findMany({
    where: { userId: session.user.id },
    select: { status: true },
  });

  // Count all relevant action items (from matching regulations)
  const allActionItemsCount = await prisma.actionItem.count({
    where: {
      regulation: regionFilter,
    },
  });

  const completedActions = userActionItems.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const pendingActions = allActionItemsCount - completedActions;

  // Critical alerts in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const criticalAlerts = await prisma.regulation.count({
    where: {
      ...regionFilter,
      severity: "CRITICAL",
      publishedAt: { gte: thirtyDaysAgo },
    },
  });

  return NextResponse.json({
    totalRegulations,
    pendingActions: Math.max(0, pendingActions),
    completedActions,
    criticalAlerts,
  });
}
