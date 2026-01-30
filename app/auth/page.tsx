import { Profile } from "@/components/auth";
import { fetchUserProfileFromServer } from "@/lib/actions/auth";

export default async function AuthPage() {
  const [userProfile] = await Promise.all([
    fetchUserProfileFromServer().catch(() => null),
  ]);

  return (
    <>
      <Profile user={userProfile} isAuthPage={true} />
      <section className="h-full overflow-y-auto"></section>
    </>
  );
}
