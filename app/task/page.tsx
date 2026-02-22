"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { api } from "@/api/axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TaskItem } from "@/mocks/tasks";

export default function TaskListPage() {
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TaskItem[]>({
      queryKey: ["tasks"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get<TaskItem[]>(`/task?page=${pageParam}`);
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < 10 ? undefined : allPages.length + 1;
      },
      initialPageParam: 1,
    });

  const allItems: TaskItem[] = data?.pages.flat() || [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return (
    <div className="max-w-3xl mx-auto h-[90vh] flex flex-col p-4 font-[Pretendard]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">할 일 목록</h1>

      <div
        ref={parentRef}
        className="flex-1 overflow-auto border border-gray-200 rounded-2xl bg-white shadow-inner custom-scrollbar"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allItems.length - 1;
            const task = allItems[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="p-2"
              >
                {isLoaderRow ? (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
                    새로운 목록을 불러오는 중...
                  </div>
                ) : (
                  <Link href={`/task/${task.id}`} className="block h-full">
                    <div className="border border-gray-100 rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer h-full shadow-sm flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900 truncate">
                          {task.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-xs font-bold",
                            task.status === "DONE"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700",
                          )}
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="text-gray-500 line-clamp-1 text-sm italic">
                        {task.memo}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
