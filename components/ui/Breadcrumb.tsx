"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getLabel } from "@/lib/helpers";

interface BreadcrumbItem {
  label: string;
  href: string;
}

//현재 페이지 경로를 표시하는 breadcrumb 네비게이션
export function Breadcrumb() {
  const pathname = usePathname();

  // pathname 기반으로 자동 breadcrumb 생성
  const automaticBreadcrumbs: BreadcrumbItem[] = (() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // 홈은 기본으로 추가
    breadcrumbs.push({ label: "홈", href: "/" });

    // 각 경로 세그먼트에서 breadcrumb 생성
    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = getLabel(segment);
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  })();

  if (automaticBreadcrumbs.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="py-3 font-bold">
      <ol className="flex items-center gap-2">
        {automaticBreadcrumbs.map((item, index) => {
          const isLast = index === automaticBreadcrumbs.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                // 마지막 항목 (현재 페이지)
                <span className="text-sm text-theme" aria-label="현재 페이지">
                  {item.label}
                </span>
              ) : (
                // 이전 주소 링크
                <>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-theme transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-skeleton" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
