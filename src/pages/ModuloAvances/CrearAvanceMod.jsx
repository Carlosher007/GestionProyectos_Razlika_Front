import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { PROYECTOS } from 'graphql/proyectos/queries';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import Nav from 'components/Nav';
import 'styles/nav.css';
import { toast } from 'react-toastify';
import Loading from 'pages/loading/Loading';
import PrivateRoute from 'components/PrivateRoute';

const CrearAvanceMod = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaProyectos, setListaProyectos] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'ESTUDIANTE', estado: 'AUTORIZADO' },
    },
  });

  const { data: dataProyecto, loading: loadingProyecto, error:errorProyecto } = useQuery(PROYECTOS, {
    variables: {
      filtro: { estado: 'ACTIVO'},
    },
  });

  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

    useEffect(() => {
      if (dataProyecto) {
        if (dataProyecto.ProyectosBasico) {
          if (dataProyecto.ProyectosBasico.proyecto) {
            const lu = {};
            dataProyecto.ProyectosBasico.proyecto.forEach((elemento) => {
              lu[elemento._id] = elemento.nombre ;
            });
            setListaProyectos(lu);
          }
        }
      }
    }, [dataProyecto]);

  useEffect(() => {
    if (mutationData) {
      if (mutationData.crearAvance) {
        if (mutationData.crearAvance.errors) {
          if (mutationData.crearAvance.errors[0]) {
            toast.error(mutationData.crearAvance.errors[0].message);
          }
        }
      }
    }
    if (mutationError) {
      toast.error('Error consultando los avances');
    }
    if (mutationData) {
      if (mutationData.crearAvance) {
        if (mutationData.crearAvance.avance) {
          toast.success('Avance creado con exito');
        }
      }
    }
  }, [mutationData, mutationError]);

  const submitForm = (e) => {
    e.preventDefault();

    if (formData.observaciones) {
      formData.observaciones = Object.values(formData.observaciones);
    }

    crearAvance({
      variables: formData,
    });
    e.target.reset();
  };

  if (loading) return <Loading />;

  return (
    <PrivateRoute roleList={['ESTUDIANTE']}>
      <div class="divNav">
        <Nav titulo="Crear Avance" />
      </div>
      <div className="bodyBackgroundWhite">
        <div className="p-10 flex flex-col items-center">
          <div className="self-start">
            <Link to="/proyecto">
              <i className="fas fa-arrow-left" />
            </Link>
          </div>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input
              name="descripcion"
              label="Descripcion del avance"
              required={true}
              type="text"
            />
            <DropDown
              label="Proyecto"
              options={listaProyectos}
              name="proyecto"
              required={true}
            />
            {/* <Observaciones /> */}
            <ButtonLoading
              text="Crear Proyecto"
              loading={false}
              disabled={false}
            />
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

const Observaciones = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Observaciones del Avance</span>
        {!maxObjetivos && (
          <i
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
            className="fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer"
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className="flex items-center">
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label="Descripción"
        type="text"
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className="fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6"
      />
    </div>
  );
};

export default CrearAvanceMod;
