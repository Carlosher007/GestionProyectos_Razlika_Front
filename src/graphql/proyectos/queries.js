import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyecto {
    ProyectosBasico {
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
        lider {
          _id
          nombre
          apellido
          correo
        }
        objetivos {
          _id
          descripcion
          tipo
        }
        inscripciones {
          _id
          estado
          estudiante {
            _id
            nombre
          }
        }
        avances {
          _id
        }
      }
    }
  }
`;


const MISPROYECTOS = gql`
  query VerProyectosLidero {
    VerProyectosLidero {
      succes
      errors {
        message
        path
      }
      proyecto {
        _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        lider {
          _id
          nombre
          apellido
          correo
        }
        objetivos {
          _id
          descripcion
          tipo
        }
        inscripciones {
          _id
          estado
          estudiante {
            _id
            nombre
          }
        }
        avances {
          _id
        }
      }
    }
  }
`;

const PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
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
        lider {
          _id
          nombre
          apellido
          correo
        }
        objetivos {
          _id
          descripcion
          tipo
        }
        inscripciones {
          _id
          estado
          estudiante {
            _id
            nombre
          }
        }
        avances {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS, MISPROYECTOS , PROYECTO };
