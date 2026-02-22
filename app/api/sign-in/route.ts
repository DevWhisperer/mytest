import generateFakeJWT from "@/mocks/generateFakeJWT";
import { NextResponse } from "next/server";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponseSuccess = {
  accessToken: string;
  refreshToken: string;
};

export async function POST(request: Request) {
  try {
    const { email }: SignInRequest = await request.json();

    if (email === "fail@test.com") {
      return NextResponse.json(
        { errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 400 },
      );
    }

    const accessToken = generateFakeJWT(email, 30);
    const refreshToken = generateFakeJWT(email, 60 * 24 * 7);

    const responseData = {
      accessToken,
      refreshToken,
    };

    const response = NextResponse.json(responseData, { status: 200 });

    response.cookies.set("token", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { errorMessage: "잘못된 요청입니다." },
      { status: 400 },
    );
  }
}
