"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/lib/api/auth";
import type { UserProfile } from "@/types";
import { getRoleLabel } from "@/lib/helpers";
import clsx from "clsx";

export function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (error) {
        console.error("유저 정보 불러오기 실패: ", error);
      }
    }

    loadUserProfile();
  }, []);

  return (
    <section className="flex flex-row w-full items-center justify-between">
      <h1
        className={clsx(
          "text-lg font-bold min-w-40 transition-colors duration-500 h-8",
          {
            "animate-pulse bg-skeleton": !user?.name,
          },
        )}
      >
        {user?.name && `안녕하세요, ${user.name} ${getRoleLabel(user.role)}님`}
      </h1>
      <Link
        href="/auth"
        className="text-sm transition-colors duration-100 underline underline-offset-2 font-medium hover:text-theme"
      >
        프로필 정보
      </Link>
    </section>
  );
}
