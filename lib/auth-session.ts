import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function getAuthSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return null;
  const payload = await verifyJWT(token);
  if (!payload) return null;
  return {
    user: { id: payload.userId, email: payload.email, name: payload.name },
  };
}
