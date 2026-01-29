import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * 로그아웃 API
 * POST /api/users/logout
 * accessToken + 유저 정보 쿠키 제거
 */
export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("user");

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
