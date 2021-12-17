import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      succes
      token
      errors {
        path
        message
      }
    }
  }
`;

const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      succes
      token
      errors {
        path
        message
      }
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      succes
      token
      errors {
        path
        message
      }
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };
