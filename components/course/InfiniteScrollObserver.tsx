"use client";

import { useEffect, useRef } from "react";
import type { CourseResponse } from "@/types";
import { LoaderCircle } from "lucide-react";

interface InfiniteScrollObserverProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: (page: number) => Promise<CourseResponse[]>; //다음 페이지의 강의를 로드
}

/**
 * 무한 스크롤 감지 컴포넌트
 *
 * @description
 * - Intersection Observer API를 사용하여 마지막 요소가 보일 때 추가 데이터를 로드
 * - 로드 중일 때는 스피너를 노출
 */
export function InfiniteScrollObserver({
  hasMore,
  isLoading,
  onLoadMore,
}: InfiniteScrollObserverProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          //TODO: 다음 페이지 로드
          //onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "50px", // 50px 미리 감지
        threshold: 0.1,
      },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div
      ref={observerRef}
      className="col-span-2 h-fit flex items-center justify-center"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isLoading && <LoaderCircle className="animate-spin text-theme" />}
    </div>
  );
}
