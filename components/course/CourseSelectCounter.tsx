"use client";
import { useEffect, useState } from "react";

/**
 * form에 change 이벤트 리스너를 달아 체크된 강의 개수를 센다
 * @returns integer 선택된 강의 개수
 */

export function CourseSelectCounter() {
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const form = document.querySelector("#course-enroll-form");
    if (!form) return;

    const updateCount = () => {
      const checked = form.querySelectorAll('input[name="courseId"]:checked');
      setSelectedCount(checked.length);
    };

    updateCount();

    form.addEventListener("change", updateCount);
    return () => form.removeEventListener("change", updateCount);
  }, []);

  return <div className="text-sm">선택된 강의 {selectedCount}개</div>;
}
