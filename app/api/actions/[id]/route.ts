import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { ActionStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { status } = body;

  if (!status || !Object.values(ActionStatus).includes(status as ActionStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Verify action item exists
  const actionItem = await prisma.actionItem.findUnique({
    where: { id: params.id },
  });

  if (!actionItem) {
    return NextResponse.json({ error: "Action item not found" }, { status: 404 });
  }

  const completedAt = status === "COMPLETED" ? new Date() : null;

  const userActionItem = await prisma.userActionItem.upsert({
    where: {
      userId_actionItemId: {
        userId: session.user.id,
        actionItemId: params.id,
      },
    },
    update: {
      status: status as ActionStatus,
      completedAt,
    },
    create: {
      userId: session.user.id,
      actionItemId: params.id,
      status: status as ActionStatus,
      completedAt,
    },
  });

  return NextResponse.json({
    id: userActionItem.id,
    actionItemId: userActionItem.actionItemId,
    status: userActionItem.status,
    completedAt: userActionItem.completedAt?.toISOString() || null,
  });
}
