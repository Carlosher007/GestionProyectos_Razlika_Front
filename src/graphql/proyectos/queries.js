import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query ProyectosBasico {
    ProyectosBasico {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
        nombre
        lider {
          _id
          correo
        }
        estado
        objetivos {
          descripcion
          tipo
        }
        inscripciones {
          estado
          estudiante {
            _id
          }
        }
      }
    }
  }
`;

export { PROYECTOS };
