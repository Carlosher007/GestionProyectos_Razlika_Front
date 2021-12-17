import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
//
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import { useUser } from 'context/userContext';

// DA ERROR PORQUE TINEES QUE EDITAR TOOOOOOODOOS

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);

  const { _id } = useParams();
  const [nameUser, setNameUser] = useState('');

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
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

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, campos: formData },
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
      if (mutationData) {
        if (mutationData.editarUsuario) {
          if (mutationData.editarUsuario.errors) {
            // toast.error(mutationData.editarUsuario.errors[0].message);
          }
        }
      }
    if (mutationData) {
      if (mutationData.editarUsuario) {
        if (mutationData.editarUsuario.usuario) {
          toast.success('Usuario modificado correctamente');
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

  if (queryLoading) return <div>Cargando....</div>;

  // const darValores = (parametro) => {};

  return (
    // <div className="flew flex-col w-full h-full items-center justify-center p-10">
    //   <Link to="/prueba/usuarios">
    //     <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
    //   </Link>
    //   <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
    //     Editar Usuario
    //   </h1>
    //   <form
    //     onSubmit={submitForm}
    //     onChange={updateFormData}
    //     ref={form}
    //     className="flex flex-col items-center justify-center"
    //   >
    //     <Input
    //       label="Nombre de la persona:"
    //       type="text"
    //       name="nombre"
    //       defaultValue={queryData.Usuario.usuario.nombre}
    //       style={{fontSize:"10px"}}
    //       // required={true}
    //     />
    //     <Input
    //       label="Apellido de la persona:"
    //       type="text"
    //       name="apellido"
    //       defaultValue={queryData.Usuario.usuario.apellido}
    //       // required={true}
    //     />
    //     <Input
    //       label="Correo de la persona:"
    //       type="email"
    //       name="correo"
    //       defaultValue={queryData.Usuario.usuario.correo}
    //       // required={true}
    //     />
    //     <Input
    //       label="Identificación de la persona:"
    //       type="text"
    //       name="identificacion"
    //       defaultValue={queryData.Usuario.usuario.identificacion}
    //       // required={true}
    //     />
    //     <DropDown
    //       label="Estado de la persona:"
    //       name="estado"
    //       defaultValue={queryData.Usuario.usuario.estado}
    //       // required={true}
    //       options={Enum_EstadoUsuario}
    //     />
    //     <span>Rol del usuario: {queryData.Usuario.usuario.rol}</span>
    //     <ButtonLoading
    //       disabled={Object.keys(formData).length === 0}
    //       loading={mutationLoading}
    //       text="Confirmar"
    //     />
    //   </form>
    // </div>
    <div className="p-4">
      <Link to="/prueba/usuarios">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="font-bold">Modificar Usuario: {nameUser}</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Input
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
        <span>Rol del usuario: {queryData.Usuario.usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
