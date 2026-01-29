import Link from "next/link";
import type { UserProfile } from "@/types";
import { getRoleLabel } from "@/lib/helpers";

interface ProfileProps {
  user: UserProfile | null;
}

/**
 * 사용자 프로필 표시 컴포넌트 (서버 컴포넌트)
 * @param user 사용자 정보 (서버에서 prefetch한 데이터)
 */
export function Profile({ user }: ProfileProps) {
  return (
    <section className="flex flex-row w-full items-center justify-between">
      <h1 className="text-lg font-bold min-w-40 duration-500 h-8">
        {user?.name && `안녕하세요, ${user.name} ${getRoleLabel(user.role)}님`}
      </h1>
      <Link
        href="/auth"
        className="text-sm transition-colors duration-100 underline underline-offset-2 hover:text-theme"
      >
        프로필 정보
      </Link>
    </section>
  );
}
