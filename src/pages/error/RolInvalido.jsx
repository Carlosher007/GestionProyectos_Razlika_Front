import React from 'react';
import 'styles/error.css';
import { AiOutlineLeftCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RolInvalido = () => {
  return (
    <div className="contError">
      <div class="bodyError">
        <div class="boxError2">
          <h2>Rol Invalido</h2>
          <div class="IconVolverError">
              <Link to="/">
                <AiOutlineLeftCircle
                  style={{ fontSize: '78px', color: 'white' }}
                />
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolInvalido;
