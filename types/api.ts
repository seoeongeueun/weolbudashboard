// 요청 상태를 나타내는 타입
export type RequestStatus =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };
