"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function Header() {
  return (
    <header>
      <nav
        className="flex flex-row items-center justify-between"
        aria-label="주요 네비게이션"
      >
        <Breadcrumb />
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
