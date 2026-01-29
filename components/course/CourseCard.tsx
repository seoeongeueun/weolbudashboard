import type { CourseResponse } from "@/types";
import { Tag } from "@/components/ui";

export interface CourseCardProps {
  course: CourseResponse;
  isChecked?: boolean;
  readonly?: boolean; // 체크박스 노출 여부
  onCheckboxChange?: (isChecked: boolean) => void;
}

export function CourseCard({
  course,
  isChecked = false,
  readonly = false,
}: CourseCardProps) {
  const tags = [
    { label: "무료", color: "#1f5af2" },
    { label: "인기", color: "#AB50DE" },
    { label: "신규", color: "#B8DE50" },
  ];

  return (
    <article className="w-full h-48 p-2 flex gap-2 flex-col shadow-sm rounded-sm">
      <figure className="w-full h-[60%] bg-skeleton rounded-sm relative">
        {!readonly && (
          <input
            type="checkbox"
            name="courseId"
            value={course.id}
            className="absolute z-20 -left-2 -top-2 w-6 h-6 opacity-90 rounded-sm accent-theme outline:ring-2 outline-theme cursor-pointer"
            aria-label={`${course.title} 강의 선택`}
          />
        )}
        <figcaption className="absolute bottom-0 flex flex-col items-end justify-between gap-1 p-2 w-full h-full">
          <div
            className="text-xs rounded-sm w-fit text-white bg-black/20 px-2 py-1 drop-shadow-xs"
            aria-label="수강생 현황"
          >
            {`${course.currentStudents} / ${course.maxStudents}명`}
          </div>
          <div
            className="flex flex-row w-fit gap-1"
            role="region"
            aria-label="강의 태그"
          >
            {tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} color={tag.color} />
            ))}
          </div>
        </figcaption>
      </figure>
      <div className="flex flex-col gap-0.5 justify-between w-full h-[40%] truncate">
        <h2 className="font-bold text-base overflow-hidden overflow-ellipsis">
          {course.title}
        </h2>
        <p className="text-xs text-skeleton overflow-hidden overflow-ellipsis">
          {course.description}
        </p>
        <footer className="flex flex-row justify-between items-center gap-1">
          <address className="text-xs not-italic">{`${course.instructorName} 강사`}</address>
          <span className="text-xs" aria-label="가격">
            {course.price === 0 ? "무료" : `${course.price.toLocaleString()}원`}
          </span>
        </footer>
      </div>
    </article>
  );
}
