import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIOCONTODO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import { toast } from 'react-toastify';
import PrivateRoute from 'components/PrivateRoute';
import Nav from 'components/Nav';
import 'styles/MiPerfil.css';
import Imagenes from 'assets/Imagenes';
import Loading from 'pages/loading/Loading';
import { useUser } from 'context/userContext';
import 'styles/cards.css';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { uploadFormData } from 'utils/uploadFormData';
//
const MiPerfil = () => {
  const [editFoto, setEditFoto] = useState(false);
  const { userData } = useUser();
  const _id = userData._id;
  console.log(_id);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIOCONTODO, {
    variables: { _id },
  });

  // console.log(queryData);

  useEffect(() => {
    if (queryData) {
      if (queryData.UsuarioConTodo) {
        if (queryData.UsuarioConTodo.errors) {
          if (queryData.UsuarioConTodo.errors[0]) {
            toast.error(queryData.UsuarioConTodo.errors[0].message);
          }
        }
      }
    }
    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryData, queryError]);
  if (queryLoading) return <Loading />;

  return (
    <PrivateRoute roleList={['LIDER', 'ADMINISTRADOR', 'ESTUDIANTE']}>
      <div class="divNav">
        <Nav titulo="Mi Perfil" />
      </div>
      <div style={{background: "#313131"}}>
        <Link to="/usuarios">
          <AiOutlineLeftCircle
            style={{
              fontSize: '40px',
              background: '#312a3f',
              marginLeft: '10px',
            }}
          />
        </Link>
      </div>
      <div class="bodyMiPerfil">
        {queryData && queryData.UsuarioConTodo.usuario ? (
          <div className="bodyCards">
            <div className="containerCardds">
              <Card user={queryData.UsuarioConTodo.usuario} />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </PrivateRoute>
  );
};

const Card = ({ user }) => {
  const [estado, setEstado] = useState('card');
  var inscripciones = 0;
  var proyectosLiderados = 0;

  let more = document.querySelectorAll('.more');
  for (let i = 0; i < more.length; i++) {
    more[i].addEventListener('click', function () {
      more[i].parentNode.classList.toggle('activate');
    });
  }
  const numeroInscripciones = () => {
    user.inscripciones.map((inscripcion) => {
      inscripciones++;
    });
    return inscripciones;
  };
  const numeroProyectosLiderados = () => {
    user.proyectosLiderados.map((proyecto) => {
      proyectosLiderados++;
    });
    return proyectosLiderados;
  };

  const capitalize = (str) => {
    if (str != null) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }
  };
  return (
    // <div className="bodyCards">
    //
    //   <div className="container">
    <div className={estado}>
      <div className="icon">
        {<img src={Imagenes[21].img} alt="Imagen Proyecto" />}
      </div>
      <div className="content">
        <h3>
          Usuario: {user.nombre} {user.apellido}
        </h3>
        <p>
          <span style={{ color: '#BEE1E6' }}>Identificacion: </span>
          {user.identificacion} <br />
          <span style={{ color: '#BEE1E6' }}>Correo: </span>
          {user.correo} <br />
          <span style={{ color: '#BEE1E6' }}>Rol: </span> {capitalize(user.rol)}
          <br />
          <span style={{ color: '#BEE1E6' }}>Estado: </span>{' '}
          {capitalize(user.estado)} <br />
          <span style={{ color: '#BEE1E6' }}>Inscripciones: </span>{' '}
          {user.rol != 'ESTUDIANTE'
            ? 'No puede realizar inscripciones'
            : numeroInscripciones()}{' '}
          <br />
          <span style={{ color: '#BEE1E6' }}>Proyectos Liderados: </span>{' '}
          {user.rol != 'LIDER'
            ? 'No puede liderar proyectos'
            : numeroProyectosLiderados()}{' '}
          <br />
        </p>
      </div>
      <button
        onClick={() => {
          if (estado === 'card') {
            setEstado('card activate');
          } else {
            setEstado('card');
          }
        }}
      >
        <a className="more"></a>
      </button>
    </div>
    //   </div>
    // </div>
  );
};

export default MiPerfil;
