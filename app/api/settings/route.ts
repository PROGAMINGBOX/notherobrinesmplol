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
    select: { alertFrequency: true, severityLevels: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    alertFrequency: user.alertFrequency,
    severityLevels: user.severityLevels,
  });
}

export async function PATCH(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { alertFrequency, severityLevels } = body;

  const updateData: Record<string, unknown> = {};

  if (alertFrequency !== undefined) {
    const validFrequencies = ["immediate", "daily", "weekly"];
    if (!validFrequencies.includes(alertFrequency)) {
      return NextResponse.json({ error: "Invalid alert frequency" }, { status: 400 });
    }
    updateData.alertFrequency = alertFrequency;
  }

  if (severityLevels !== undefined) {
    if (!Array.isArray(severityLevels)) {
      return NextResponse.json({ error: "Invalid severity levels" }, { status: 400 });
    }
    const validLevels = ["CRITICAL", "WARNING", "INFO"];
    const allValid = severityLevels.every((level: string) => validLevels.includes(level));
    if (!allValid) {
      return NextResponse.json({ error: "Invalid severity level value" }, { status: 400 });
    }
    updateData.severityLevels = severityLevels;
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
    select: { alertFrequency: true, severityLevels: true },
  });

  return NextResponse.json({
    alertFrequency: user.alertFrequency,
    severityLevels: user.severityLevels,
  });
}
