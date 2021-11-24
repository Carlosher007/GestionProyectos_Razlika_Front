import React from 'react';
import { Link } from 'react-router-dom';
import 'pages/ModuloUsuarios/Ingreso/login.css';
import Imagenes from 'assets/Imagenes';

function Login() {
  return (
    <>
      <div className="body">
        <section className="sectionLogin">
          <div className="container">
            <div className="user signinBx">
              <div className="imgBx">
                <img src={Imagenes[13].img} alt="Imagen Login" />
              </div>
              <div className="formBx">
                <form action="/inicio">
                  <h2>Ingresar</h2>
                  <input
                    type="email"
                    placeholder="Correo Electronico"
                    required
                  />
                  <input type="password" placeholder="Contraseña" required />
                  <div className="containerButtons">
                    <input type="submit" value="Ingresar" />
                  </div>

                  <p class="signup">
                    ¿No tienes una Cuenta?
                    <Link to="/register">
                      <a href="#" onclick="toggleForm();">
                        Registrarse
                      </a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
