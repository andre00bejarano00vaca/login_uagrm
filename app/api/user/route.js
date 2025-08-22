import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth")?.value;

  const { registro, password } = await req.json();

  // Hacer POST a tu backend GraphQL
  const res = await fetch("https://api-graphql-dijango-smiz.onrender.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken ?? ""}`,
    },
    body: JSON.stringify({
      query: `
        mutation Login($registro: String!, $password: String!) {
          login(registro: $registro, password: $password) {
            token
            user { id username email }
          }
        }
      `,
      variables: { registro, password },
    }),
  });

  const data = await res.json();

  // Guardar token en cookie segura si login es correcto
  if (data?.data?.login?.token) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: "auth",
      value: data.data.login.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Login failed" }, { status: 401 });
}
