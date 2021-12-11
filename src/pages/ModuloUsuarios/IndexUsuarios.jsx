import React from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import CardDesing from '../../components/CardDesing';
// ICONOS
import { FcBusinessman } from 'react-icons/fc';
import { BsToggles } from 'react-icons/bs';

import 'styles/cardDesing.css';
import PrivateComponent from 'components/PrivateComponent';



/**
  <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
  </PrivateComponent>
 */

const IndexUsuarios = () => {
  return (
    <>
      <div class="divNav">
        <Nav titulo="Modulo de Usuarios" />
      </div>
      <div className="bodyDesing contenidoPage">
        <div className="containerDesing">
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={BsToggles}
              titulo="Cambiar estado de usuarios"
              contenido="Sirve para cambiar los estados (pendiente, autorizado, no autorizado) de los usuarios registrados para que estos puedan acceder, o no, a la plataforma. "
              enlace="/usuarios/estadoad"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={BsToggles}
              titulo="Cambiar estado de usuarios"
              contenido="Sirve para cambiar los estados (pendiente, autorizado) de los usuarios registrados para que estos puedan acceder, o no, a la plataforma. "
              enlace="/usuarios/estadold"
            />
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER', 'ADMINISTRADOR', 'ESTUDIANTE']}>
            <CardDesing
              claseCard="cardDesing cardDesing1"
              icon={FcBusinessman}
              titulo="Editar tu usuarios"
              contenido="En este apartado podrás cambiar los datos de tu usuario, incluyendo la contrraseña, a exepcion del rol"
              enlace="/usuarios/gestionperfil"
            />
          </PrivateComponent>
        </div>
      </div>
    </>
  );
};

export default IndexUsuarios;
