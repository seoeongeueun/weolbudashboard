import { apiRequest } from "./client";
import type { CourseFormData } from "@/types";

export async function addCourse(payload: CourseFormData) {
  return await apiRequest("/api/courses/add", {
    method: "POST",
    data: payload,
  });
}
