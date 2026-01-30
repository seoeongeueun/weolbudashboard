import { AddCourseForm } from "@/components/form";
import { fetchUserProfileFromServer } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function AddCoursePage() {
  //강사 권한이 없는 유저는 홈으로 리다이렉트
  const user = await fetchUserProfileFromServer();
  if (!user || user.role !== "INSTRUCTOR") {
    redirect("/");
  }

  return <AddCourseForm />;
}
