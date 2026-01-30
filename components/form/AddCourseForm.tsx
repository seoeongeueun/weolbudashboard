"use client";
import type { CourseFormData } from "@/types";
import { FormInput } from "@/components/ui";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui";
import { addCourse } from "@/lib/api/courses";
import { Modal } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ModalState = "success" | "error" | null; // 모달 상태로 모달에 노출할 메시지를 구분한다

/**
 * 새 강의 추가 폼 컴포넌트
 *
 * @validation
 * - 강의명: 필수
 * - 설명: 선택
 * - 수강 인원: 필수, 숫자
 * - 가격: 필수, 숫자
 *
 */
export function AddCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>();

  const router = useRouter();
  const [modal, setModal] = useState<ModalState>(null);

  const onSubmit = async (data: CourseFormData) => {
    try {
      await addCourse(data);
      setModal("success");
    } catch (error) {
      console.error("Failed to add course:", error);
      setModal("error");
    }
  };

  const handleClose = () => {
    setModal(null);

    // 강의를 등록 성공한 경우에만 강의 목록 페이지로 이동
    if (modal === "success") {
      router.push("/course");
    }
  };

  return (
    <>
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
      {modal && (
        <Modal
          type={modal === "error" ? "course-failure" : "course-added"}
          onClose={handleClose}
        />
      )}
    </>
  );
}
