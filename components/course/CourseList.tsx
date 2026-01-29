"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CourseCard } from "./CourseCard";
import type { SortOption } from "@/types";
import { enrollCourses } from "@/app/course/action";
import { Button, Modal } from "@/components/ui";
import { useActionState, useState } from "react";
import { InfiniteScrollObserver } from "./InfiniteScrollObserver";
import { courseQueries } from "@/lib/query/courseQueries";
import { parseEnrollmentStatus } from "@/lib/helpers";

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
const initialState = null;

export function CourseList({ sortBy }: CourseListProps) {
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(courseQueries.infinite(sortBy));

  // 모든 페이지의 강의를 단일 배열로 flatten
  const courses = data?.pages.flatMap((page) => page.content) ?? [];

  const [state, formAction, pending] = useActionState(
    enrollCourses,
    initialState,
  );

  const message = state?.message ?? "";
  const isOpen = !!message && dismissedMessage !== message;

  // 수강 신청 폼 제출 시 모달 메시지 해제
  const handleSubmitCapture = () => setDismissedMessage(null);

  return (
    <>
      {isOpen && (
        <Modal
          type={state?.success ? "enrollment-success" : "enrollment-failure"}
          onClose={() => setDismissedMessage(message)}
          description={
            state?.success ? parseEnrollmentStatus(state) : undefined
          }
        />
      )}
      <form
        action={formAction}
        onSubmitCapture={handleSubmitCapture}
        id="course-enroll-form"
        className="flex flex-col h-full overflow-hidden relative"
      >
        <section className="grid grid-cols-2 gap-4 py-2 overflow-y-auto h-full">
          {courses.map((course, i) => (
            <CourseCard key={course.id + " " + i} course={course} />
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
            disabled={pending}
            label={"수강 신청하기"}
            variant="primary"
            size="large"
          />
        </footer>
      </form>
    </>
  );
}
