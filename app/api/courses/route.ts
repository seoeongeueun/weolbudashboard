import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "@/lib/api/client";
import type { CourseApiResponse, SortOption } from "@/types";

/**
 * 강의 목록 조회 API
 *
 * @query
 * - page: 페이지 번호 (기본값: 0)
 * - size: 페이지 크기 (기본값: 10)
 * - sort: 정렬 기준 recent (디폴트) | popular | rate
 *
 * @example
 * GET /api/courses?page=0&size=10&sort=recent
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL is not defined in environment variables");
    }
    const url = new URL("/api/courses", baseUrl);

    // 쿼리 파라미터 파싱 및 검증
    const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
    const size = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("size") || "10", 10)),
    );
    const sort = (searchParams.get("sort") || "recent") as SortOption;

    url.searchParams.set("page", String(page));
    url.searchParams.set("size", String(size));
    url.searchParams.set("sort", sort);

    const data = await apiRequest<CourseApiResponse>(url.toString());

    // apiRequest에서 json 파싱이 이미 되었으므로 그대로 반환
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
