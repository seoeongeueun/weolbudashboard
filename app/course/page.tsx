import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SortDropdown } from "@/components/course";
import type { SortOption } from "@/types";
import { CourseList, CourseSelectCounter } from "@/components/course";
import { getQueryClient } from "@/lib/query/queryClient";
import { courseQueries } from "@/lib/query/courseQueries";

/**
 * url 쿼리 파라미터를 파싱해서 정렬 기준을 추출
 * @example /course?sort=recent → { sort: "recent" }
 */
interface CoursePageProps {
  searchParams: Promise<{ sort?: SortOption }>;
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

  // 서버에서 QueryClient 생성 (각 요청마다 새로 생성)
  const queryClient = getQueryClient();

  // 서버에서 초기 데이터 prefetch (첫 페이지만)
  await queryClient.prefetchInfiniteQuery(courseQueries.infinite(sortBy));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-row justify-between items-center">
        <CourseSelectCounter />
        <div className="ml-auto">
          <SortDropdown currentSort={sortBy} />
        </div>
      </div>
      <CourseList sortBy={sortBy} />
    </HydrationBoundary>
  );
}
