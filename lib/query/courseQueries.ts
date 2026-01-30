import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { SortOption, CourseApiResponse } from "@/types";

export const courseKeys = {
  all: ["courses"] as const,
  //무한스크롤 캐시 키
  infinite: (sort: SortOption, size: number) =>
    [...courseKeys.all, "infinite", sort, size] as const,
  //단일 페이지 리스트 키
  page: (sort: SortOption, size: number, page: number) =>
    [...courseKeys.all, "page", sort, size, page] as const,
};

/**
 * 강의 목록 조회 함수
 *
 * @param pageParam 페이지 번호 (0부터 시작)
 * @param sort 정렬 기준
 */
async function fetchCourses(
  pageParam: number,
  sort: SortOption,
  size = 10,
): Promise<CourseApiResponse> {
  const response = await fetch(
    `/api/courses?page=${pageParam}&size=${size}&sort=${sort}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

/**
 * Course Query Factory
 *
 * @description
 * 강의 관련 쿼리 옵션을 전체 관리
 */
export const courseQueries = {
  //무한 스크롤 강의 목록 쿼리
  infinite: (sort: SortOption, size = 10) =>
    infiniteQueryOptions({
      queryKey: courseKeys.infinite(sort, size),
      queryFn: ({ pageParam }) => fetchCourses(pageParam, sort, size),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.last ? undefined : lastPage.pageable.pageNumber + 1,
    }),
  // 단일 페이지 강의 목록 (현재는 홈 화면에서 신규 강의 조회에 사용)
  list: (sort: SortOption, size = 10) =>
    queryOptions({
      queryKey: courseKeys.page(sort, size, 0),
      queryFn: () => fetchCourses(0, sort, size),
    }),
};
