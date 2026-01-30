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
 * 기본 - 최근 수강신청한 강의 목록 (최대 6개)
 */
export default async function AuthPage() {
  const cookieStore = await cookies();
  const rawCourseIds = cookieStore.get("recentlyAddedCourseIds")?.value;
  const rawEnrolledIds = cookieStore.get("enrolledCourseIds")?.value;
  let recentCourseIds: number[] = [];
  let enrolledCourseIds: number[] = [];

  const [userProfile] = await Promise.all([
    fetchUserProfileFromServer().catch(() => null),
  ]);

  if (rawCourseIds && userProfile?.role === "INSTRUCTOR") {
    try {
      recentCourseIds = JSON.parse(decodeURIComponent(rawCourseIds));
    } catch {
      recentCourseIds = [];
    }
  }

  if (rawEnrolledIds) {
    try {
      enrolledCourseIds = JSON.parse(decodeURIComponent(rawEnrolledIds));
    } catch {
      enrolledCourseIds = [];
    }
  }

  const fetchCoursesByIds = async (ids: number[]) => {
    return Promise.allSettled(ids.map((id) => fetchCourseByIdServer(id))).then(
      (results) =>
        results
          .filter(
            (r): r is PromiseFulfilledResult<CourseResponse> =>
              r.status === "fulfilled",
          )
          .map((r) => r.value),
    );
  };

  const [recentCourses, enrolledCourses] = await Promise.all([
    fetchCoursesByIds(recentCourseIds),
    fetchCoursesByIds(enrolledCourseIds),
  ]);

  return (
    <>
      <Profile user={userProfile} isAuthPage={true} />
      <div className="flex flex-col justify-between h-full overflow-hidden">
        <section className="h-full overflow-y-auto flex flex-col space-y-8">
          <MinimizedCourse
            title="최근 수강 신청한 강의"
            courses={enrolledCourses}
          />
          {userProfile?.role === "INSTRUCTOR" && (
            <MinimizedCourse
              title="최근 등록한 나의 강의"
              courses={recentCourses}
            />
          )}
        </section>
        <Link href="/course">
          <Button size="large" label="전체 강의 보러가기" type="button" />
        </Link>
      </div>
    </>
  );
}
