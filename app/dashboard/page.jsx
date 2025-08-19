"use client";

import { useEffect, useState } from "react";
import { makeClient } from "@/lib/graphqlClient";
import { gql } from "graphql-request";

const QUERY_ESTUDIANTE = gql`
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
`;

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const registro = localStorage.getItem("registro");

    if (!token || !registro) {
      setError("No hay sesión activa");
      return;
    }

    const client = makeClient(token);

    client
      .request(QUERY_ESTUDIANTE, { registro })
      .then((res) => setData(res.estudiantePorRegistro))
      .catch(() => setError("Error al cargar datos"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido {data.apellidosNombres}</h1>
      <p><b>Registro:</b> {data.registro}</p>
      <p><b>Email:</b> {data.email}</p>
      <p><b>CI:</b> {data.ci}</p>
      <p><b>Sexo:</b> {data.sexo}</p>
      <p><b>Estado Civil:</b> {data.estadoCivil}</p>
      <p><b>Fecha Nacimiento:</b> {data.fechaNacimiento}</p>
      <p><b>País:</b> {data.pais}</p>
      <p><b>Departamento:</b> {data.departamento}</p>
      <p><b>Provincia:</b> {data.provincia}</p>
      <p><b>Nacionalidad:</b> {data.nacionalidad}</p>
      <p><b>Dirección:</b> {data.direccion}</p>
      <p><b>Teléfono:</b> {data.telefono}</p>
    </div>
  );
}
