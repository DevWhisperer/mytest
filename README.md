### 💡 추가 구현 사항

- **[POST] /api/sign-out**: 보안 강화를 위해 클라이언트의 상태 초기화뿐만 아니라, 서버 측 `HttpOnly` 쿠키(refreshToken)를 명시적으로 삭제하는 로그아웃 API를 추가로 구현하였습니다.
