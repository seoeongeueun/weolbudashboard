"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "@/lib/config";
import { redirect } from "next/navigation";
import type { EnrollmentResponse, EnrollmentRequestStatus } from "@/types";

/**
 * 배치 수강 신청
 * @description 여러 강의를 한 번에 수강 신청합니다.
 * - 인증이 필요합니다
 * - 부분 성공을 지원합니다 (일부 강의만 성공하더라도 반영)
 * - CourseList form에서 checkbox selected 강의들을 일괄 신청
 *
 * @returns 수강 신청 결과 상태
 * - 성공: { success: true, message: string, data: EnrollmentResponse }
 * - 실패: { success: false, message: string, data: null }
 */
export async function enrollCourses(
  prevState: EnrollmentRequestStatus | null,
  formData: FormData,
): Promise<EnrollmentRequestStatus> {
  // 인증된 유저인지 쿠키로 확인
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/auth/login");
  }

  // form에서 선택된 강의 ID들 파싱
  const courseIds = formData.getAll("courseId") as string[];
  const parsedIds = courseIds.map(Number);

  if (parsedIds.length === 0) {
    return {
      success: false,
      message: "수강할 강의를 선택해주세요.",
      data: null,
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/api/enrollments/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ courseIds: parsedIds }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "수강 신청에 실패했습니다.",
        data: null,
      };
    }

    const result: EnrollmentResponse = await response.json();

    // 성공과 실패 결과가 섞여있음 (부분 성공도 요청 성공으로)
    return {
      success: true,
      message: "수강 신청이 완료되었습니다.",
      data: result,
    };
  } catch (error) {
    console.error("수강 신청 에러:", error);
    return {
      success: false,
      message: "알 수 없는 에러가 발생했습니다.",
      data: null,
    };
  }
}
