import React from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import CardDesing from '../../components/CardDesing';
// ICONOS
import { FcBusinessman } from 'react-icons/fc';
import { FcReadingEbook } from 'react-icons/fc';

import { BsToggles } from 'react-icons/bs';

import 'styles/cardDesing.css';
import PrivateComponent from 'components/PrivateComponent';

/**
  <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
  </PrivateComponent>
 */

const InicioProyecto = () => {
  return (
    <>
      <div class="divNav">
        <Nav titulo="Inicio" />
      </div>
      <div className="bodyDesing contenidoPage bodyBackgroundDark">
        <div className="containerDesing">
          <PrivateComponent roleList={['ESTUDIANTE']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={BsToggles}
              titulo="Modulo de usuarios"
              contenido="Aquí podras ver tu perfil y si lo deseas, modificarlo"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['ESTUDIANTE']}>
            <CardDesing
              claseCard="cardDesing cardDesing2"
              icon={BsToggles}
              titulo="Modulo de Proyectos"
              contenido="Podras ver todos los proyectos, tus proyectos, inscribirte a aquellos en los que desees, listar y crear avances y finalmente ver las observaciones de estas"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={BsToggles}
              titulo="Modulo de Usuarios"
              contenido="Aquí podras ver tu perfil y si lo deseas, modificarlo. Tambien podrás modificar los estados de los usuarios entre pendiente, autorizado y no autorizado"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <CardDesing
              claseCard="cardDesing cardDesing2"
              icon={BsToggles}
              titulo="Modulo de Proyectos"
              contenido="Podrás ver todos los proyectos con sus respectivas informaciones"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={BsToggles}
              titulo="Modulo de Usuarios"
              contenido="Aquí podras ver tu perfil y si lo deseas, modificarlo. Tambien podrás modificar los estados de los usuarios entre pendiente y autorizado"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <CardDesing
              claseCard="cardDesing cardDesing2"
              icon={BsToggles}
              titulo="Modulo de Proyectos"
              contenido="Podras ver todos los proyectos, tambien aquellos proyectos que lideras con sus respectiva información. Puedes crear un nuevo proyecto, listar los avances de estos y crear observaciones si lo consideras pertinente"
              enlace="/"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <CardDesing
              claseCard="cardDesing cardDesing3"
              icon={BsToggles}
              titulo="Modulo de Inscripciones"
              contenido="Con tres apartados (inscripciones aprobadas , pendientes y rechazadas) podrás ver cada una de las inscripciones de los estudiantes a tus proyectos, con la información del proyecto y el estudiante para que puedas cambiar entre estos estados"
              enlace="/"
            />
          </PrivateComponent>
        </div>
      </div>
    </>
  );
};

export default InicioProyecto;
