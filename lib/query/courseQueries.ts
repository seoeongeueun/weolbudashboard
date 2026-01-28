import { infiniteQueryOptions } from "@tanstack/react-query";
import type { SortOption, CourseApiResponse } from "@/types";

export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (sort: SortOption) => [...courseKeys.lists(), sort] as const,
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
): Promise<CourseApiResponse> {
  const response = await fetch(
    `/api/courses?page=${pageParam}&size=10&sort=${sort}`,
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
  infinite: (sort: SortOption) =>
    infiniteQueryOptions({
      queryKey: courseKeys.list(sort),
      queryFn: ({ pageParam }) => fetchCourses(pageParam, sort),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined;
        return lastPage.pageable.pageNumber + 1;
      },
    }),
};
