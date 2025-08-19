import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation Login($registro: String!, $password: String!) {
    login(registro: $registro, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ESTUDIANTE_POR_REGISTRO = gql`
  query Estudiante($registro: String!) {
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
      celular
      modalidadIngreso
      periodo
      tipoSangre
      tituloBachiller
    }
  }
`;
