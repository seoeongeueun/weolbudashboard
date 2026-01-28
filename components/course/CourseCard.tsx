import type { CourseResponse } from "@/types";
import { Tag } from "@/components/ui";

export interface CourseCardProps {
  course: CourseResponse;
}

export function CourseCard({ course }: CourseCardProps) {
  const tags = [
    { label: "무료", color: "#1f5af2" },
    { label: "인기", color: "#AB50DE" },
    { label: "신규", color: "#B8DE50" },
  ];

  return (
    <article className="w-full h-48 p-2 flex gap-2 flex-col shadow-sm rounded-sm">
      <div
        className="w-full h-[60%] bg-skeleton rounded-sm"
        aria-hidden="true"
      ></div>
      <div className="flex flex-col gap-1 justify-between w-full h-[40%] truncate">
        <h2 className="font-bold text-base">{course.title}</h2>
        <p className="text-xs text-skeleton overflow-hidden overflow-ellipsis">
          {course.description}
        </p>
        <footer className="flex flex-row justify-between items-center gap-1">
          <span className="text-xs">{`${course.instructorName} 강사`}</span>
          <div
            className="flex flex-row w-fit gap-1"
            role="region"
            aria-label="강의 태그"
          >
            {tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} color={tag.color} />
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
