export interface CourseFormData {
  title: string;
  description?: string;
  maxStudents: number;
  price: number;
}

export interface Course extends CourseFormData {
  instructorName: string;
}

export type SortOption = "latest" | "mostStudents" | "highestStudentRate";
export interface SortDropdownOptions {
  label: string;
  value: SortOption;
}
