/**
 * 영문 주소 세그먼트를 한글 라벨로 변환
 * @param segment 영문 주소 세그먼트
 * @returns string 번역된 주소 라벨
 */
export function getLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    course: "강의 목록",
    add: "등록",
    auth: "회원",
    login: "로그인",
    signup: "회원가입",
  };

  return labelMap[segment] || segment;
}
