import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SortDropdown } from "@/components/course";
import type { SortOption } from "@/types";
import { CourseList } from "@/components/course";
import { getQueryClient } from "@/lib/query/queryClient";
import { courseKeys } from "@/lib/query/courseQueries";
import { fetchCoursesServer } from "@/lib/actions";
import { COURSES_PAGE_SIZE, MAX_COURSE_PAGES } from "@/lib/constants";

/**
 * url 쿼리 파라미터를 파싱해서 정렬 기준과 페이지를 추출
 * @example /course?sort=recent&pages=2 → { sort: "recent", pages: "2" }
 */
interface CoursePageProps {
  searchParams: Promise<{ sort?: SortOption; pages?: string }>;
}

/**
 * 강의 목록 페이지 (Server Component)
 *
 * @description
 * ssr + hydration을 통한 초기 데이터 로드
 * - 서버에서 초기 데이터 prefetch
 * - dehydrate해서 query client로 전달
 * - 클라이언트에서 useInfiniteQuery로 hydrated 데이터 사용
 */
export default async function CoursePage({ searchParams }: CoursePageProps) {
  const params = await searchParams;
  const sortBy = params.sort || "recent";

  // 첫 페이지만 prefetch
  const queryClient = getQueryClient();
  const firstPage = await fetchCoursesServer(sortBy, COURSES_PAGE_SIZE, 0);

  queryClient.setQueryData(courseKeys.infinite(sortBy, COURSES_PAGE_SIZE), {
    pages: [firstPage],
    pageParams: [0],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-bold">전체 강의</h1>
        <SortDropdown currentSort={sortBy} />
      </div>
      <CourseList sortBy={sortBy} />
    </HydrationBoundary>
  );
}
