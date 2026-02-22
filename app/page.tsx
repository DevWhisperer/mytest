"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { ListTodo, CheckCircle2, ClipboardList } from "lucide-react";

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.get("/dashboard").then((res) => res.data),
  });

  if (isLoading) return <div className="p-10">데이터 불러오는 중...</div>;

  const cards = [
    {
      label: "일",
      value: stats?.numOfTask,
      icon: ClipboardList,
      color: "text-blue-500",
    },
    {
      label: "해야할 일",
      value: stats?.numOfRestTask,
      icon: ListTodo,
      color: "text-error",
    },
    {
      label: "한 일",
      value: stats?.numOfDoneTask,
      icon: CheckCircle2,
      color: "text-green-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm mb-1">{card.label}</p>
              <p className="text-3xl font-bold">{card.value ?? 0}개</p>
            </div>
            <card.icon className={card.color} size={40} />
          </div>
        ))}
      </div>
    </div>
  );
}
