"use client";

import { useForm } from "react-hook-form";
import { FormInput, FormRadioGroup } from "@/components/ui";
import type { SignupFormData } from "@/types/auth";
import { Button } from "@/components/ui";

/**
 * react hook form을 이용한 회원가입 폼 컴포넌트
 * @validation
 * - 이름: 2자 이상
 * - 이메일: 표준 이메일 형식
 * - 전화번호: 휴대폰 형식 (010-XXXX-XXXX)
 * - 비밀번호: 6자 이상, 10자 이하, 영문/숫자 조합 (최소 2가지)
 */

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      role: "STUDENT", // 기본값은 일반 회원
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    // TODO: POST Signup 호출 / 에러 처리 필요
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <FormInput
        label="이름"
        id="name"
        type="text"
        placeholder="김월부"
        error={errors.name?.message}
        {...register("name", {
          required: "이름을 입력해주세요",
          minLength: { value: 2, message: "이름은 2자 이상이어야 합니다" },
        })}
      />
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
        label="전화번호"
        id="phone"
        type="tel"
        placeholder="010-1234-5678"
        error={errors.phone?.message}
        {...register("phone", {
          required: "전화번호를 입력해주세요",
          // 010으로 시작, 하이픈은 선택적
          pattern: {
            value: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
            message: "올바른 전화번호 형식이 아닙니다",
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
          /**
           * 비밀번호 정책: 영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합
           * - 소문자 + 대문자, 소문자 + 숫자, 대문자 + 숫자 중 하나 이상
           * - 특수문자는 허용하지 않음
           */
          pattern: {
            value:
              /^(?=.*[a-z].*[A-Z]|.*[A-Z].*[a-z]|.*[a-z].*\d|.*\d.*[a-z]|.*[A-Z].*\d|.*\d.*[A-Z])[a-zA-Z\d]+$/,
            message:
              "영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합이 필요합니다",
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
        label={isSubmitting ? "처리 중..." : "회원가입"}
      />
    </form>
  );
}
