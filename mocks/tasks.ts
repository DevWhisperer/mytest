export type TaskItem = {
  id: string;
  title: string;
  memo: string;
  status: "TODO" | "DONE";
};

export const allTasks: TaskItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  title: `할 일 ${i + 1}`,
  memo: `메모 내용입니다. ${i + 1}`,
  status: i % 2 === 0 ? "TODO" : "DONE",
}));
