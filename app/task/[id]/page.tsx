"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TaskDetailItem } from "@/app/api/task/[id]/route";
import { api } from "@/api/axios";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<TaskDetailItem>();
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    api
      .get(`/task/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => {
        setError(true);
      });
  }, [id]);

  if (error)
    return (
      <div className="text-center mt-20">
        <p className="text-xl mb-4">리소스를 찾을 수 없습니다.</p>
        <button
          onClick={() => router.push("/task")}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          목록으로 돌아가기
        </button>
      </div>
    );

  if (!task) return <div>로딩 중...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border shadow-sm">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-500 mb-8">{task.registerDatetime}</p>
      <div className="p-4 bg-gray-50 rounded-lg mb-8">{task.memo}</div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-error text-white px-6 py-2 rounded-lg"
      >
        삭제
      </button>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">정말 삭제하시겠습니까?</h2>
            <p className="text-sm text-gray-600 mb-4">
              확인을 위해 ID
              <span className="font-mono font-bold text-error">{id}</span>를
              입력해주세요.
            </p>
            <input
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full border p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-error"
              placeholder="ID 입력"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                취소
              </button>
              <button
                disabled={deleteInput !== id}
                onClick={() => router.push("/task")}
                className={cn(
                  "flex-1 py-2 rounded text-white",
                  deleteInput === id
                    ? "bg-error"
                    : "bg-disabled cursor-not-allowed",
                )}
              >
                제출
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
