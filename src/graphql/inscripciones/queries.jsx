import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      succes
      errors {
        path
        message
      }
      inscripcion {
        _id
        estudiante {
          _id
          nombre
          apellido
          correo
        }
        estado
        proyecto {
          _id
          nombre
          lider {
            _id
          }
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
