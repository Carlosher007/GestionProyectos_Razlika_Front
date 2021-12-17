import React, { useEffect, useState } from 'react';
import useFormData from 'hooks/useFormData';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_EstadoUsuario2 } from 'utils/enums';
import { useUser } from 'context/userContext';
import Nav from 'components/Nav';
import 'styles/nav.css';
import PrivateRoute from 'components/PrivateRoute';
import 'styles/cardUser.css';
import { FcManager } from 'react-icons/fc';
import Loading from 'pages/loading/Loading';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const capitalize = (str) => {
  if (str != null) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
};
const EstadoUsuariosLD = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
    if (data) {
      if (data.Usuarios) {
        if (data.Usuarios.errors != []) {
          if (data.Usuarios.errors[0]) {
            toast.error(data.Usuarios.errors[0].message);
          }
        }
      }
    }
    console.log(data);
  }, [error, data]);

  if (loading) return <Loading />;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div class="divNav">
        <Nav titulo="Modificar Estado de Usuario" />
      </div>
      <div>
        <div class="bodyCardUser">
        <Link to="/usuarios">
          <AiOutlineLeftCircle
            style={{ fontSize: '40px', background: '#312a3f' , marginLeft:'10px'}}
          />
          </Link>
          <section class="cardUser-listUser">
            {data.Usuarios.usuario.map((user) => {
              return <UserCard user={user} />;
            })}
          </section>
        </div>
      </div>
    </PrivateRoute>
  );
};

const UserCard = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    console.log('show', showDialog);
  }, [showDialog]);
  return (
    <>
      <article class="cardUser">
        <header class="cardUser-headerUser">
          <h2>Información del Usuario </h2>
          <p>Identificación: {user.identificacion} </p>
        </header>
        <div class="cardUser-authorUser">
          {/* <div className="img"> */}
          <FcManager
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              // filter: 'grayscale(100%)',
              display: 'block',
              overflow: 'hidden',
              margin: '16px 10px',
              color: 'white',
            }}
          />
          {/* </div> */}
          <svg class="half-circleUser" viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>

          <div class="authorUser-nameUser">
            <div class="authorUser-nameUser-prefix">Usuario</div>
            {user.nombre} {user.apellido}
            <div class="authorUser-nameUser-prefix">Rol</div>
            {capitalize(user.rol)}
          </div>
        </div>
        <div class="tagsUser">
          <p href="#">Estado: {capitalize(user.estado)}</p>
          <button
            onClick={() => {
              setShowDialog(true);
            }}
          >
            Editar estado
          </button>
        </div>
      </article>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditUser _id={user._id} />
      </Dialog>
    </>
  );
};

const FormEditUser = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Usuario</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoUsuario2}
        />
        <ButtonLoading
          disabled={false}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default EstadoUsuariosLD;
