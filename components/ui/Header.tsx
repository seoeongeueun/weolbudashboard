"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const showBackButton = pathname !== "/";

  return (
    <header>
      <nav
        className="flex flex-row items-center justify-between -ml-2"
        aria-label="주요 네비게이션"
      >
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8"
            aria-label="뒤로 가기"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        )}
        <Link
          href="/"
          className="text-0 cursor-pointer bg-[url('https://cdn.weolbu.com/fe/logo.DZwdMn-h.svg')] bg-contain bg-no-repeat flex h-5 w-[140px] min-w-[140px] ml-auto"
          aria-label="홈으로 이동"
        >
          <span className="sr-only">월급쟁이부자들</span>
        </Link>
      </nav>
    </header>
  );
}
