import React, { useState } from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import Imagenes from 'assets/Imagenes';
import 'styles/registrarP.css';

const RegistrarProyecto = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div class="divNav">
        <Nav titulo="Registrar Proyecto" />
      </div>
      <div className="body">
        <div className="imagen" align="center">
          <img src={Imagenes[2].img} alt="Imagen Login" width="200" />
        </div>
        <div className="espacio"></div>
        <div className="contenedor" align="center">
          <div className="datosProyecto" align="center">
            <div className="etiquetas">
              <ul className="etiquetas1">ID (Inmutable)</ul>
              <ul className="etiquetas1">Nombre de Proyecto</ul>
              <ul className="etiquetas1">Objetivos Generales</ul>
              <ul className="etiquetas1">Objetivos Especificos</ul>
              <ul className="etiquetas1">Presupuesto</ul>
            </div>
            <div className="datos">
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
            </div>
          </div>
          <div className="datosProyecto1" align="center">
            <div className="etiquetas">
              <ul className="etiquetas1">Fecha inicio</ul>
              <ul className="etiquetas1">Fecha fin</ul>
              <ul className="etiquetas1">ID y nombre de Lider</ul>
              <ul className="etiquetas1">Estado</ul>
              <ul className="etiquetas1">Fase del Proyecto</ul>
            </div>
            <div className="datos">
              <ul className="input">
                <input type="date" />
              </ul>
              <ul className="input">
                <input type="date" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
              <ul className="input">
                <input type="text" />
              </ul>
            </div>
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
            {show ? 'Registrar' : 'Registrar'}
          </button>

          {show ? (
            <div style={{ color: 'red', fontSize: 'larger' }}>
              Guarda tu proyecto!
            </div>
          ) : (
            <div style={{ color: 'green', fontSize: 'larger' }}>
              Proyecto guardado!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrarProyecto;
