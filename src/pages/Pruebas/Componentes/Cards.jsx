import React from 'react';
import Nav from 'components/Nav';
import 'styles/nav.css';
import Card from 'components/Card';

const Cards = () => {
  return (
    <>
      <div className="divNav">
        <Nav titulo="Pagina Inicio" />
      </div>
      <div className="divContent">
        <div className="bodyCards">
          <div className="container">
            <Card
              num="21"
              nombreProyecto="Proyecto de Nose"
              objetivosGenerales="Este es un objetivo general"
              objetivosEspecificos="Este es un objetivo especifico"
              presupuesto="2000"
              fechaInicio="2003/20/09"
              fechaFin="2003/20/09"
              nombreLider="Alvaro"
              estado="ACTIVO"
              fase="NOSE"
            />
            <Card num="2" />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
