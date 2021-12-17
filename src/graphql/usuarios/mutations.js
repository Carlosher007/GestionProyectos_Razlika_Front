import { gql } from '@apollo/client';
//
const EDITAR_USUARIO = gql`
  mutation EditarUsuario($_id: String!, $campos: editarUsuario!) {
    editarUsuario(_id: $_id, campos: $campos) {
      succes
      errors {
        path
        message
      }
      usuario {
        _id
        nombre
        foto
        apellido
        identificacion
        correo
        rol
        estado
      }
    }
  }
`;
//
export { EDITAR_USUARIO };
