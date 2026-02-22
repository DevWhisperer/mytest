const generateFakeJWT = (id: string, expiresInMinutes: number) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      id: id,
      exp: Math.floor(Date.now() / 1000) + expiresInMinutes * 60,
    }),
  );
  const signature = "fake-signature";
  return `${header}.${payload}.${signature}`;
};

export default generateFakeJWT;
