import { NextResponse, NextRequest } from "next/server";
import { BASE_URL } from "@/lib/config";
import { apiRequest } from "@/lib/api/client";
import type { ApiError } from "@/lib/api/client";
import { cookies } from "next/headers";
import type { LoginApiResponse } from "@/types";

/**
 * 로그인 API
 * POST /api/users/login
 * body: { email, password }
 * 서버에서 받은 accessToken을 HttpOnly 쿠키로 설정
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await apiRequest<LoginApiResponse>(
      `${BASE_URL}/api/users/login`,
      {
        method: "POST",
        data: body,
      },
    );

    const cookieStore = await cookies();
    cookieStore.set("accessToken", res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    // 필요한 유저 정보만 쿠키에 저장 (이름, 역할)
    cookieStore.set(
      "user",
      encodeURIComponent(
        JSON.stringify({
          name: res.user.name,
          role: res.user.role,
        }),
      ),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      },
    );

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: String(error), message: apiError.message },
      { status: apiError.status ?? 500 },
    );
  }
}
