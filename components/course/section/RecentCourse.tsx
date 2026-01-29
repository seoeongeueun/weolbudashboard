"use client";

import { useQuery } from "@tanstack/react-query";
import { courseQueries } from "@/lib/query/courseQueries";
import { CourseCard } from "@/components/course";

export function RecentCourse() {
  const { data, isLoading, isError } = useQuery(
    courseQueries.list("recent", 6),
  );

  const courses = data?.content ?? [];

  return (
    <section className="w-full h-fit">
      <h1 className="text-lg font-bold py-2">최근 등록된 강의</h1>

      <div className="w-full overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(300px,1fr)] gap-4">
          {isLoading && <p className="text-sm text-skeleton">로딩 중...</p>}
          {isError && (
            <p className="text-sm text-error">강의를 불러오지 못했습니다.</p>
          )}
          {!isLoading && !isError && courses.length === 0 && (
            <p className="text-sm text-skeleton">표시할 강의가 없습니다.</p>
          )}
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
