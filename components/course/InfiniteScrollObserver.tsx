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
  const loadingRef = useRef(false); //요청 진행중인지 확인
  const isReadyRef = useRef(true); //다음 요청 준비 완료 확인

  useEffect(() => {
    if (!enabled) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          isReadyRef.current = true;
          return;
        }

        // intersecting 중엔 한 번만
        if (!isReadyRef.current) return;

        // 로딩 중이면 스킵
        if (loadingRef.current || isLoading) return;

        // 다음 요청 준비 완료 플래그 내리고 진행 중 로딩 플래그 올리기
        isReadyRef.current = false;
        loadingRef.current = true;

        Promise.resolve(onLoadMore()).finally(() => {
          loadingRef.current = false;
        });
      },
      {
        root: rootRef?.current ?? null, //scroll container 기준
        rootMargin: "100px 0px",
        threshold: 0,
      },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [enabled, hasMore, isLoading, onLoadMore, rootRef]);

  return (
    <div
      ref={observerRef}
      className="col-span-2 h-12 flex items-center justify-center"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isLoading && <LoaderCircle className="animate-spin text-theme" />}
    </div>
  );
}
