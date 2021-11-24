import React from 'react';
import { Link } from 'react-router-dom';
import 'pages/ModuloUsuarios/Ingreso/login.css';
import Imagenes from 'assets/Imagenes';

function SingUp() {
  return (
    <>
      <div className="body">
        <section className="sectionLogin">
          <div className="container2 container">
            <div className="user signinBx">
              <div className="imgBx">
                <img src={Imagenes[13].img} alt="Imagen Login" />
              </div>
              <div className="formBx">
                <form action="/espera">
                  <h2>Crear una nueva cuenta</h2>
                  <select>
                    <option selected disabled>
                      Selecciona una
                    </option>
                    <option value="CC">Cedula Ciudadania</option>
                    <option value="TI">Tarjeta identidad</option>
                    <option value="CE">Cedula Extranjera</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                  <input type="number" placeholder="Documento" required />
                  <input type="text" placeholder="Nombre Completo" required />
                  <input type="email" placeholder="Correo" required />
                  <input type="password" placeholder="Contraseña" required />
                  <input
                    type="password"
                    placeholder="Confirma tu Contraseña"
                    required
                  />
                  <select>
                    <option selected disabled>
                      Rol
                    </option>
                    <option value="CC">Estudiante</option>
                    <option value="TI">Lider</option>
                    <option value="CE">Administrador</option>
                  </select>
                  <input type="submit" value="Registrarse" />
                  <p class="signup">
                    ¿Ya tienes cuenta?
                    <br />
                    <Link to="/login">
                      <a href="#" onclick="toggleForm();">
                        Iniciar Sesion
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

export default SingUp;
