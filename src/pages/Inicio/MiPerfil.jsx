import React, { useState } from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import Imagenes from 'assets/Imagenes';

import 'styles/perfil.css';

const MiPerfil = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div class="divNav">
        <Nav titulo="Mi Perfil" />
      </div>
      <div className="body">
        <div className="imagen" align="center">
          <img src={Imagenes[3].img} alt="Imagen Login" width="200" />
        </div>
        <div className="nombre" align="center">
          Oscar Rozo
        </div>
        <div className="datosUsuario" align="center">
          <div className="etiquetas">
            <ul>Nombre</ul>
            <ul>Identificación</ul>
            <ul>Correo</ul>
            <ul>Contraseña</ul>
            <ul>Rol</ul>
          </div>
          <div className="datos">
            <ul>Oscar Rozo</ul>
            <ul>1000324178</ul>
            <ul>michorozo@gmail.com</ul>
            <ul>*********</ul>
            <ul>Admin</ul>
          </div>
        </div>
        <div className="boton" align="center">
          <button
            type="button"
            style={{
              color: 'whitesmoke',
              fontSize: 'larger',
              backgroundColor: 'grey',
              borderRadius: '5px',
              padding: '10px',
            }}
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? 'Actualizar' : 'Guardar'}
          </button>

          {show ? (
            <div style={{ color: 'green', fontSize: 'larger' }}>
              Datos guardados!
            </div>
          ) : (
            <div style={{ color: 'red', fontSize: 'larger' }}>
              Actualizando datos!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MiPerfil;
