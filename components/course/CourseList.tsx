import { CourseCard } from "./CourseCard";
import type { CourseResponse } from "@/types";
export function CourseList() {
  //test용 CourseCard 3개 작성
  const courses: CourseResponse[] = [
    {
      id: 1,
      title: "React 기초부터 심화까지",
      description: "이 강의는 React의 기초부터 심화 개념까지 다룹니다.",
      maxStudents: 30,
      price: 50000,
      instructorName: "홍길동",
      createdAt: "2023-01-01T00:00:00Z",
      isFull: false,
      availableSeats: 10,
      currentStudents: 20,
    },
    {
      id: 2,
      title: "TypeScript 완전 정복",
      description: "TypeScript의 모든 것을 배워봅시다.",
      maxStudents: 25,
      price: 60000,
      instructorName: "김철수",
      createdAt: "2023-02-01T00:00:00Z",
      isFull: false,
      availableSeats: 5,
      currentStudents: 20,
    },
    {
      id: 3,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 4,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 5,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 6,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 7,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 8,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 9,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
    {
      id: 10,
      title: "Next.js로 서버사이드 렌더링 배우기",
      description:
        "Next.js를 사용한 SSR과 SSG에 대해 알아봅시다. Next.js를 사용한 SSR과 SSG에 대해 알아봅시다.",
      maxStudents: 20,
      price: 70000,
      instructorName: "이영희",
      createdAt: "2023-03-01T00:00:00Z",
      isFull: true,
      availableSeats: 0,
      currentStudents: 20,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto py-2">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
