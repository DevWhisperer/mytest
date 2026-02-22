import { NextRequest, NextResponse } from "next/server";
import { allTasks } from "@/mocks/tasks";
import { validateAuth } from "../../utils";

export type TaskDetailItem = {
  id: string;
  title: string;
  memo: string;
  status: "TODO" | "DONE";
  registerDatetime: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = validateAuth(request);
  if (authError) return authError;

  const { id } = await params;

  const task = allTasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json(
      { errorMessage: "해당 리소스를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  const responseData: TaskDetailItem = {
    ...task,
    registerDatetime: new Date().toISOString(),
  };

  return NextResponse.json(responseData, { status: 200 });
}
