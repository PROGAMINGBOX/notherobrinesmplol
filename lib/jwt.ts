import { SignJWT, jwtVerify } from "jose";

if (
  process.env.NEXTAUTH_SECRET === "dummy-secret-for-build" &&
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PHASE
) {
  throw new Error(
    "[SECURITY] NEXTAUTH_SECRET is still set to the placeholder value. Set a real secret before running in production."
  );
}

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export function getAuthTokenCookieOptions() {
  return {
    name: "auth-token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
