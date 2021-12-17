import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import 'pages/ModuloUsuarios/Ingreso/login.css';
import Imagenes from 'assets/Imagenes';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';
import { toast } from 'react-toastify';

function SingUp() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [
    registro,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };
  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.errors) {
        if(dataMutation.registro.errors[0]){
          toast.error(dataMutation.registro.errors[0].message);
        }
      }
    }
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        toast.success("Te has registrado, acutalmente estas en estado Pendiente, así que debes esperar");
      }
    }
  }, [dataMutation, setToken, navigate]);

  useEffect(() => {
    if (errorMutation) {
      toast.error('Error al registrar el usuario');
    }
  }, [errorMutation]);


  return (
    <>
      <div className="body">
        <section className="sectionRegistro">
          <div className="container2 container">
            <div className="user signinBx">
              <div className="imgBx">
                <img src={Imagenes[12].img} alt="Imagen Login" />
              </div>
              <div className="formBx">
                <form
                  onSubmit={submitForm}
                  onChange={updateFormData}
                  ref={form}
                >
                  <h2>Crear una nueva cuenta</h2>
                  {/* <select>
                    <option selected disabled>
                      Selecciona una
                    </option>
                    <option value="CC">Cedula Ciudadania</option>
                    <option value="TI">Tarjeta identidad</option>
                    <option value="CE">Cedula Extranjera</option>
                    <option value="PA">Pasaporte</option>
                  </select> */}
                  <div className="Lado">
                    <div className="subLado">
                      <Input
                        label="Nombre:"
                        name="nombre"
                        type="text"
                        required
                      />
                    </div>
                    <div className="subLado">
                      <Input
                        label="Apellido:"
                        name="apellido"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Input
                        label="Documento:"
                        name="identificacion"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <DropDown
                        label="Rol deseado:"
                        name="rol"
                        required={true}
                        options={Enum_Rol}
                      />
                    </div>
                  </div>
                  <div className="Lado">
                    <div className="subLado">
                      <Input
                        label="Correo:"
                        name="correo"
                        type="email"
                        required
                      />
                    </div>
                    <div className="subLado">
                      <Input
                        label="Contraseña:"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  <div className="ButtonLoadingP">
                    <ButtonLoading
                      disabled={Object.keys(formData).length === 0}
                      loading={false}
                      text="Registrarme"
                    />
                  </div>

                  <p class="signup">
                    ¿Ya tienes una Cuenta?
                    <Link to="/auth/login">
                      <br />
                      <span className="text-blue-700">Iniciar Sesion</span>
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
