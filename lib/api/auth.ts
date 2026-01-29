import type { SignupFormData, LoginFormData, UserProfile } from "@/types";
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

/**
 * 로그인 폼의 데이터로 API 호출
 * @param payload LoginFormData 로그인 폼 데이터
 * @returns API 응답 (에러 처리는 apiRequest에서 처리됨)
 */
export async function loginUser(payload: LoginFormData) {
  return await apiRequest("/api/users/login", {
    method: "POST",
    data: payload,
  });
}

/**
 * 유저 정보를 가져오는 API 호출
 * @returns 유저 정보 (이름 + 역할)
 */
export async function fetchUserProfile() {
  const data = await apiRequest<{ user: UserProfile | null }>(
    "/api/users/profile",
  );
  return data.user;
}
