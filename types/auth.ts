// 사용자 역할 타입 정의
export type Role = "STUDENT" | "INSTRUCTOR";

// 회원가입 폼 필드 데이터
export interface SignupFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: Role;
}

/**
 * 로그인 폼 데이터
 * SignupFormData에서 email, password, role만 사용
 */
export type LoginFormData = Pick<SignupFormData, "email" | "password" | "role">;

export interface LoginApiResponse {
  accessToken: string;
  tokenType: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
    phone: string;
  };
}
