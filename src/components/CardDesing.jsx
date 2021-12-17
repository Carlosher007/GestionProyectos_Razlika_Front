import React from 'react';
import { Link } from 'react-router-dom';

const CardDesing = (props) => {
  return (
    <div className={props.claseCard}>
      <div className="iconDesing">
        <Link to={props.enlace}>
          <props.icon
            style={{
              color: 'white',
              fontSize: '6em',
              position: 'relative',
              zIndex: '10000',
            }}
          />
        </Link>
      </div>
      <div className="contentAsh">
        <h2>{props.titulo}</h2>
        <p>{props.contenido}</p>
      </div>
    </div>
  );
};

export default CardDesing;
