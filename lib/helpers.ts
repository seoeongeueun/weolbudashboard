/**
 * 영문 주소 세그먼트를 한글 라벨로 변환
 * @param segment 영문 주소 세그먼트
 * @returns string 번역된 주소 라벨
 */
export function getLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    course: "강의 목록",
    add: "강의 등록",
    auth: "회원",
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
