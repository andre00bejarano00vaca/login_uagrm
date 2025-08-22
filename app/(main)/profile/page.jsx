"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          setError(resData.error);
        } else {
          setData(resData);
        }
      })
      .catch(() => setError("Error al cargar datos"));
  }, []);

  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (!data) return <p style={{ padding: "20px" }}>Cargando...</p>;

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
