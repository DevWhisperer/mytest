"use client";

import { useForm } from "react-hook-form";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInRequest } from "../api/sign-in/route";
import axios, { AxiosError } from "axios";
import Modal from "@/components/modal/Modal";
import { useAuthStore } from "@/store/authStore";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuthStore();
  const [errorModalMsg, setErrorModalMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignInRequest>({
    mode: "onChange",
  });

  const onSubmit = async (data: SignInRequest) => {
    try {
      await login(data);

      const callbackUrl = searchParams.get("callback") || "/";
      router.push(callbackUrl);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ errorMessage: string }>;
        const msg =
          axiosError.response?.data?.errorMessage || "로그인에 실패했습니다.";
        setErrorModalMsg(msg);
      } else {
        setErrorModalMsg("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4 font-pretendard">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          로그인
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="text"
              placeholder="email@example.com"
              {...register("email", {
                required: "이메일은 필수 입력 항목입니다.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "유효한 이메일 형식이 아닙니다.",
                },
              })}
              className={cn(
                "w-full px-4 py-3 border rounded-xl outline-none transition-all",
                errors.email
                  ? "border-error bg-error/10"
                  : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary",
              )}
            />
            {errors.email && (
              <span className="text-xs text-error ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="8~24자 영문, 한글, 숫자"
              {...register("password", {
                required: "비밀번호는 필수 입력 항목입니다.",
                minLength: {
                  value: 8,
                  message: "최소 8글자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 24,
                  message: "최대 24글자 이하이어야 합니다.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/,
                  message: "영문, 한글, 숫자로만 구성되어야 합니다.",
                },
              })}
              className={cn(
                "w-full px-4 py-3 border rounded-xl outline-none transition-all",
                errors.password
                  ? "border-error bg-error/10"
                  : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary",
              )}
            />
            {errors.password && (
              <span className="text-xs text-error ml-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-white transition-all shadow-md",
              isValid
                ? "bg-primary active:scale-[0.98] cursor-pointer"
                : "bg-gray-300 cursor-not-allowed shadow-none",
            )}
          >
            제출
          </button>
        </form>
      </div>

      <Modal
        open={!!errorModalMsg}
        onOpenChange={() => setErrorModalMsg(null)}
        errorModalMsg={errorModalMsg || ""}
      />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          로딩 중...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
