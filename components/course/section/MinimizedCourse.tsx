import type { SortOption, CourseApiResponse, CourseResponse } from "@/types";
import { CourseCard } from "@/components/course";

interface MinimizedCourseProps {
  sortBy?: SortOption;
  courses: CourseResponse[];
  title?: string;
}

export function MinimizedCourse({
  sortBy = "recent",
  courses,
  title,
}: MinimizedCourseProps) {
  const getTitleText = () => {
    if (title) return title;
    switch (sortBy) {
      case "popular":
        return "현재 인기있는 강의";
      case "rate":
        return "수강률 높은 강의";
      case "recent":
      default:
        return "최근 등록된 강의";
    }
  };

  return (
    <section className="w-full h-fit">
      <h1 className="text-lg font-bold py-2">{getTitleText()}</h1>

      <div className="w-full h-52 overflow-x-auto">
        <div className="relative grid grid-flow-col auto-cols-[minmax(300px,1fr)] gap-4">
          {courses.length === 0 && (
            <p className="absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 h-full text-sm text-skeleton">
              표시할 강의가 없습니다.
            </p>
          )}
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} readonly={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
