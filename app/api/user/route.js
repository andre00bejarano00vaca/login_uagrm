import { NextResponse } from "next/server";

export async function POST(req) {
  const { registro, password } = await req.json();
  console.log(registro)
  console.log(password)

  const res = await fetch("https://api-graphql-django-smiz.onrender.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
let errorMessage = "Login failed";
if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
  errorMessage = data.errors[0].message; // tomar el primer mensaje
  console.log(data)
}

return NextResponse.json({ error: errorMessage }, { status: 401 });

}