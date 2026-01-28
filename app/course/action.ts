"use server";

/**
 * 강의 수강신청 Server Actions
 * form action을 통해 서버에서만 실행됨
 */
export async function enrollCourses(formData: FormData) {
  // checkbox들의 value를 배열로 수집
  const courseIds = formData.getAll("courseId") as string[];
  const parsedIds = courseIds.map(Number);

  console.log("수강신청 요청:", parsedIds);

  // TODO: 인증 확인 / api 호출
}
