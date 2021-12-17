import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import { uploadFormData } from 'utils/uploadFormData';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import Nav from 'components/Nav';
import 'styles/nav.css';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';
import Loading from 'pages/loading/Loading';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const GestionPerfil = () => {
  const [editFoto, setEditFoto] = useState(false);
  const { form, formData, updateFormData } = useFormData(null);
  const [nameUser, setNameUser] = useState('');
  const { userData, setUserData } = useUser();
  const _id = userData._id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });
  useEffect(() => {
    if (queryData) {
      if (queryData.Usuario) {
        if (queryData.Usuario.usuario) {
          setNameUser(queryData.Usuario.usuario.nombre);
        }
      }
    }
  }, [queryData]);

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  const submitForm = async (e) => {
    e.preventDefault();
    delete formData.rol;
    const formUploaded = await uploadFormData(formData);
    if (formUploaded.foto) {
      if (formUploaded.foto.name === '') {
        delete formUploaded.foto;
      }
    } else {
      delete formUploaded.foto;
    }
    // console.log(formUploaded.foto.name)
    editarUsuario({
      variables: { _id, campos: formUploaded },
    });
  };

  useEffect(() => {
    if (mutationData) {
      if (mutationData.editarUsuario) {
        if (mutationData.editarUsuario.errors) {
          if (mutationData.editarUsuario.errors[0]) {
            toast.error(mutationData.editarUsuario.errors[0].message);
          }
        }
      }
    }
    if (mutationData) {
      if (mutationData.editarUsuario) {
        if (mutationData.editarUsuario.usuario) {
          setUserData({
            ...userData,
            foto: mutationData.editarUsuario.usuario.foto,
          });
          toast.success('Usuario modificado correctamente');
          refetch();
        }
      }
    }
  }, [mutationData]);


  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <Loading />;

  return (
    <PrivateRoute roleList={['LIDER', 'ADMINISTRADOR', 'ESTUDIANTE']}>
      <div class="divNav">
        <Nav titulo="Gestion perfil" />
      </div>
      <div className="bodyBackgroundWhite">
        <div className="p-4">
          <Link to="/usuarios">
            <AiOutlineLeftCircle
              style={{
                fontSize: '40px',
                background: '#F8EDEB',
                marginLeft: '10px',
                color: 'black',
              }}
            />
          </Link>
          <h1 className="font-bold" style={{ color: 'black' }}>
            Modificar Usuario: {nameUser}
          </h1>
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className="flex flex-col items-center"
          >
            <Input
              style={{ color: 'white' }}
              label="Nombre de la persona:"
              type="text"
              name="nombre"
              defaultValue={queryData.Usuario.usuario.nombre}
              // required={true}
            />
            <Input
              label="Apellido de la persona:"
              type="text"
              name="apellido"
              defaultValue={queryData.Usuario.usuario.apellido}
              // required={true}
            />
            <Input
              label="Correo de la persona:"
              type="email"
              name="correo"
              defaultValue={queryData.Usuario.usuario.correo}
              // required={true}
            />
            <Input
              label="Identificación de la persona:"
              type="text"
              name="identificacion"
              defaultValue={queryData.Usuario.usuario.identificacion}
              // required={true}
            />
            <DropDown
              label="Estado de la persona:"
              name="estado"
              defaultValue={queryData.Usuario.usuario.estado}
              // required={true}
              options={Enum_EstadoUsuario}
            />
            {queryData.Usuario.usuario.foto && !editFoto ? (
              <>
                <img
                  className="h-32"
                  src={queryData.Usuario.usuario.foto}
                  alt="Foto Usuario"
                />
                <butoon
                  onClick={() => {
                    setEditFoto(true);
                  }}
                  className="bg-indigo-300 hover:bg-indigo-700 p-1 m-y2 rounded-md text-white"
                >
                  Cambiar Imagen
                </butoon>
              </>
            ) : (
              <>
                <Input
                  label="Foto:"
                  type="file"
                  name="foto"
                  // defaultValue={queryData.Usuario.usuario.foto}
                  // required={true}
                />
                <butoon
                  onClick={() => {
                    setEditFoto(false);
                  }}
                  className="bg-indigo-300 hover:bg-indigo-700 p-1 m-y2 rounded-md text-white"
                >
                  Cancelar
                </butoon>
              </>
            )}
            {/* {queryData.Usuario.usuraio.foto!=null && !editFoto ? (
              <div className="flex flex-col items-center">
                <img
                  className="h-32"
                  src={queryData.Usuario.usuario.foto}
                  alt="Foto Usuario"
                />
                <button
                  onClick={() => setEditFoto(true)}
                  className="bg-indigo-300 p-1 my-2 rounded-md text-white"
                >
                  Cambiar imagen
                </button>
              </div>
            ) : (
              <div>
                <Input label="Foto" name="foto" type="file" required={true} />
                <button
                  onClick={() => setEditFoto(false)}
                  className="bg-indigo-300 p-1 my-2 rounded-md text-white"
                >
                  Cancelar
                </button>
              </div>
            )} */}
            <span>Rol del usuario: {queryData.Usuario.usuario.rol}</span>
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Confirmar"
            />
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default GestionPerfil;
