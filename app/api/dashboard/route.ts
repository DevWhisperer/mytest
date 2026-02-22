import { NextRequest, NextResponse } from "next/server";
import { allTasks } from "@/mocks/tasks";
import { validateAuth } from "../utils";

export type DashboardResponseSuccess = {
  numOfTask: number;
  numOfRestTask: number;
  numOfDoneTask: number;
};

export async function GET(request: NextRequest) {
  const authError = validateAuth(request);
  if (authError) return authError;

  await new Promise((resolve) => setTimeout(resolve, 300));

  const responseData: DashboardResponseSuccess = {
    numOfTask: allTasks.length,
    numOfRestTask: allTasks.filter((t) => t.status === "TODO").length,
    numOfDoneTask: allTasks.filter((t) => t.status === "DONE").length,
  };

  return NextResponse.json(responseData, { status: 200 });
}
