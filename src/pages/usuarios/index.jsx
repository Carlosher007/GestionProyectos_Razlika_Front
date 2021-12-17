import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';
import Loading from '../loading/Loading'

const IndexUsuarios2 = () => {
  const { userData } = useUser();
  const { data, error, loading } = useQuery(GET_USUARIOS);

  // useEffect(()=>{
  //   console.log("data",data)
  // },[]);
//
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
    if(data){
      if(data.Usuarios){
        if(data.Usuarios.errors!=[]){
          if (data.Usuarios.errors[0].message){
            toast.error(data.Usuarios.errors[0].message);
          }
        }
      }
    }
  }, [error,data]);

  if (loading) return <Loading/>;

  return (
    <PrivateRoute roleList={['LIDER','ADMINISTRADOR']}>
      <div>
        Datos Usuarios:
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios.usuario ? (
              <>
                {data.Usuarios.usuario.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_EstadoUsuario[u.estado]}</td>
                      <td>
                        <Link to={`/prueba/usuarios/editar/${u._id}`}>
                          <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios2;
