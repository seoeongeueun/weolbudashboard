"use client";

import { useForm } from "react-hook-form";
import { FormInput, FormRadioGroup } from "@/components/ui";
import type { LoginFormData } from "@/types/auth";
import { Button } from "@/components/ui";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      role: "STUDENT", // 기본값은 일반 회원
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // TODO: POST Login 호출 / 에러 처리 필요
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <FormInput
        label="이메일"
        id="email"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "올바른 이메일 형식이 아닙니다",
          },
        })}
      />

      <FormInput
        label="비밀번호"
        id="password"
        type="password"
        placeholder="********"
        error={errors.password?.message}
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 6, //최소 6자
            message: "비밀번호는 6자 이상이어야 합니다",
          },
          maxLength: {
            value: 10, //최대 10자
            message: "비밀번호는 10자 이하여야 합니다",
          },
        })}
      />
      <FormRadioGroup
        legend="회원 유형"
        options={[
          { label: "회원", value: "STUDENT" },
          { label: "강사", value: "INSTRUCTOR" },
        ]}
        error={errors.role?.message}
        {...register("role", {
          required: "회원 유형을 선택해주세요",
        })}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        label={isSubmitting ? "처리 중..." : "로그인"}
        variant="primary"
        size="large"
      />
    </form>
  );
}
