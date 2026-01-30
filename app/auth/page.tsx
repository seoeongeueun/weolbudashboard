import { Profile } from "@/components/auth";
import { fetchUserProfileFromServer } from "@/lib/actions/auth";
import { cookies } from "next/headers";
import { fetchCourseByIdServer } from "@/lib/actions/course";
import type { CourseResponse } from "@/types";
import { MinimizedCourse } from "@/components/course/section";
import Link from "next/link";
import { Button } from "@/components/ui";

/**
 * 강사인 경우 - 쿠키를 기반으로 최근 추가한 강의들을 보여주는 인증 페이지
 * TODO: 일반 유저인 경우 - 프로필 정보만
 */
export default async function AuthPage() {
  const cookieStore = await cookies();
  const rawCourseIds = cookieStore.get("recentlyAddedCourseIds")?.value;
  let courseIds: number[] = [];

  if (rawCourseIds) {
    try {
      courseIds = JSON.parse(decodeURIComponent(rawCourseIds));
    } catch {
      courseIds = [];
    }
  }

  const courses = await Promise.allSettled(
    courseIds.map((id) => fetchCourseByIdServer(id)),
  ).then((results) =>
    results
      .filter(
        (r): r is PromiseFulfilledResult<CourseResponse> =>
          r.status === "fulfilled",
      )
      .map((r) => r.value),
  );

  const [userProfile] = await Promise.all([
    fetchUserProfileFromServer().catch(() => null),
  ]);

  return (
    <>
      <Profile user={userProfile} isAuthPage={true} />
      <section className="h-full overflow-y-auto flex flex-col justify-between">
        <MinimizedCourse courses={courses} />
        <Link href="/course">
          <Button size="large" label="전체 강의 보러가기" type="button" />
        </Link>
      </section>
    </>
  );
}
