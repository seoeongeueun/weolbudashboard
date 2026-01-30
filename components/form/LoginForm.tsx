"use client";

import { useForm } from "react-hook-form";
import { FormInput, FormRadioGroup } from "@/components/ui";
import { Button, Message, Modal } from "@/components/ui";
import { loginUser } from "@/lib/api/auth";
import type { RequestStatus, LoginFormData } from "@/types";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<RequestStatus>({ type: "idle" });

  // 렌더링시 쿼리 파라미터에 따라 모달 표시 여부 결정
  const showModal = useMemo<boolean>(() => {
    return params.get("reason") === "auth";
  }, [params]);

  //모달을 닫을 때는 url에서 reason 쿼리 파라미터를 제거
  const closeModal = () => {
    const next = new URLSearchParams(params.toString());
    next.delete("reason");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    try {
      const result = await loginUser(data);

      setStatus({
        type: "success",
        message: "로그인 성공: 메인 페이지로 이동합니다.",
      });

      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "오류가 발생했습니다.";
      console.error("로그인 실패: ", message);
      setStatus({ type: "error", message });
    }
  };

  return (
    <>
      {showModal && <Modal type="login-required" onClose={closeModal} />}
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
        <Message status={status} />
        <Button
          type="submit"
          disabled={isSubmitting || status.type === "success"}
          label={isSubmitting ? "처리 중..." : "로그인"}
          variant="primary"
          size="large"
        />
      </form>
    </>
  );
}
