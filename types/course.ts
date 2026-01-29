//강사가 강의를 등록할 때 입력하는 필드 데이터 타입
export interface CourseFormData {
  title: string;
  description?: string;
  maxStudents: number;
  price: number;
}

// 강의를 등록할 때 api로 전달하는 데이터 타입
export interface Course extends CourseFormData {
  instructorName: string;
}

/**
 * api에서 반환 하는 강의 데이터 타입
 * @extends Course
 */
export interface CourseResponse extends Course {
  id: number;
  createdAt: string;
  isFull: boolean;
  availableSeats: number;
  currentStudents: number;
}

//페이지네이션 정보를 포함한 강의 목록 응답 타입
export interface CourseApiResponse {
  content: CourseResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// 강의 정렬 옵션 타입
export type SortOption = "recent" | "popular" | "rate";
export interface SortDropdownOptions {
  label: string;
  value: SortOption;
}

// 배치 수강 신청 결과 타입
export interface EnrollmentResponse {
  success: Array<{
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
  }>;
  failed: Array<{
    courseId: number;
    reason: string;
  }>;
}

// 수강 신청 상태 타입
export interface EnrollmentRequestStatus {
  success: boolean;
  message: string;
  data: EnrollmentResponse | null;
}
