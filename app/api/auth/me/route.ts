import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
    },
  });
}
