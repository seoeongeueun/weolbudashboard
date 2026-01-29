import Link from "next/link";
import type { UserProfile } from "@/types";
import { getRoleLabel } from "@/lib/helpers";
import { logout } from "@/lib/actions";

interface ProfileProps {
  user: UserProfile | null;
}

/**
 * 사용자 프로필 표시 컴포넌트 (서버 컴포넌트)
 * @param user 사용자 정보 (서버에서 prefetch한 데이터)
 */
export function Profile({ user }: ProfileProps) {
  return (
    <header className="flex flex-row w-full items-center justify-between">
      <div className="flex-1">
        <h1 className="text-lg font-bold min-w-40 duration-500 h-8">
          {user?.name
            ? `안녕하세요, ${user.name} ${getRoleLabel(user.role)}님`
            : "로그인이 필요합니다"}
        </h1>
      </div>
      <nav className="flex flex-row items-center gap-2">
        {user ? (
          <>
            <Link
              href="/auth"
              className="text-sm transition-colors duration-100 underline underline-offset-2 hover:text-theme"
            >
              회원 정보
            </Link>
            <span
              aria-hidden="true"
              className="text-skeleton mt-1 text-s pointer-events-none"
            >
              |
            </span>
            <button
              type="button"
              aria-label="로그아웃"
              onClick={logout}
              className="text-sm transition-colors duration-100 underline! underline-offset-2 hover:text-theme"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm transition-colors duration-100 underline underline-offset-2 hover:text-theme"
          >
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
}
