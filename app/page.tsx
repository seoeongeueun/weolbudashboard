import { MinimizedCourse } from "@/components/course/section";
import { Profile } from "@/components/auth";
import Link from "next/link";
import { Button } from "@/components/ui";
import { fetchCoursesServer } from "@/lib/api/course";
import { fetchUserProfileFromServer } from "@/lib/api/auth-server";

export const metadata = {
  title: "월급쟁이부자들 - 홈 화면",
  description: "최근 등록된 강의와 인기 강의를 둘러보세요.",
};

export default async function Home() {
  //모든 데이터를 받을 때까지 대기 후 렌더링
  const [recentData, popularData, userProfile] = await Promise.all([
    fetchCoursesServer("recent", 6),
    fetchCoursesServer("popular", 6),
    fetchUserProfileFromServer().catch(() => null),
  ]);

  return (
    <>
      <Profile user={userProfile} />
      <div className="h-full overflow-y-auto flex flex-col justify-between">
        <section className="space-y-8">
          <MinimizedCourse sortBy="recent" data={recentData} />
          <MinimizedCourse sortBy="popular" data={popularData} />
        </section>
        <section className="text-center flex flex-col gap-4 text-black/70">
          <h3 className="text-sm py-2">그 외 더 많은 강의를 둘러보세요</h3>
          <Link href="/course">
            <Button size="large" label="전체 강의 보러가기" type="button" />
          </Link>
        </section>
      </div>
    </>
  );
}
