/**
 * 영문 주소 세그먼트를 한글 라벨로 변환
 * @param segment 영문 주소 세그먼트
 * @returns string 번역된 주소 라벨
 */
export function getLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    course: "강의 목록",
    add: "강의 등록",
    auth: "회원정보",
    login: "로그인",
    signup: "회원가입",
  };

  return labelMap[segment] || segment;
}

/**
 * 16진수 색상을 주어진 비율만큼 더 밝게 변환
 * @example lightenColor("#1f5af2", 0.2) → "#6b91f7"
 */
export function lightenColor(color: string, amount: number = 0.2): string {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);

  const r = Math.min(255, Math.round((num >> 16) + 255 * amount));
  const g = Math.min(255, Math.round(((num >> 8) & 0x00ff) + 255 * amount));
  const b = Math.min(255, Math.round((num & 0x0000ff) + 255 * amount));

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

// 숫자를 한국 전화번호 형식으로 변환 ***-****-****
export function formatKoreanPhone(value: string) {
  // 숫자만 남기기
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}
/**
 * Role을 한글로 변환
 * @param role Role
 * @returns string 한글 역할명
 */
import { Role } from "@/types/auth";

export function getRoleLabel(role: Role): string {
  const roleMap: Record<Role, string> = {
    STUDENT: "회원",
    INSTRUCTOR: "강사",
  };
  return roleMap[role] || role;
}

/**
 * 강의 배치 수강 신청 상태를 받아서 부분 실패 여부를 판단
 * 성공한 강의는 넘어간다
 *
 * @returns string 실패한 강의 이유를 중복 없이 나열한 문자열
 */
import type { EnrollmentRequestStatus } from "@/types";

export function parseEnrollmentStatus(status: EnrollmentRequestStatus): string {
  if (!status.data) {
    return "수강 신청 결과를 불러올 수 없습니다.";
  }

  if (status.data.failed.length === 0) {
    return "선택된 모든 강의를 수강 신청했습니다.";
  }

  // 실패한 이유들을 중복 없이 수집
  const reasons = new Set<string>(
    status.data.failed.map((course) => course.reason),
  );

  let result = `${status.data.failed.length}/${status.data.success.length + status.data.failed.length}개 실패`;

  reasons.forEach((reason) => {
    result += `\n[${reason}]\n`;
  });
  return result;
}
