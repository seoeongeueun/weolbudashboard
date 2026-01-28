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

// 강의 정렬 옵션 타입
export type SortOption = "latest" | "mostStudents" | "highestStudentRate";
export interface SortDropdownOptions {
  label: string;
  value: SortOption;
}
