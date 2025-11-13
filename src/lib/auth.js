import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token) {
   const resolvedToken = token; // this resolves the Promise if it is one
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}
