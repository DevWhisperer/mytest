import { NextRequest, NextResponse } from "next/server";
import { allTasks } from "@/mocks/tasks";
import { validateAuth } from "../utils";

export async function GET(request: NextRequest) {
  const authError = validateAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = 10;
  const start = (page - 1) * limit;

  await new Promise((resolve) => setTimeout(resolve, 500));

  const paginatedTasks = allTasks.slice(start, start + limit);

  return NextResponse.json(paginatedTasks, { status: 200 });
}
