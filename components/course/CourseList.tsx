"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { CourseCard } from "./CourseCard";
import { InfiniteScrollObserver } from "./InfiniteScrollObserver";
import { Button, Modal } from "@/components/ui";

import type {
  SortOption,
  CourseResponse,
  EnrollmentRequestStatus,
} from "@/types";

import { courseQueries } from "@/lib/query/courseQueries";
import { parseEnrollmentStatus } from "@/lib/helpers";
import { enrollCourses } from "@/app/course/action";

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(courseQueries.infinite(sortBy));

  const [visibleCourses, setVisibleCourses] = useState<CourseResponse[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(
    new Set(),
  );
  const [state, setState] = useState<EnrollmentRequestStatus | null>(null);
  const [pending, setPending] = useState(false);
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

  const listRef = useRef<HTMLElement | null>(null);

  // 요청 완료 후 모달에 노출할 메시지를
  const message = state?.message ?? "";
  const isOpen = !!message && dismissedMessage !== message;

  //성공적으로 수강 신청한 강의ID 목록
  const enrolledIds = useMemo(
    () => state?.data?.success?.map((item) => Number(item.courseId)) ?? [],
    [state],
  );

  // sort 변경 시 초기화 & 스크롤 최상단
  useEffect(() => {
    setVisibleCourses([]);
    setSelectedCourseIds(new Set());
    listRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [sortBy]);

  useEffect(() => {
    if (!data?.pages) return;

    /**
     * 서버에서 2차 정렬이 없어서 중복 강의가 올 수 있다.
     * 프론트 단에서 임시로 set을 사용해 중복을 제거
     */
    setVisibleCourses((prev) => {
      const seen = new Set(prev.map((c) => c.id));
      const next = [...prev];

      for (const page of data.pages) {
        for (const c of page.content ?? []) {
          if (seen.has(c.id)) continue;
          seen.add(c.id);
          next.push(c); //기존 순서대로 추가
        }
      }

      return next;
    });
  }, [data]);

  useEffect(() => {
    if (enrolledIds.length === 0) return;

    // 수강 신청이 성공한 강의는 currentStudents +1
    setVisibleCourses((prev) =>
      prev.map((c) =>
        enrolledIds.includes(c.id)
          ? { ...c, currentStudents: (c.currentStudents ?? 0) + 1 }
          : c,
      ),
    );
  }, [enrolledIds]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (courseId: number, isChecked: boolean) => {
    setSelectedCourseIds((prev) => {
      const next = new Set(prev);
      if (isChecked) {
        next.add(courseId);
      } else {
        next.delete(courseId);
      }
      return next;
    });
  };

  // 서버 액션은 페이지를 리렌더하고, 그러면 서버에서 받는 데이터의 순서가 달라질 수 있기 때문에 클라이언트 제출로 변경함
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setDismissedMessage(null);

    const formData = new FormData();
    selectedCourseIds.forEach((id) => formData.append("courseId", String(id)));
    const result = await enrollCourses(formData);

    setState(result);
    setPending(false);

    // 신청 성공 시 체크박스 초기화
    if (result.success) {
      setSelectedCourseIds(new Set());
    }
  };

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
        onSubmit={handleSubmit}
        className="flex flex-col h-full overflow-hidden relative"
      >
        <section
          ref={listRef}
          className="grid grid-cols-2 gap-4 py-2 overflow-y-auto h-full"
        >
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isChecked={selectedCourseIds.has(course.id)}
              onCheckboxChange={(isChecked) =>
                handleCheckboxChange(course.id, isChecked)
              }
            />
          ))}

          <InfiniteScrollObserver
            rootRef={listRef}
            enabled={!pending && !isOpen}
            hasMore={!pending && !isOpen && (hasNextPage ?? false)}
            isLoading={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        </section>

        <footer className="z-30 bg-transparent pt-4 sticky w-full bottom-0 pointer-events-none">
          <Button
            type="submit"
            disabled={pending}
            label={
              pending
                ? "수강 신청 중..."
                : `${selectedCourseIds.size}개 수강 신청하기`
            }
            variant="primary"
            size="large"
          />
        </footer>
      </form>
    </>
  );
}
