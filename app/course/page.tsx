import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SortDropdown } from "@/components/course";
import type { SortOption } from "@/types";
import { CourseList, CourseSelectCounter } from "@/components/course";
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

  // pages 파라미터가 있을 때만 여러 페이지 prefetch
  // (없으면 정렬이 막 바뀐 것이므로 1페이지만)
  const targetPage = params.pages ? parseInt(params.pages) : 1;
  const prefetchPages = Number.isFinite(targetPage)
    ? Math.min(Math.max(targetPage, 1), MAX_COURSE_PAGES)
    : 1;

  // 서버에서 QueryClient 생성
  const queryClient = getQueryClient();

  // 요청된 페이지까지 모두 fetch 해서 렌더
  const pages = await Promise.all(
    Array.from({ length: prefetchPages }, (_, i) =>
      fetchCoursesServer(sortBy, COURSES_PAGE_SIZE, i),
    ),
  );
  const pageParams = Array.from({ length: prefetchPages }, (_, i) => i);

  // InfiniteQuery 형식으로 변환해서 QueryClient에 데이터 주입
  queryClient.setQueryData(courseKeys.infinite(sortBy, COURSES_PAGE_SIZE), {
    pages,
    pageParams,
  });

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
