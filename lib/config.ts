export const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

export const COOKIE_SETTINGS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24, // 24 hour
};
