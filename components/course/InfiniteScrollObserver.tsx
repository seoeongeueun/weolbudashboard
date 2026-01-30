"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";

interface InfiniteScrollObserverProps {
  hasMore: boolean;
  isLoading: boolean;
  enabled?: boolean;
  rootRef?: React.RefObject<HTMLElement | null>;
  onLoadMore: () => Promise<unknown> | void;
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
  enabled = true,
  rootRef,
  onLoadMore,
}: InfiniteScrollObserverProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingRef.current) return;
        if (isLoading) return;

        loadingRef.current = true;
        onLoadMore();
      },
      {
        root: rootRef?.current ?? null, //scroll container 기준
        rootMargin: "10px",
        threshold: 1.0, // 완전히 보일 때만
      },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [enabled, hasMore, isLoading, onLoadMore, rootRef]);

  // 로딩 끝나면 다시 감지 가능
  useEffect(() => {
    if (!isLoading) {
      loadingRef.current = false;
    }
  }, [isLoading]);

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
