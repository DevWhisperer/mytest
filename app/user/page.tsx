"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User, Notebook } from "lucide-react";
import { ErrorResponse } from "../api/type";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { api } from "@/api/axios";

export default function UserInfoPage() {
  const { logout, userId } = useAuthStore();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<{ name: string; memo: string }, AxiosError<ErrorResponse>>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user");
      return res.data;
    },
    enabled: !!userId,
    retry: false,
  });

  if (isLoading)
    return <div className="p-8 text-center">사용자 정보를 불러오는 중...</div>;

  if (isError)
    return (
      <div className="p-8 text-center text-error">
        <p>정보를 불러오지 못했습니다.</p>
        <p className="text-sm">
          {error?.response?.data?.errorMessage || "알 수 없는 에러"}
        </p>
      </div>
    );

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border p-8 mt-10">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <User className="text-primary" size={40} />
        </div>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
            <Notebook size={16} />
            <span>자기소개 / 메모</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {user?.memo || "등록된 메모가 없습니다."}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 text-gray-500 hover:text-error transition-colors text-sm underline"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
