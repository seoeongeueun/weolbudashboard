"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "@/components/ui";

// ssr을 고려해서 params로 현재 정렬값을 받아옴
export function SortDropdown({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`/course?${params.toString()}`);
  };

  return (
    <Dropdown
      value={currentSort}
      onChange={handleChange}
      options={[
        { label: "최신순", value: "latest" },
        { label: "인기순", value: "popular" },
      ]}
    />
  );
}
