"use client";
import type { CourseFormData } from "@/types";
import { FormInput } from "@/components/ui";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui";

/**
 * 새 강의 추가 폼 컴포넌트
 *
 * @validation
 * - 강의명: 필수
 * - 설명: 선택
 * - 수강 인원: 필수, 숫자
 * - 가격: 필수, 숫자
 *
 * @todo
 * - POST /api/courses 엔드포인트 연동
 * - 성공 시 강의 목록 페이지로 리다이렉트
 * - 실패 시 에러 메시지 표시
 */
export function AddCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>();

  const onSubmit = async (data: CourseFormData) => {
    console.log(data);
    // TODO: POST /api/courses 엔드포인트 호출 / 에러 처리 필요
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <FormInput
        label="강의명"
        id="title"
        type="text"
        placeholder="너나위의 내집마련 기초반"
        error={errors.title?.message}
        required={true}
        {...register("title", {
          required: "강의 제목을 입력해주세요",
        })}
      />
      <FormInput
        label="설명"
        id="description"
        type="text"
        placeholder="강의에 대한 설명을 입력해주세요"
        error={errors.description?.message}
        {...register("description")}
      />
      <FormInput
        label="수강 인원"
        id="maxStudents"
        type="number"
        placeholder="30"
        required={true}
        error={errors.maxStudents?.message}
        {...register("maxStudents", {
          required: "최대 수강 가능 인원을 입력해주세요",
          valueAsNumber: true, // 문자열이 아닌 숫자로 변환
        })}
      />
      <FormInput
        label="가격"
        id="price"
        type="number"
        required={true}
        placeholder="10000"
        error={errors.price?.message}
        {...register("price", {
          required: "강의 가격을 입력해주세요",
          valueAsNumber: true, // 문자열이 아닌 숫자로 변환
        })}
      />

      <Button type="submit" disabled={isSubmitting} label="등록하기"></Button>
    </form>
  );
}
