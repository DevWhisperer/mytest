import { NextRequest, NextResponse } from "next/server";

export const validateAuth = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { errorMessage: "인증이 필요합니다." },
      { status: 401 },
    );
  }

  return null;
};
