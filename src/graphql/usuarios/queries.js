import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
      succes
      errors {
        message
        path
      }
      usuario {
        _id
        nombre
        apellido
        identificacion
        correo
        estado
        rol
      }
    }
  }
`;

// AL PARECER ES
// query Usuario($_id: String!) {
// Usuario(_id: $_id) {
//
const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      succes
      errors {
        message
        path
      }
      usuario {
        _id
        nombre
        apellido
        identificacion
        correo
        rol
        estado
      }
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
