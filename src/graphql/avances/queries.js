import { gql } from '@apollo/client';

const GET_AVANCES = gql`
  query Avances {
    Avances {
      succes
      errors {
        message
        path
      }
      avance {
        _id
        fecha
        observaciones {
          _id
          descripcion
        }
        descripcion
        proyecto {
          _id
        }
      }
      usuario {
        _id
        nombre
      }
    }
  }
`;
const GET_FILTRARAVANCES = gql`
  query FiltrarAvance($_idProyecto: String!) {
    filtrarAvance(_idProyecto: $_idProyecto) {
      succes
      errors {
        message
        path
      }
      avance {
        descripcion
        fecha
        _id
        observaciones {
          _id
          descripcion
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
          }
        }
        creadoPor {
          _id
          nombre
          apellido
        }
      }
    }
  }
`;
export { GET_AVANCES, GET_FILTRARAVANCES };
//