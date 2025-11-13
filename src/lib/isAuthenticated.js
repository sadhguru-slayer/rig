// lib/isAuthenticated.js
import { cookies } from "next/headers";
import { verifyToken } from "./auth";

export async function isAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get("core_token")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload || null;
}
