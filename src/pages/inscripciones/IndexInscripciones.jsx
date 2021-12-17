import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION , DESAPROBAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
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
const IndexInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);
//
  useEffect(() => {
    console.log(data);
  }, [data]);

useEffect(() => {
  console.log("data",data)
}, [])

  if (loading) return <Loading />;
  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div class="divNav">
        <Nav titulo="Inscripciones" />
      </div>
      <div className="p-10">
        <div>Pagina de inscripciones</div>
        <div className="my-4">
          <AccordionInscripcion
            titulo="Inscripciones aprobadas"
            // HACER UN TERNARIO PARA SABER SI EXISTE O UN TRY
            data={data.Inscripciones.inscripcion.filter(
              (el) => el.estado === 'ACEPTADO'
            )}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo="Inscripciones pendientes"
            data={data.Inscripciones.inscripcion.filter(
              (el) => el.estado === 'PENDIENTE'
            )}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo="Inscripciones rechazadas"
            data={data.Inscripciones.inscripcion.filter(
              (el) => el.estado === 'RECHAZADO'
            )}
            refetch={refetch}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className="flex">
          {data &&
            data.map((inscripcion) => {
              return (
                <Inscripcion inscripcion={inscripcion} refetch={refetch} />
              );
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);

  const [desaprobarInscripcion, { data: dataDesaprobar, loading:loadingDesaprobar, error:errorDesaprobar }] =
    useMutation(DESAPROBAR_INSCRIPCION);

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
  }, [error,errorDesaprobar]);

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
    <div className="bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl">
      <span>{inscripcion.proyecto.nombre}</span>
      <span>{inscripcion.estudiante.nombre}</span>
      <span>{inscripcion.estado}</span>
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
  );
};

export default IndexInscripciones;
