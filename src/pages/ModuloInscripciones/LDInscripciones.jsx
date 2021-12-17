import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import {
  APROBAR_INSCRIPCION,
  DESAPROBAR_INSCRIPCION,
} from 'graphql/inscripciones/mutations';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import Loading from 'pages/loading/Loading';
import Nav from 'components/Nav';
import 'styles/nav.css';
import 'styles/cardUser.css';
import { FcManager } from 'react-icons/fc';
import PrivateRoute from 'components/PrivateRoute';
const capitalize = (str) => {
  if (str != null) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
};

const LDInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    console.log('data', data);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.Inscripciones) {
        if (data.Inscripciones.errors) {
          if (data.Inscripciones.errors[0]) {
            toast.error(data.Inscripciones.errors[0].message);
          }
        }
      }
    }
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [data, error]);
  if (loading) return <Loading />;
  return (
    <PrivateRoute roleList={['LIDER']}>
      <div class="divNav">
        <Nav titulo="Pagina de Inscripciones" />
      </div>
      <div>
        <CardPrimary
          titulo="Inscripciones aprobadas"
          data={data.Inscripciones.inscripcion.filter(
            (el) => el.estado === 'ACEPTADO'
          )}
          refetch={refetch}
        />
        <CardPrimary
          titulo="Inscripciones pendientes"
          data={data.Inscripciones.inscripcion.filter(
            (el) => el.estado === 'PENDIENTE'
          )}
          refetch={refetch}
        />
        <CardPrimary
          titulo="Inscripciones rechazadas"
          data={data.Inscripciones.inscripcion.filter(
            (el) => el.estado === 'RECHAZADO'
          )}
          refetch={refetch}
        />
      </div>
    </PrivateRoute>
  );
};

const CardPrimary = ({ data, titulo, refetch = () => {} }) => {
  return (
    <div class="bodyCardUser bodyBackgroundDark">
      <div className="text-3xl hover:text-blue-400">
        {titulo} ({data.length})
      </div>
      <section class="cardUser-listUser">
        {data &&
          data.map((inscripcion) => {
            return <UserCard inscripcion={inscripcion} refetch={refetch} />;
          })}
      </section>
    </div>
  );
};

const UserCard = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);

  const [
    desaprobarInscripcion,
    {
      data: dataDesaprobar,
      loading: loadingDesaprobar,
      error: errorDesaprobar,
    },
  ] = useMutation(DESAPROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
    if (dataDesaprobar) {
      toast.success('Inscripcion desaprobada con exito');
      refetch();
    }
  }, [data, dataDesaprobar]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
    if (errorDesaprobar) {
      toast.error('Error desaprobando la inscripcion');
    }
  }, [error, errorDesaprobar]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };

  const desaprobarEstadoInscripcion = () => {
    desaprobarInscripcion({
      variables: {
        rechazarInscripcionId: inscripcion._id,
      },
    });
  };

  return (
    <>
      <article class="cardUser">
        <header class="cardUser-headerUser">
          <h2>Información de la Inscrpcion </h2>
          <p>Id: {inscripcion._id} </p>
        </header>
        <div class="cardUser-authorUser">
          {/* <div className="img"> */}
          <FcManager
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              // filter: 'grayscale(100%)',
              display: 'block',
              overflow: 'hidden',
              margin: '16px 10px',
              color: 'white',
            }}
          />
          {/* </div> */}
          <svg class="half-circleUser" viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>

          <div class="authorUser-nameUser">
            <div class="authorUser-nameUser-prefix">Proyecto</div>
            {inscripcion.proyecto.nombre}
            <div class="authorUser-nameUser-prefix">Estudiante</div>
            {inscripcion.estudiante.nombre}
          </div>
        </div>
        <div class="tagsUser">
          <p href="#">Estado: {capitalize(inscripcion.estado)}</p>
          {inscripcion.estado === 'PENDIENTE' && (
            <ButtonLoading
              onClick={() => {
                cambiarEstadoInscripcion();
              }}
              text="Aprobar Inscripcion"
              loading={loading}
              disabled={false}
            />
          )}
          {inscripcion.estado === 'PENDIENTE' && (
            <ButtonLoading
              onClick={() => {
                desaprobarEstadoInscripcion();
              }}
              text="Rechazar Inscripcion"
              loading={loadingDesaprobar}
              disabled={false}
            />
          )}
          {inscripcion.estado === 'ACEPTADO' && (
            <ButtonLoading
              onClick={() => {
                desaprobarEstadoInscripcion();
              }}
              text="Rechazar Inscripcion"
              loading={loadingDesaprobar}
              disabled={false}
            />
          )}
          {inscripcion.estado === 'RECHAZADO' && (
            <ButtonLoading
              onClick={() => {
                cambiarEstadoInscripcion();
              }}
              text="Aprobar Inscripcion"
              loading={loading}
              disabled={false}
            />
          )}
        </div>
      </article>
    </>
  );
};

export default LDInscripciones;
