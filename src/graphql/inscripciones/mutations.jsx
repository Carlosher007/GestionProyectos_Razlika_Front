import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      succes
      errors {
        path
        message
      }
      inscripcion {
        _id
      }
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
    aprobarInscripcion(id: $aprobarInscripcionId) {
      succes
      errors {
        path
        message
      }
      inscripcion {
        _id
      }
    }
  }
`;

const DESAPROBAR_INSCRIPCION = gql`
  mutation RechazarInscripcion($rechazarInscripcionId: String!) {
    rechazarInscripcion(id: $rechazarInscripcionId) {
      succes
      errors {
        message
        path
      }
      inscripcion {
        _id
      }
    }
  }
`;


export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION, DESAPROBAR_INSCRIPCION };
