import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/config";
import { apiRequest } from "@/lib/api/client";
import type { ApiError } from "@/lib/api/client";
import type { CourseResponse } from "@/types";
import { cookies } from "next/headers";

/**
 * 강의 추가 API
 * 강사 권한인지 쿠키에서 확인 후 강사 이름을 추가하여 전달
 *
 * POST /api/courses
 * body: CourseResponse 타입
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    //유저가 role이 instrusctor인지 쿠키에서 확인
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    if (!userCookie) {
      return NextResponse.json(
        { error: "Unauthorized", message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const user = JSON.parse(decodeURIComponent(userCookie));
    if (user.role !== "INSTRUCTOR") {
      return NextResponse.json(
        { error: "Forbidden", message: "강사만 접근할 수 있습니다." },
        { status: 403 },
      );
    }

    const body = await request.json();

    //확인된 강사 유저 이름을 instructorName으로 추가
    body.instructorName = user.name;

    //토큰 정보를 헤더에 추가하여 전달
    const res = await apiRequest<CourseResponse>(`${BASE_URL}/api/courses`, {
      method: "POST",
      data: body,
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value || ""}`,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: String(error), message: apiError.message },
      { status: apiError.status ?? 500 },
    );
  }
}
