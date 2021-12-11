import React from 'react'
import Nav from 'components/Nav';
import 'styles/nav.css';
import PrivateRoute from 'components/PrivateRoute';

const EstadoUsuariosLD = () => {
  return (
    <PrivateRoute roleList={['LIDER']}>
      <div class="divNav">
        <Nav titulo="Pagina Inicio" />
      </div>
      LIDER LISTA USUARIOS
    </PrivateRoute>
  );
}

export default EstadoUsuariosLD
