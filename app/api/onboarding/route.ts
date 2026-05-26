import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthSession } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

const ALLOWED_BUSINESS_TYPES = [
  "SaaS",
  "E-commerce",
  "Mobile App",
  "Fintech",
  "Healthcare",
  "EdTech",
  "Marketplace",
  "Other",
] as const;

const ALLOWED_TECH_STACK = [
  "iOS/App Store",
  "Android/Play Store",
  "Web Application",
  "React/Next.js",
  "Node.js",
  "Python",
  "AWS",
  "GCP",
  "Azure",
  "Stripe/Payments",
  "Database/SQL",
  "Docker/Kubernetes",
] as const;

const ALLOWED_REGIONS = [
  "EU",
  "US-California",
  "US-Federal",
  "UK",
  "Canada",
  "Australia",
  "Brazil",
  "Global",
  "Singapore",
] as const;

const onboardingSchema = z.object({
  businessType: z.enum(ALLOWED_BUSINESS_TYPES),
  techStack: z.array(z.enum(ALLOWED_TECH_STACK)).min(1, "Select at least one tech stack option"),
  regions: z.array(z.enum(ALLOWED_REGIONS)).min(1, "Select at least one region"),
});

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const result = onboardingSchema.safeParse(body);

  if (!result.success) {
    const firstError = result.error.errors[0]?.message || "Invalid input";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { businessType, techStack, regions } = result.data;

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
