"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { CourseCard } from "./CourseCard";
import type { SortOption, CourseResponse } from "@/types";
import { enrollCourses } from "@/app/course/action";
import { Button } from "@/components/ui";
import { InfiniteScrollObserver } from "./InfiniteScrollObserver";

interface CourseListProps {
  sortBy: SortOption;
}

/**
 * 강의 목록 컴포넌트 (클라이언트 컴포넌트)
 *
 * @description
 * - 데이터/캐싱: useInfiniteQuery
 * - 스크롤 감지: InfiniteScrollObserver
 * - 초기 데이터: 서버에서 prefetch 후 hydration
 */
export function CourseList({ sortBy }: CourseListProps) {
  const [allCourses, setAllCourses] = useState<CourseResponse[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["courses", sortBy],
      queryFn: ({ pageParam }) => console.log("TODO"), //TODO: 쿼리 작성 필요,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        //if (lastPage.length < 10) return undefined;
        return allPages.length + 1;
      },
    });

  // 모든 페이지의 강의를 단일 배열로 flatten
  //const courses = data?.pages.flatMap((page) => page) ?? [];

  const courses = allCourses;

  return (
    <form
      action={enrollCourses}
      id="course-enroll-form"
      className="flex flex-col h-full overflow-hidden relative"
    >
      <section className="grid grid-cols-2 gap-4 py-2 overflow-y-auto h-full">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <InfiniteScrollObserver
          hasMore={hasNextPage ?? false}
          isLoading={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </section>

      <footer className="z-30 bg-transparent pt-4 sticky w-full bottom-0 pointer-events-none">
        <Button
          type="submit"
          label={"수강 신청하기"}
          variant="primary"
          size="large"
        />
      </footer>
    </form>
  );
}
