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
;

export { GET_AVANCES};
