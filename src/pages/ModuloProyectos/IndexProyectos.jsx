import React from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import CardDesing from '../../components/CardDesing';
// ICONOS
import { AiFillFileZip } from 'react-icons/ai';
import { AiTwotoneHdd } from 'react-icons/ai';
import 'styles/cardDesing.css';
import PrivateComponent from 'components/PrivateComponent';

/**
BACKGROUND:
linear-gradient(to bottom, #fff2ae0,#645bf6)
 */

/**
  <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
  </PrivateComponent>
 */

const IndexProyectos = () => {

  return (
    <>
      <div class="divNav">
        <Nav titulo="Modulo de Proyectos" />
      </div>
      <div className="bodyDesing contenidoPage">
        <div className="containerDesing">
          <PrivateComponent roleList={['LIDER']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={AiFillFileZip}
              titulo="Ver tus proyectos"
              contenido="En este apartado, tu como lider, podras listar tus proyectos y si lo deseas, crear uno nuevo. Así mismo podras tener todos los detalles de tus proyectos"
              enlace="/proyecto/ver"
            />
          </PrivateComponent>

          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={AiFillFileZip}
              titulo="Ver proyectos registrados"
              contenido="En este apartado, tu como administrador, podras listar todos los proyectos. Así mismo podras tener cada detalle de los proyectos"
              enlace="/proyecto/ver"
            />
          </PrivateComponent>

          <PrivateComponent roleList={['ESTUDIANTE']}>
            <CardDesing
              claseCard="cardDesing cardDesing3"
              icon={AiFillFileZip}
              titulo="Ver todos los proyectos"
              contenido="En este apartado, tu como estudiante podrás ver todos los proyectos y ver detalles de cada uno de estos. Así mismo podras inscribirte  o salirte de estos."
              enlace="/proyecto/ver"
            />
          </PrivateComponent>

          <PrivateComponent roleList={['ESTUDIANTE']}>
            <CardDesing
              claseCard="cardDesing cardDesing2"
              icon={AiTwotoneHdd}
              titulo="Ver tus proyectos"
              contenido="En este apartado, tu como estudiante podrás ver todos tus proyectos, y poder así agregar avances."
              enlace="/proyecto/vermisproyectos"
            />
          </PrivateComponent>
        </div>
      </div>
    </>
  );
};

export default IndexProyectos;
