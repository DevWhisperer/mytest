import { NextRequest, NextResponse } from "next/server";
import generateFakeJWT from "@/mocks/generateFakeJWT";

export type RefreshResponseSuccess = {
  accessToken: string;
  refreshToken: string;
};

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { errorMessage: "유효한 리프레시 토큰이 없습니다." },
      { status: 400 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  const accessToken = generateFakeJWT("user123", 30);
  const refreshTokenNew = generateFakeJWT("user123", 60 * 24 * 7);

  const responseData = {
    accessToken,
    refreshToken: refreshTokenNew,
  };

  const response = NextResponse.json(responseData, { status: 200 });

  response.cookies.set("token", refreshTokenNew, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
