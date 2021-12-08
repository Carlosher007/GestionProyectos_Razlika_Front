import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
        estado
      }
    }
  }
`;

export { EDITAR_PROYECTO };
