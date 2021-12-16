import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation CrearAvance($descripcion: String!, $proyecto: String!) {
    crearAvance(descripcion: $descripcion, proyecto: $proyecto) {
      succes
      errors {
        message
        path
      }
      avance {
        _id
        descripcion
        observaciones {
          _id
          descripcion
        }
        fecha
      }
    }
  }
`;

const EDITAR_AVANCE = gql`
  mutation EditarAvance($idAvance: String!, $descripcion: String!) {
    editarAvance(_idAvance: $idAvance, descripcion: $descripcion) {
      succes
      errors {
        path
        message
      }
      avance {
        _id
        observaciones {
          _id
          descripcion
        }
        descripcion
        fecha
      }
    }
  }
`;

export {
CREAR_AVANCE, EDITAR_AVANCE,
};
