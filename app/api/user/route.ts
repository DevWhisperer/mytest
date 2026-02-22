import { NextRequest, NextResponse } from "next/server";
import { validateAuth } from "../utils";

export type UserResponseSuccess = {
  name: string;
  memo: string;
};

export async function GET(request: NextRequest) {
  const authError = validateAuth(request);
  if (authError) return authError;

  const responseData: UserResponseSuccess = {
    name: "최승호",
    memo: "프론트엔드 개발자 과제 제출용 데이터입니다.",
  };

  return NextResponse.json(responseData, { status: 200 });
}
