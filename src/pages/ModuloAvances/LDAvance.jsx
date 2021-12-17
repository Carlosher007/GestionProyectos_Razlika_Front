import React, { useEffect, useState } from 'react';
import Imagenes from 'assets/Imagenes';
import Input from 'components/Input';
import { PROYECTO } from 'graphql/proyectos/queries';
import { GET_FILTRARAVANCES } from 'graphql/avances/queries';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import { EDITAR_AVANCE } from 'graphql/avances/mutations';
import { EDITAROBSERVACION } from 'graphql/avances/mutations';
import { ELIMINAROBSERVACION } from 'graphql/avances/mutations';
import { CREAROBSERVACION } from 'graphql/avances/mutations';




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
import { useParams, Link } from 'react-router-dom';
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
import { GET_AVANCES } from 'graphql/avances/queries';

const LDAva = () => {
  const { _id } = useParams();
  const {
    data: queryData,
    error,
    loading,
    refetch,
  } = useQuery(PROYECTO, {
    variables: { _id },
  });

  const {
    data: queryDataAvance,
    error: errorAvance,
    loading: loadingAvance,
  } = useQuery(GET_FILTRARAVANCES, {
    variables: { _idProyecto: _id },
  });

  useEffect(() => {
    if (queryDataAvance) {
      if (queryDataAvance.filtrarAvance) {
        if (queryDataAvance.filtrarAvance.errors) {
          if (queryDataAvance.filtrarAvance.errors[0]) {
            toast.error(queryDataAvance.filtrarAvance.errors[0].message);
          }
        }
      }
    }
    if (errorAvance) {
      toast.error('Error consultando el proyecto');
    }
    console.log(queryDataAvance);
  }, [queryDataAvance, errorAvance]);

  useEffect(() => {
    if (queryData) {
      if (queryData.Proyecto) {
        if (queryData.Proyecto.errors) {
          if (queryData.Proyecto.errors[0]) {
            toast.error(queryData.Proyecto.errors[0].message);
          }
        }
      }
    }
    if (error) {
      toast.error('Error consultando el proyecto');
    }
  }, [queryData, error]);

  if (loading) return <Loading />;

  return (
    <ProjectQueryContext.Provider value={{ queryData, refetch }}>
      <PrivateRoute roleList={['LIDER', 'ESTUDIANTE']}>
        <div class="divNav">
          <Nav titulo="Ver Más Info del Proyecto" />
        </div>
        <div style={{ background: '#313131' }}>
          <PrivateComponent roleList={['ESTUDIANTE']}>
            <Link to="/proyecto/verestd">
              <AiOutlineLeftCircle
                style={{
                  fontSize: '40px',
                  background: '#312a3f',
                  marginLeft: '10px',
                }}
              />
            </Link>
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <Link to="/proyecto/vermisproyectoslider">
              <AiOutlineLeftCircle
                style={{
                  fontSize: '40px',
                  background: '#312a3f',
                  marginLeft: '10px',
                }}
              />
            </Link>
          </PrivateComponent>
        </div>
        <div className="bodyBackgroundDark">
          <div class="bodyMiPerfil">
            <PrivateComponent roleList={['ESTUDIANTE']}>
              <div className="flex justify-end mx-20">
                <button className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400">
                  <Link to="/avances/crear">Crear nuevo avance</Link>
                </button>
              </div>
            </PrivateComponent>
            {queryDataAvance && queryDataAvance.filtrarAvance.avance ? (
              <div className="bodyCards">
                <div className="containerCardds">
                  <Card proyecto={queryData.Proyecto.proyecto} />;
                  {queryDataAvance.filtrarAvance.avance.map((avanced) => {
                    return <CardAvances avance={avanced} />;
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
          <PrivateComponent roleList={['LIDER']}>
            <i
              className="mx-4 fas fa-pen text-white hover:text-blue-400"
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent>
          <h3>Proyecto: {proyecto.nombre}</h3>
          <h3>Estado: {capitalize(proyecto.estado)}</h3>
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

const Objetivo = ({
  index,
  _id,
  idProyecto,
  idObjetivo,
  tipo,
  descripcion,
}) => {
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

const CardAvances = ({ avance }) => {
  const [estado, setEstado] = useState('card');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  var observaciones = 0;

  let more = document.querySelectorAll('.more');
  for (let i = 0; i < more.length; i++) {
    more[i].addEventListener('click', function () {
      more[i].parentNode.classList.toggle('activate');
    });
  }
  const numeroObservaciones = () => {
    avance.observaciones.map((observacion) => {
      observaciones++;
    });
    return observaciones;
  };

  const capitalize = (str) => {
    if (str != null) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }
  };
  return (
    // <div className="bodyCards">
    //
    //   <div className="container">
    <>
      <div className={estado}>
        <div className="icon">
          {<img src={Imagenes[20].img} alt="Imagen Avance" />}
        </div>
        <div className="content">
          <PrivateComponent roleList={['ESTUDIANTE']}>
            <i
              className="mx-4 fas fa-pen text-white hover:text-blue-400"
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent>
          <h3>Avances del Proyecto: {avance.proyecto.nombre}</h3>
          <p>
            <span style={{ color: '#BEE1E6' }}>ID: </span>
            {avance._id} <br />
            <span style={{ color: '#BEE1E6' }}>Descripcion: </span>
            {avance.descripcion} <br />
            <span style={{ color: '#BEE1E6' }}>Fecha: </span> {avance.fecha}{' '}
            <br />
            <span style={{ color: '#BEE1E6' }}>Creado Por: </span>
            {avance.creadoPor.nombre} {avance.creadoPor.apellido} <br />
            <span style={{ color: '#BEE1E6' }}>Obseravaciones: </span>{' '}
            {numeroObservaciones()}
            <br />
            <div className="flex flex-col bg-slate-200">
              {avance.observaciones.map((observacion, index) => {
                return (
                  <Observacion
                    index={index}
                    _id={observacion._id}
                    idAvance={avance._id}
                    descripcion={observacion.descripcion}
                    idObservacion={observacion._id}
                  />
                );
              })}
            </div>
            {avance.observaciones.length < 4 && (
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
        <FormEditAvance _id={avance._id} descripcion={avance.descripcion} fecha={avance.fecha} />
      </Dialog>
      <Dialog
        open={showDialog2}
        onClose={() => {
          setShowDialog2(false);
        }}
      >
        <FormCreateObservacion
          idAvance={avance._id}
          setShowEditDialog={setShowDialog2}
        />
      </Dialog>
    </>
    //   </div>
    // </div>
  );
};

const FormCreateObservacion = ({ idAvance, setShowEditDialog }) => {
  const { form, formData, updateFormData } = useFormData();
  const { refetch } = useProjectQuery();

  const [
    crearObservacion,
    { data: dataMutationd, error: errorMutationd, loading: loadingMutationd },
  ] = useMutation(CREAROBSERVACION, {
    refetchQueries: [{ query: GET_AVANCES}],
  });

  useEffect(() => {
    if (dataMutationd) {
      if (dataMutationd.crearObservacion) {
        if (dataMutationd.crearObservacion.avance) {
          // refetch();
          toast.success('Observacion creada con exto  con exito');
          setShowEditDialog(false);
        }
      }
    }
    if (dataMutationd) {
      if (dataMutationd.crearObservacion) {
        if (dataMutationd.crearObservacion.errors) {
          if (dataMutationd.crearObservacion.errors[0]) {
            toast.error(dataMutationd.crearObservacion.errors[0].message);
          }
        }
      }
    }
  }, [dataMutationd, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    crearObservacion({
      variables: {
        idAvance,
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
        <Input
          label="Descripcion de la Observacion"
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


const FormEditAvance = ({ _id , descripcion ,fecha}) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarAvance, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    editarAvance({
      variables: {
        idAvance:_id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.editarAvance) {
        if (dataMutation.editarAvance.errors) {
          if (dataMutation.editarAvance.errors[0]) {
            toast.error(dataMutation.editarAvance.errors[0].message);
          }
        }
      }
    }
    if (error) {
      toast.error('Error editando el Avance');
    }
    if (dataMutation) {
      if (dataMutation.edtiarAvacne) {
        if (dataMutation.edtiarAvacne.avance) {
          toast.success('Avance editado');
        }
      }
    }
  }, [dataMutation, error]);


  return (
    <div className="p-4 toastContainerZIndex">
      <h1 className="font-bold">Modificar la descripcion del Avance</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Input
          label="Descripcion del avance"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};


const EditarObservacion = ({
  descripcion,
  index,
  idAvance,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const { refetch } = useProjectQuery();

  const [
    editarObservacion,
    { data: dataMutationd, error: errorMutationd, loading: loadingMutationd },
  ] = useMutation(EDITAROBSERVACION, {
    refetchQueries: [{ query: GET_AVANCES }],
  });

  useEffect(() => {
    if (dataMutationd) {
      if (dataMutationd.editarObservacion) {
        if (dataMutationd.editarObservacion.avance) {
          // refetch();
          toast.success('Observacion editado con exito');
          setShowEditDialog(false);
        }
      }
    }
    if (dataMutationd) {
      if (dataMutationd.editarObservacion) {
        if (dataMutationd.editarObservacion.errors) {
          if (dataMutationd.editarObservacion.errors[0]) {
            toast.error(dataMutationd.editarObservacion.errors[0].message);
          }
        }
      }
    }
  }, [dataMutationd, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObservacion({
      variables: {
        idAvance,
        indexObservacion: index,
        campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error('Error editando la observacion');
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Observacion</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input
          label="Descripcion de la Observacion"
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


const Observacion = ({
  index,
  _id,
  idAvance,
  idObservacion,
  descripcion,
}) => {
  const { refetch } = useProjectQuery();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [
    eliminarObservacion,
    {
      data: dataMutationEliminar,
      loading: loadingEliminar,
      error: errorEliminar,
    },
  ] = useMutation(ELIMINAROBSERVACION, {
    refetchQueries: [{ query: GET_AVANCES }],
  });

  useEffect(() => {
    if (dataMutationEliminar) {
      if (dataMutationEliminar.eliminarObservacion) {
        if (dataMutationEliminar.eliminarObservacion.errors) {
          if (dataMutationEliminar.eliminarObservacion.errors[0]) {
            toast.error(
              dataMutationEliminar.eliminarObservacion.errors[0].message
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
      if (dataMutationEliminar.eliminarObservacion) {
        console.log('eee');

        if (dataMutationEliminar.eliminarObservacion.success) {
          // refetch();
          toast.success('Observacion eliminada');
        }
      }
    }
  }, [dataMutationEliminar, errorEliminar, refetch]);

  const ejecutarEliminacion = () => {
    eliminarObservacion({ variables: { idAvance, idOb: _id } });
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
      <div className="text-lg font-bold">{idObservacion}</div>
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
          <EditarObservacion
            descripcion={descripcion}
            index={index}
            idAvance={idAvance}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};


export default LDAva;
