"use server";

import type { UserProfile } from "@/types";
import { cookies } from "next/headers";

/**
 * SSR을 위해 유저 정보 쿠키를 서버에서 직접 가져오는 함수
 * @returns 유저 정보 (이름 + 역할)
 */
export async function fetchUserProfileFromServer(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  if (!userCookie) return null;

  try {
    return JSON.parse(decodeURIComponent(userCookie));
  } catch {
    return null;
  }
}
