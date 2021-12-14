import React from 'react'
import Imagenes from 'assets/Imagenes';
// import 'styles/cardWatch.css'

const CardWatch = () => {
  return (
    <div className="contWatch2">
      <div className="bodyWatch2">
        <div class="CardFull">
          <div class="card">
            <div class="cover">
              <img
                src={Imagenes[23].img}
                alt="Imagen Login"
                style={{ width: '270px' }}
              />
            </div>
            <div class="details">
              <div>
                <img
                  src={Imagenes[24].img}
                  alt="Imagen Login"
                  style={{ width: '180px' }}
                />
                <h3>New Apple Watch</h3>
                <h2>
                  <sup>$</sup>450
                </h2>
                <a href="#">Buy Now</a>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cover">
              <img
                src={Imagenes[23].img}
                alt="Imagen Login"
                style={{ width: '270px' }}
              />
            </div>
            <div class="details">
              <div>
                <img
                  src={Imagenes[23].img}
                  alt="Imagen Login"
                  style={{ width: '270px' }}
                />
                <h3>New Apple Watch</h3>
                <h2>
                  <sup>$</sup>450
                </h2>
                <a href="#">Buy Now</a>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cover">
              <img
                src={Imagenes[23].img}
                alt="Imagen Login"
                style={{ width: '270px' }}
              />
            </div>
            <div class="details">
              <div>
                <img
                  src={Imagenes[23].img}
                  alt="Imagen Login"
                  style={{ width: '270px' }}
                />
                <h3>New Apple Watch</h3>
                <h2>
                  <sup>$</sup>450
                </h2>
                <a href="#">Buy Now</a>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cover">
              <img
                src={Imagenes[23].img}
                alt="Imagen Login"
                style={{ width: '270px' }}
              />
            </div>
            <div class="details">
              <div>
                <img
                  src={Imagenes[23].img}
                  alt="Imagen Login"
                  style={{ width: '270px' }}
                />
                <h3>New Apple Watch</h3>
                <h2>
                  <sup>$</sup>450
                </h2>
                <a href="#">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWatch
