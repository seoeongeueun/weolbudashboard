"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CourseCard } from "./CourseCard";
import type { SortOption, CourseResponse } from "@/types";
import { enrollCourses } from "@/app/course/action";
import { Button, Modal } from "@/components/ui";
import { useActionState, useState, useEffect, useMemo } from "react";
import { InfiniteScrollObserver } from "./InfiniteScrollObserver";
import { courseQueries } from "@/lib/query/courseQueries";
import { parseEnrollmentStatus } from "@/lib/helpers";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(courseQueries.infinite(sortBy));

  // 모든 페이지의 강의를 단일 배열로 flatten
  // const courses: CourseResponse[] =
  //   data?.pages.flatMap((page) => page.content) ?? [];

  const [state, formAction, pending] = useActionState(
    enrollCourses,
    initialState,
  );

  const message = state?.message ?? "";
  const isOpen = !!message && dismissedMessage !== message;

  //state.data.success의 array에서 courseId 추출
  const enrolledIds = state?.data
    ? state.data.success.map((item) => Number(item.courseId))
    : [];

  // 수강 신청 폼 제출 시 모달 메시지 해제
  const handleSubmitCapture = () => setDismissedMessage(null);

  /**
   * 원래는 수강 신청시 인원을 반영하기 위해 key를 invalidate해서 리패치 했겠지만
   * 서버에서 중복된 값이 반환되는 이슈가 있어서 대신 수동으로 캐싱된 데이터의 수강 인원만 증가시키도록 처리
   */
  useEffect(() => {
    if (!state?.data || !state.data.success) return;

    const queryKey = courseQueries.infinite(sortBy).queryKey;

    if (enrolledIds.length === 0) return;

    type PageType = { content: CourseResponse[] };
    type InfiniteQueryData = { pages: PageType[]; pageParams: unknown[] };

    queryClient.setQueryData<InfiniteQueryData | undefined>(queryKey, (old) => {
      if (!old?.pages) return old;

      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          content: page.content.map((c) => {
            if (!enrolledIds.includes(c.id)) return c;
            return { ...c, currentStudents: (c.currentStudents ?? 0) + 1 };
          }),
        })),
      };
    });
  }, [state?.data, sortBy]);

  // 서버에서 중복으로 반환되는 강의 제거
  const uniqueCourses: CourseResponse[] = useMemo(() => {
    const pages = data?.pages ?? [];
    const seen = new Set<number>();
    const out: CourseResponse[] = [];

    for (const page of pages) {
      for (const c of page.content ?? []) {
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        out.push(c);
      }
    }
    return out;
  }, [data]);

  return (
    <>
      {isOpen && !pending && (
        <Modal
          type={state?.success ? "enrollment-success" : "enrollment-failure"}
          onClose={() => setDismissedMessage(message)}
          description={
            state?.success ? parseEnrollmentStatus(state) : state?.message
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
          {uniqueCourses.map((course) => (
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
