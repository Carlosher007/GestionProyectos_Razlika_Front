import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
      succes
      errors {
        message
        path
      }
      usuario {
        _id
        nombre
        apellido
        identificacion
        correo
        estado
        rol
      }
    }
  }
`;

// AL PARECER ES
// query Usuario($_id: String!) {
// Usuario(_id: $_id) {
//
const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      succes
      errors {
        message
        path
      }
      usuario {
        _id
        nombre
        apellido
        identificacion
        correo
        rol
        estado
        foto
      }
    }
  }
`;

const GET_USUARIOCONTODO = gql`
  query UsuarioConTodo($_id: String!) {
    UsuarioConTodo(_id: $_id) {
      succes
      errors {
        path
        message
      }
      usuario {
        inscripciones {
          proyecto {
            _id
            nombre
            presupuesto
            fechaInicio
            fechaFin
            fase
            estado
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
            avances {
              _id
            }
            inscripciones {
              _id
            }
          }
          _id
          estado
          estudiante {
            _id
            nombre
          }
        }
        proyectosLiderados {
          _id
        }
        _id
        nombre
        apellido
        identificacion
        correo
        rol
        estado
        foto
      }
    }
  }
`;
export { GET_USUARIOS, GET_USUARIO, GET_USUARIOCONTODO };
