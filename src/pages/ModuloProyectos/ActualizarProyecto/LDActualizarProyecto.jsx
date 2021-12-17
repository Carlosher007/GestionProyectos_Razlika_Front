import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { PROYECTO } from 'graphql/proyectos/queries';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import DropDown from 'components/Dropdown';
import { Enum_FaseProyecto } from 'utils/enums';
import { Enum_EstadoProyecto } from 'utils/enums';
import Nav from 'components/Nav';
import 'styles/nav.css';
import Imagenes from 'assets/Imagenes';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';
import Loading from 'pages/loading/Loading';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const LDActualizarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const [nameProyecto, setNameProyecto] = useState('');
  const { userData } = useUser();
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(PROYECTO, {
    variables: { _id },
  });

  useEffect(() => {
    if (queryData) {
      if (queryData.Proyecto) {
        if (queryData.Proyecto.proyecto) {
          setNameProyecto(queryData.Proyecto.proyecto.nombre);
        }
      }
    }
  }, [queryData]);

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  useEffect(() => {
    if (mutationData) {
      if (mutationData.editarProyecto) {
        if (mutationData.editarProyecto.errors) {
          if (mutationData.editarProyecto.errors[0]) {
            toast.error(mutationData.editarProyecto.errors[0].message);
          }
        }
      }
    }
    if (mutationData) {
      if (mutationData.editarProyecto) {
        if (mutationData.editarProyecto.proyecto) {
          toast.success('Proyecto modificado correctamente');
        }
      }
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el proyecto');
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryError, mutationError]);

  const submitForm = (e) => {
    e.preventDefault();
    if (queryData.Proyecto.proyecto.estado === 'INACTIVO') {
      e.preventDefault();
      toast.error('No puede moficiarlo pues el estado esta en inactivo');
    } else {
      e.preventDefault();
      if (formData.fechaFin === '') {
        console.log(true);
        formData.fechaFin = queryData.Proyecto.proyecto.fechaFin;
      }
      if (formData.fechaInicio === '') {
        console.log(true);
        formData.fechaInicio = queryData.Proyecto.proyecto.fechaInicio;
      }

      formData.presupuesto = parseFloat(formData.presupuesto);

      editarProyecto({
        variables: {
          _id,
          campos: formData,
        },
      });
      console.log(mutationData);
      console.log(formData);
    }
  };

  if (queryLoading) return <Loading />;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div class="divNav">
        <Nav titulo="Actualizar Proyecto" />
      </div>
      <div className="bodyBackgroundWhite">
        <div className="p-4">
          <Link to="/proyecto">
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
            Modificar Proyecto: {nameProyecto}
          </h1>
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className="flex flex-col items-center"
          >
            <Input
              style={{ color: 'white' }}
              label="Nombre del Proyecto:"
              type="text"
              name="nombre"
              defaultValue={queryData.Proyecto.proyecto.nombre}
              // required={true}
            />
            <Input
              label="Presupuesto:"
              type="text"
              name="presupuesto"
              defaultValue={queryData.Proyecto.proyecto.presupuesto}
              // required={true}
            />
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

export default LDActualizarProyecto;
