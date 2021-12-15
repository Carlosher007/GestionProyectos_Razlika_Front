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
        foto
      }
    }
  }
`;


const GET_USUARIOCONTODO = gql`
  query UsuarioConTodo($_id: String!) {
    UsuarioConTodo(_id: $_id) {
      succes
      errors {
        path
        message
      }
      usuario {
        _id
        nombre
        apellido
        identificacion
        correo
        rol
        estado
        foto
        inscripciones {
          _id
        }
        proyectosLiderados {
          _id
        }
      }
    }
  }
`;
export { GET_USUARIOS, GET_USUARIO, GET_USUARIOCONTODO };
