import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $descripcion: String!
    $proyecto: String!
    $observaciones: [crearObservaciones]
  ) {
    crearAvance(
      descripcion: $descripcion
      proyecto: $proyecto
      observaciones: $observaciones
    ) {
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
  mutation EditarAvance($idAvance: String!, $campos: camposAvance) {
    editarAvance(_idAvance: $idAvance, campos: $campos) {
      succes
      errors {
        message
        path
      }
      avance {
        fecha
        descripcion
        _id
        observaciones {
          _id
          descripcion
        }
      }
    }
  }
`;


const CREAROBSERVACION = gql`
  mutation CrearObservacion($idAvance: String!, $campos: camposObservacion!) {
    crearObservacion(idAvance: $idAvance, campos: $campos) {
      succes
      errors {
        message
        path
      }
      avance {
        _id
        fecha
        descripcion
        observaciones {
          descripcion
          _id
        }
      }
    }
  }
`;

const EDITAROBSERVACION = gql`
  mutation EditarObservacion(
    $idAvance: String!
    $indexObservacion: Int!
    $campos: editarCamposObservacion!
  ) {
    editarObservacion(
      idAvance: $idAvance
      indexObservacion: $indexObservacion
      campos: $campos
    ) {
      succes
      errors {
        path
        message
      }
      avance {
        _id
        fecha
        descripcion
        observaciones {
          _id
          descripcion
        }
      }
    }
  }
`;

const ELIMINAROBSERVACION = gql`
  mutation EliminarObservacion($idAvance: String!, $idOb: String!) {
    eliminarObservacion(idAvance: $idAvance, idOb: $idOb) {
      succes
      errors {
        path
        message
      }
      avance {
        observaciones {
          _id
          descripcion
        }
        _id
      }
    }
  }
`;
// const EDITAR_AVANCE = gql`

// `;


export {
CREAR_AVANCE, EDITAR_AVANCE, CREAROBSERVACION, EDITAROBSERVACION, ELIMINAROBSERVACION
};

//