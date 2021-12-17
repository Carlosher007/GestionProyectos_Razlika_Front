import React, { useEffect, useState } from 'react';
import Imagenes from 'assets/Imagenes';
import Input from 'components/Input';
import { BiCalendarEdit } from 'react-icons/bi';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS, MISPROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { CREAR_OBJETIVO } from 'graphql/proyectos/mutations';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { FcEditImage } from 'react-icons/fc';
import Nav from 'components/Nav';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import 'styles/nav.css';
import 'styles/cards.css';
import { useUser } from 'context/userContext';
import Loading from 'pages/loading/Loading';
import PrivateRoute from 'components/PrivateRoute';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { ELIMINAR_OBJETIVO } from 'graphql/proyectos/mutations';
import { EDITAR_OBJETIVO } from 'graphql/proyectos/mutations';

//

import {
  ProjectQueryContext,
  useQueryContext,
} from 'context/projectQueryContext';
import { useProjectQuery } from 'context/projectQueryContext';
import ReactLoading from 'react-loading';
import { Enum_TipoObjetivo } from 'utils/enums';

const VerProyectosMisProyectosLider = () => {
  const { data: queryData, loading, error, refetch } = useQuery(MISPROYECTOS);

  useEffect(() => {
    if (queryData) {
      if (queryData.VerProyectosLidero) {
        if (queryData.VerProyectosLidero.errors) {
          if (queryData.VerProyectosLidero.errors[0]) {
            toast.error(queryData.VerProyectosLidero.errors[0].message);
          }
        }
      }
    }
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [queryData, error]);

  if (loading) return <Loading />;

  return (
    <ProjectQueryContext.Provider value={{ queryData, refetch }}>
      <PrivateRoute roleList={['LIDER']}>
        <div class="divNav">
          <Nav titulo="Ver mis Proyectos" />
        </div>
        <div style={{ background: '#313131' }}>
          <Link to="/proyecto">
            <AiOutlineLeftCircle
              style={{
                fontSize: '40px',
                background: '#312a3f',
                marginLeft: '10px',
              }}
            />
          </Link>
        </div>
        <div className="bodyBackgroundDark">
          <div class="bodyMiPerfil">
            <PrivateComponent roleList={['LIDER']}>
              <div className="flex justify-end mx-20">
                <button className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400">
                  <Link to="/proyecto/nuevo">Crear nuevo proyecto</Link>
                </button>
              </div>
            </PrivateComponent>
            {queryData && queryData.VerProyectosLidero.proyecto ? (
              <div className="bodyCards">
                <div className="containerCardds">
                  {queryData.VerProyectosLidero.proyecto.map((proyecto) => {
                    return <Card proyecto={proyecto} />;
                  })}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </PrivateRoute>
    </ProjectQueryContext.Provider>
  );
};

const Card = ({ proyecto }) => {
  const { userData } = useUser();
  const [estado, setEstado] = useState('card');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);

  var inscripciones = 0;
  var objetivos = 0;
  var avances = 0;

  let more = document.querySelectorAll('.more');
  for (let i = 0; i < more.length; i++) {
    more[i].addEventListener('click', function () {
      more[i].parentNode.classList.toggle('activate');
    });
  }
  const numeroInscripciones = () => {
    proyecto.inscripciones.map((inscripcion) => {
      inscripciones++;
    });
    return inscripciones;
  };
  const numeroObjetivos = () => {
    proyecto.objetivos.map((objetivo) => {
      objetivos++;
    });
    return objetivos;
  };
  const numeroAvances = () => {
    proyecto.avances.map((avance) => {
      avances++;
    });
    return avances;
  };

  const capitalize = (str) => {
    if (str != null) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }
  };
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  useEffect(() => {
    if (userData && proyecto.inscripciones) {
      const flt = proyecto.inscripciones.filter(
        // (el) => el.estudiante._id === userData._id
        (el) => el.estudiante._id
        // (el) => console.log(el._id)
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, proyecto]);

  return (
    // <div className="bodyCards">
    //
    //   <div className="container">
    <>
      <div className={estado}>
        <div className="icon">
          {<img src={Imagenes[21].img} alt="Imagen Proyecto" />}
        </div>
        <div className="content">
          {/* <PrivateComponent roleList={['LIDER']}>
            <i
              className="mx-4 fas fa-pen text-white hover:text-blue-400"
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent> */}
          <h3>Proyecto: {proyecto.nombre}</h3>
          <h3>Estado: {capitalize(proyecto.estado)}</h3>
          <div>
              <PrivateComponent roleList={['ESTUDIANTE', 'LIDER']}>
                <Link to={`/avances/${proyecto._id}`}>
                  <BiCalendarEdit
                    style={{
                      fontSize: '40px',
                      background: 'transparent',
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  />
                </Link>
              </PrivateComponent>
          </div>
          <div>
            <PrivateComponent roleList={['LIDER']}>
              <Link to={`/proyecto/editar/${proyecto._id}`}>
                <FcEditImage
                  style={{
                    fontSize: '40px',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                />
              </Link>
            </PrivateComponent>
          </div>
          <p>
            <span style={{ color: '#BEE1E6' }}>Id: </span>
            {proyecto._id} <br />
            <span style={{ color: '#BEE1E6' }}>Lider: </span>{' '}
            {proyecto.lider.nombre} {proyecto.lider.apellido} <br />
            <span style={{ color: '#BEE1E6' }}>Presupuesto: </span>
            {proyecto.presupuesto} <br />
            <span style={{ color: '#BEE1E6' }}>Fecha Inicio: </span>{' '}
            {proyecto.fechaInicio}
            <br />
            <span style={{ color: '#BEE1E6' }}>Fecha Fin: </span>{' '}
            {proyecto.fechaFin} <br />
            {/* <span style={{ color: '#BEE1E6' }}>Estado: </span>{' '}
          {capitalize(proyecto.estado)} <br /> */}
            <span style={{ color: '#BEE1E6' }}>Fase: </span>{' '}
            {capitalize(proyecto.fase)} <br />
            <span style={{ color: '#BEE1E6' }}>Inscripciones: </span>{' '}
            {numeroInscripciones()}
            <br />
            <span style={{ color: '#BEE1E6' }}>Objetivos: </span>{' '}
            {numeroObjetivos()}
            <br />
            <span style={{ color: '#BEE1E6' }}>Avances: </span>{' '}
            {numeroAvances()}
            <br />
            <PrivateComponent roleList={['ESTUDIANTE']}>
              <InscripcionProyecto
                idProyecto={proyecto._id}
                estado={proyecto.estado}
                inscripciones={proyecto.inscripciones}
              />
            </PrivateComponent>
            <div className="flex flex-col bg-slate-200">
              {proyecto.objetivos.map((objetivo, index) => {
                return (
                  <Objetivo
                    index={index}
                    _id={objetivo._id}
                    idProyecto={proyecto._id}
                    tipo={objetivo.tipo}
                    descripcion={objetivo.descripcion}
                    idObjetivo={objetivo._id}
                  />
                );
              })}
            </div>
            {proyecto.objetivos.length < 4 && (
              <PrivateComponent roleList={['LIDER']}>
                <i
                  className="mx-4 fas fa-plus-square text-white hover:text-blue-400 flex justify-center "
                  onClick={() => {
                    setShowDialog2(true);
                  }}
                />
              </PrivateComponent>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            if (estado === 'card') {
              setEstado('card activate');
            } else {
              setEstado('card');
            }
          }}
        >
          <a className="more"></a>
        </button>
      </div>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
      <Dialog
        open={showDialog2}
        onClose={() => {
          setShowDialog2(false);
        }}
      >
        <FormCreateObjetivo
          idProyecto={proyecto._id}
          setShowEditDialog={setShowDialog2}
        />
      </Dialog>
    </>
    //   </div>
    // </div>
  );
};

const FormCreateObjetivo = ({ idProyecto, setShowEditDialog }) => {
  const { form, formData, updateFormData } = useFormData();
  const { refetch } = useProjectQuery();

  const [
    crearObjetivo,
    { data: dataMutationd, error: errorMutationd, loading: loadingMutationd },
  ] = useMutation(CREAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutationd) {
      if (dataMutationd.crearObjetivo) {
        if (dataMutationd.crearObjetivo.proyecto) {
          // refetch();
          toast.success('Objetivo creado con exto  con exito');
          setShowEditDialog(false);
        }
      }
    }
    if (dataMutationd) {
      if (dataMutationd.crearObjetivo) {
        if (dataMutationd.crearObjetivo.errors) {
          if (dataMutationd.crearObjetivo.errors[0]) {
            toast.error(dataMutationd.crearObjetivo.errors[0].message);
          }
        }
      }
    }
  }, [dataMutationd, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    crearObjetivo({
      variables: {
        idProyecto,
        campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error('Error editando el objetivo');
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjetivo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutationd}
        />
      </form>
    </div>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.editarProyecto) {
        if (dataMutation.editarProyecto.errors) {
          if (dataMutation.editarProyecto.errors[0]) {
            toast.error(dataMutation.editarProyecto.errors[0].message);
          }
        }
      }
    }
    if (error) {
      toast.error('Error editando el proyecto');
    }
    if (dataMutation) {
      if (dataMutation.editarProyecto) {
        if (dataMutation.editarProyecto.proyecto) {
          toast.success('Proyecto editado');
        }
      }
    }
  }, [dataMutation, error]);

  return (
    <div className="p-4 toastContainerZIndex">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const Objetivo = ({ index, _id, idProyecto, idObjetivo, tipo, descripcion }) => {
  const { refetch } = useProjectQuery();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [
    eliminarObjetivo,
    {
      data: dataMutationEliminar,
      loading: loadingEliminar,
      error: errorEliminar,
    },
  ] = useMutation(ELIMINAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutationEliminar) {
      if (dataMutationEliminar.eliminarObjetivo) {
        if (dataMutationEliminar.eliminarObjetivo.errors) {
          if (dataMutationEliminar.eliminarObjetivo.errors[0]) {
            toast.error(
              dataMutationEliminar.eliminarObjetivo.errors[0].message
            );
          }
        }
      }
    }
    if (errorEliminar) {
      toast.error('Error al eliminar el objetivo');
    }
    if (dataMutationEliminar) {
      console.log('iiiii');
      if (dataMutationEliminar.eliminarObjetivo) {
        console.log('eee');

        if (dataMutationEliminar.eliminarObjetivo.success) {
          // refetch();
          toast.success('Objetivo eliminado');
        }
      }
    }
  }, [dataMutationEliminar, errorEliminar, refetch]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
    console.log(dataMutationEliminar);
  };

  if (loadingEliminar)
    return (
      <ReactLoading
        data-testid="loading-in-button"
        type="spin"
        height={100}
        width={100}
      />
    );
  return (
    <div className="mx-5 my-4 bg-slate-200 p-8 rounded-lg flex flex-col  items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{idObjetivo}</div>
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['LIDER']}>
        <div>
          <i
            onClick={() => {
              setShowEditDialog(true);
            }}
            className="fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer"
          />
          <i
            onClick={ejecutarEliminacion}
            className="fas fa-trash mx-2 text-red-500 hover:text-red-200 cursor-pointer"
          />
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idProyecto={idProyecto}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const { refetch } = useProjectQuery();

  const [
    editarObjetivo,
    { data: dataMutationd, error: errorMutationd, loading: loadingMutationd },
  ] = useMutation(EDITAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutationd) {
      if (dataMutationd.editarObjetivo) {
        if (dataMutationd.editarObjetivo.proyecto) {
          // refetch();
          toast.success('Objetivo editado con exito');
          setShowEditDialog(false);
        }
      }
    }
    if (dataMutationd) {
      if (dataMutationd.editarObjetivo) {
        if (dataMutationd.editarObjetivo.errors) {
          if (dataMutationd.editarObjetivo.errors[0]) {
            toast.error(dataMutationd.editarObjetivo.errors[0].message);
          }
        }
      }
    }
  }, [dataMutationd, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error('Error editando el objetivo');
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutationd}
        />
      </form>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        // (el) => el.estudiante._id === userData._id
        (el) => el.estudiante._id
        // (el) => console.log(el._id)
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  const confirmarInscripcion = () => {
    console.log(idProyecto, userData._id);
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };
  const capitalize = (str) => {
    if (str != null) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }
  };
  return (
    <>
      {estadoInscripcion !== '' ? (
        <span>
          Ya estas inscrito en este proyecto y el estado es:{' '}
          {capitalize(estadoInscripcion)}
        </span>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      )}
    </>
  );
};

export default VerProyectosMisProyectosLider;
