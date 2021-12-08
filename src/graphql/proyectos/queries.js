import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query ProyectosConTodo {
    ProyectosConTodo {
      succes
      errors {
        path
        message
      }
      proyecto {
        _id
        nombre
        estado
        objetivos {
          descripcion
          tipo
        }
        lider {
          _id
          correo
        }
      }
    }
  }
`;

export { PROYECTOS };
