import React from 'react'
import Nav from 'components/Nav';
import 'styles/nav.css';
import PrivateRoute from 'components/PrivateRoute';

const EstadoUsuariosAD = () => {
  return (
    <PrivateRoute roleList={['ADMINISTRADOR']}>
    <div class="divNav">
      <Nav titulo="Pagina Inicio" />
    </div>
      ADMIN LISTA USUARIOS
    </PrivateRoute>
  )
}

export default EstadoUsuariosAD
