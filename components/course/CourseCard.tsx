import type { CourseResponse } from "@/types";
import { Tag } from "@/components/ui";
import { TAGS, RECENT_DAYS_THRESHOLD } from "@/lib/constants";

export interface CourseCardProps {
  course: CourseResponse;
  isChecked?: boolean;
  readonly?: boolean; // 체크박스 노출 여부
  onCheckboxChange?: (isChecked: boolean) => void;
}

/**
 * 강의 카드 컴포넌트
 * @description
 * - 강의 정보 표시 (제목, 설명, 강사명, 가격, 수강생 현황)
 * - 태그 표시 (신규, 마감, 인기)
 * - 체크박스: 수강 신청용 (readonly 모드에서 숨김)
 */
export function CourseCard({
  course,
  isChecked = false,
  readonly = false,
  onCheckboxChange,
}: CourseCardProps) {
  const tags = [];

  // createdAt이 현재로부터 기준 일 (RECENT_DAYS_THRESHOLD) 이내면 "신규" 태그 추가
  const createdAt = new Date(course.createdAt);
  const now = new Date();
  const diffInDays =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (diffInDays <= RECENT_DAYS_THRESHOLD) {
    tags.push(TAGS.find((tag) => tag.label === "신규")!);
  }

  // 마감 임박 태그 (현재 수강생이 최대 수강생의 90% 이상일때 ) (100퍼도 추가)
  if (course.currentStudents / course.maxStudents >= 0.9) {
    tags.push(TAGS.find((tag) => tag.label === "인기")!);
  }

  return (
    <article className="shrink-0 relative w-full h-48 p-2 flex gap-2 flex-col shadow-sm rounded-sm">
      <figure className="w-full h-[60%] bg-skeleton rounded-sm relative">
        {!readonly && !course.isFull && (
          <input
            type="checkbox"
            name="courseId"
            value={course.id}
            checked={isChecked}
            onChange={(e) => onCheckboxChange?.(e.target.checked)}
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
      {course.isFull && (
        <div className="bg-black/20 w-full h-full flex items-center justify-center rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-secondary">
          <span aria-label="마감">마감</span>
        </div>
      )}
    </article>
  );
}
