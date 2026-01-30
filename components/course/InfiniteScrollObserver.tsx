"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";

interface InfiniteScrollObserverProps {
  hasMore: boolean;
  isLoading: boolean;
  enabled?: boolean;
  rootRef?: React.RefObject<HTMLElement | null>;
  onLoadMore: () => Promise<unknown> | void;
  throttleMs?: number;
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
  throttleMs = 500,
  onLoadMore,
}: InfiniteScrollObserverProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false); //요청 진행중인지 확인
  const lastFireRef = useRef(0); //마지막 요청 시점

  useEffect(() => {
    if (!enabled) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingRef.current || isLoading) return;

        // 로딩 중이면 스킵
        if (loadingRef.current || isLoading) return;

        //throttle로 과도한 호출 방지
        const now = Date.now();
        if (now - lastFireRef.current < throttleMs) return;
        lastFireRef.current = now;

        loadingRef.current = true;
        Promise.resolve(onLoadMore()).finally(() => {
          loadingRef.current = false;
        });
      },
      {
        root: rootRef?.current ?? null, //scroll container 기준
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [enabled, hasMore, isLoading, onLoadMore, rootRef, throttleMs]);

  return (
    <div
      ref={observerRef}
      className="shrink-0 col-span-2 h-12 flex items-center justify-center"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isLoading && <LoaderCircle className="animate-spin text-theme" />}
    </div>
  );
}
