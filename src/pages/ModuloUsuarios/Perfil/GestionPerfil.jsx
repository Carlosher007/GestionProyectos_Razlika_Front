import React from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import PrivateRoute from 'components/PrivateRoute';
const GestionPerfil = () => {
  return (
    <PrivateRoute roleList={['LIDER', 'ADMINISTRADOR']}>
      <div class="divNav">
        <Nav titulo="Pagina Inicio" />
      </div>
      <div>
        a
      </div>
    </PrivateRoute>
  );
};

export default GestionPerfil;
