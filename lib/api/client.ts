//API 요청 에러 클래스
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
};

/**
 * API 요청 헬퍼 함수
 *
 * @description
 * fetch를 래핑하여 에러 처리와 JSON 파싱을 통합
 *
 * @throws {ApiError} 요청 실패 시 발생
 *
 * @example
 * const data = await apiRequest<CourseResponse[]>('/api/courses');
 */
export async function apiRequest<T>(
  url: string,
  {
    method = "GET",
    data,
    headers,
    credentials,
    signal,
  }: ApiRequestOptions = {},
): Promise<T> {
  const init: RequestInit = {
    method,
    headers: {
      ...(data ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(credentials ? { credentials } : {}),
    signal,
  };

  if (data !== undefined) {
    init.body = JSON.stringify(data);
  }

  const res = await fetch(url, init);

  // 응답이 JSON인지 안전하게 파싱
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const body = isJson
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => undefined);

  if (!res.ok) {
    const errorMessage = body?.message || body?.error || "Request failed";
    throw new ApiError(errorMessage, res.status, body);
  }

  return body as T;
}
