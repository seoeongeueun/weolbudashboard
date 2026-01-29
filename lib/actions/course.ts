"use server";

import type { SortOption, CourseApiResponse } from "@/types";
import { BASE_URL } from "@/lib/config";
/**
 * 서버사이드 강의 목록 조회 함수
 *
 * @description
 * - ssr에서 초기 데이터를 서버에서 직접 백엔드로부터 가져오는 함수
 * - 초기 페이지 로드 시 html에 데이터가 포함되어 전송되므로 SEO와 첫 페인팅 시간에 유리
 *
 * @param sort 정렬 기준 (recent | popular | rate)
 * @param size 페이지 크기
 * @returns CourseApiResponse
 */
export async function fetchCoursesServer(
  sort: SortOption,
  size = 10,
): Promise<CourseApiResponse> {
  const response = await fetch(
    `${BASE_URL}/api/courses?page=0&size=${size}&sort=${sort}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}
