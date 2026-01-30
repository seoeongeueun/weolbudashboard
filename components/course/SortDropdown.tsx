"use client";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui";
import type { SortDropdownOptions, SortOption } from "@/types";

const SORT_OPTIONS: SortDropdownOptions[] = [
  { label: "최신순", value: "recent" },
  { label: "신청자 많은 순", value: "popular" },
  { label: "신청률 높은 순", value: "rate" },
] as const;

// ssr을 고려해서 params로 현재 정렬값을 받아옴
export function SortDropdown({ currentSort }: { currentSort: SortOption }) {
  const router = useRouter();

  const handleChange = (value: string) => {
    // 정렬이 바뀐 경우는 페이지 정보 필요 없음
    router.replace(`/course?sort=${value}`, { scroll: true });
  };

  return (
    <Dropdown
      value={currentSort}
      onChange={handleChange}
      options={SORT_OPTIONS}
    />
  );
}
