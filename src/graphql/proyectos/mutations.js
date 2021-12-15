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
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
      }
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
      }
    }
  }
`;

const EDITAR_OBJETIVO = gql`
  mutation EditarObjetivo(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivod!
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
        nombre
        objetivos {
          tipo
        }
      }
    }
  }
`;

const ELIMINAR_OBJETIVO = gql`
  mutation EliminarObjetivo($idProyecto: String!, $idObjetivo: String!) {
    eliminarObjetivo(idProyecto: $idProyecto, idObjetivo: $idObjetivo) {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
        objetivos {
          _id
          descripcion
        }
      }
    }
  }
`;

const CREAR_OBJETIVO = gql`
  mutation CrearObjetivo($idProyecto: String!, $campos: camposObjetivo!) {
    crearObjetivo(idProyecto: $idProyecto, campos: $campos) {
      succes
      errors {
        message
        path
      }
      proyecto {
        _id
        nombre
        objetivos {
          _id
          descripcion
          tipo
        }
      }
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, ELIMINAR_OBJETIVO, EDITAR_OBJETIVO , CREAR_OBJETIVO};
