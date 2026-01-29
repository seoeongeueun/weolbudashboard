import type { SignupFormData } from "@/types/auth";
import { apiRequest } from "./client";

/**
 * 회원가입 폼의 데이터로 API 호출
 * @param payload SignupFormData 회원가입 폼 데이터
 * @returns API 응답 (에러 처리는 apiRequest에서 처리됨)
 */
export async function signupUser(payload: SignupFormData) {
  return await apiRequest("/api/users/signup", {
    method: "POST",
    data: payload,
  });
}
