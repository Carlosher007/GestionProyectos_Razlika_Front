import React from 'react'
import 'styles/error.css'
import { Link } from 'react-router-dom';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const Error = () => {
  return (
    <div className="contError">
      <div class="bodyError">
        <div class="boxError">
          <h2>
            4<span class="zero"></span>4
          </h2>
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
}

export default Error
