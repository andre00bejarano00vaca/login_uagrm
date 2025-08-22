import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth")?.value;

  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch("https://api-graphql-django-smiz.onrender.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query estudiantePorRegistro($registro: String!) {
            estudiantePorRegistro(registro: $registro) {
              registro
              apellidosNombres
              ci
              email
              sexo
              estadoCivil
              fechaNacimiento
              pais
              departamento
              provincia
              nacionalidad
              direccion
              telefono
            }
          }
        `,
        variables: { registro: "218110001" }, // puedes recibirlo desde query params
      }),
    });

    const data = await res.json();
    if (data.errors) return NextResponse.json({ error: data.errors[0].message }, { status: 400 });

    return NextResponse.json(data.data.estudiantePorRegistro);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al conectar con GraphQL" }, { status: 500 });
  }
}
