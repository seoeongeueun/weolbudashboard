import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 유저 프로필 조회 API
 * GET /api/users/profile
 * 쿠키에서 user 정보를 읽어 반환
 */
export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user")?.value;
  if (!raw) return NextResponse.json({ user: null });

  try {
    const user = JSON.parse(decodeURIComponent(raw));
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
