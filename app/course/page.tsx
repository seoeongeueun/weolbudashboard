import { SortDropdown } from "@/components/course";
import type { SortOption } from "@/types";
import { CourseList } from "@/components/course";

/**
 * url 쿼리 파라미터를 파싱해서 정렬 기준을 추출
 * @example /course?sort=latest → { sort: "latest" }
 */
interface CoursePageProps {
  searchParams: { sort?: SortOption };
}

/**
 * 강의 목록 페이지 (Server Component)
 *
 * @description
 * 전체 강의 목록을 정렬하여 표시
 * ssr을 위해 url 쿼리 파라미터로 정렬 기준 제어
 *
 * @params
 * - 정렬 기준은 latest, mostStudents, highestStudentRate
 *
 * @todo
 * - GET /api/courses?sort={sortBy} 엔드포인트 연동
 * - 페이지네이션 추가 (searchParams.page)
 * - 필터 기능 추가 (시간이 되면)
 * - 스켈레톤 추가
 * - 정렬 옵션 별도 타입으로 관리
 */
export default async function CoursePage({ searchParams }: CoursePageProps) {
  // 정렬 값이 없으면 기본으로 최신순
  const sortBy = searchParams.sort || "latest";

  // TODO: 서버에서 정렬된 강의 목록 fetch
  // const courses = await fetchCourses({ sortBy });

  return (
    <>
      <div className="ml-auto">
        <SortDropdown currentSort={sortBy} />
      </div>
      <CourseList />
    </>
  );
}
