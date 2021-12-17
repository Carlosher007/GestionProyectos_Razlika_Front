import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import 'pages/ModuloUsuarios/Ingreso/login.css';
import Imagenes from 'assets/Imagenes';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Ingreso() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  useEffect(() => {
    try {
      if (dataMutation) {
        // if (dataMutation.login) {
          if(dataMutation){
            if(dataMutation.login){
              if(dataMutation.login.errors){
                if(dataMutation.login.errors[0]){
                  toast.warn(dataMutation.login.errors[0].message);
                }
              }
            }
          }
        if (dataMutation.login.token) {
          setToken(dataMutation.login.token);
          navigate('/');
          // toast.success('Usuario modificado correctamente');
        }
        // }
      }
    } catch (error) {
      toast.warn('Datos erroneos');
    }
  }, [dataMutation, setToken, navigate]);

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
                <form
                  onSubmit={submitForm}
                  onChange={updateFormData}
                  ref={form}
                >
                  <h2>Ingresar</h2>
                  <Input
                    type="email"
                    name="correo"
                    label="Correo Electronico"
                    required={true}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    required={true}
                    name="password"
                  />
                  <div className="containerButtons">
                    <ButtonLoading
                      disabled={Object.keys(formData).length === 0}
                      loading={mutationLoading}
                      text="Iniciar Sesión"
                    />
                  </div>

                  <p class="signup">
                    ¿No tienes una Cuenta?
                    <Link to="/auth/register">
                    <br/>
                      <span className="text-blue-700">Regístrate</span>
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

export default Ingreso;
