import { NextResponse, NextRequest } from "next/server";
import { BASE_URL } from "@/lib/config";
import { apiRequest } from "@/lib/api/client";
import type { ApiError } from "@/lib/api/client";

/**
 * 로그인 API
 * POST /api/users/login
 * body: { email, password }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await apiRequest<Response>(`${BASE_URL}/api/users/login`, {
      method: "POST",
      data: body,
    });

    // apiRequest에서 json 파싱이 이미 되었으므로 그대로 반환
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: String(error), message: apiError.message },
      { status: apiError.status ?? 500 },
    );
  }
}
