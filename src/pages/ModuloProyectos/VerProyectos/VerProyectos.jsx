import React, { useEffect, useState } from 'react';
import Imagenes from 'assets/Imagenes';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import { Enum_FaseProyecto } from 'utils/enums';

import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
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
import { FcEditImage } from 'react-icons/fc';

const VerProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    if (queryData) {
      if (queryData.ProyectosBasico) {
        if (queryData.ProyectosBasico.errors) {
          if (queryData.ProyectosBasico.errors[0]) {
            toast.error(queryData.ProyectosBasico.errors[0].message);
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
    <PrivateRoute roleList={['ADMINISTRADOR']}>
      <div class="divNav">
        <Nav titulo="Ver Proyectos" />
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
          {queryData && queryData.ProyectosBasico.proyecto ? (
            <div className="bodyCards">
              <div className="containerCardds">
                {queryData.ProyectosBasico.proyecto.map((proyecto) => {
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
  );
};

const Card = ({ proyecto }) => {
  const [estado, setEstado] = useState('card');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog3, setShowDialog3] = useState(false);

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

  const { userData } = useUser();

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
          {/* <PrivateComponent roleList={['LIDER']}>
            {userData._id === proyecto.lider._id && (
              <i
                className="mx-4 fas fa-pen text-white hover:text-blue-400"
                onClick={() => {
                  setShowDialog(true);
                }}
              />
            )}
          </PrivateComponent> */}
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <i
              className="mx-4 fas fa-pen text-blue-800 hover:text-blue-400"
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <i
              className="mx-4 fas fa-pen text-red-800 hover:text-red-400"
              onClick={() => {
                setShowDialog3(true);
              }}
            />
          </PrivateComponent>
          <h3>Proyecto: {proyecto.nombre}</h3>
          <h3>Estado: {capitalize(proyecto.estado)}</h3>
          <div>
            {userData._id === proyecto.lider._id && (
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
            )}
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
              {proyecto.objetivos.map((objetivo) => {
                return (
                  <Objetivo
                    tipo={objetivo.tipo}
                    descripcion={objetivo.descripcion}
                  />
                );
              })}
            </div>
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
        open={showDialog3}
        onClose={() => {
          setShowDialog3(false);
        }}
      >
        <FormEditFase _id={proyecto._id} />
      </Dialog>
    </>
    //   </div>
    // </div>
  );
};

const FormEditFase = ({ _id }) => {
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
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Fase del Proyecto"
          name="fase"
          options={Enum_FaseProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
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
    <div className="p-4">
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

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className="mx-5 my-4 bg-slate-200 p-8 rounded-lg flex flex-col  items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['LIDER']}>
        <div>Editar</div>
      </PrivateComponent>
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

export default VerProyectos;
