import { gql } from '@apollo/client';
//
const EDITAR_USUARIO = gql`
  mutation EditarUsuarioD(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuarioD(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
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
      }
    }
  }
`;

export { EDITAR_USUARIO };
