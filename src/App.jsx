import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import IndexUsuarios2 from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import 'styles/globals.css';
import 'styles/tabla.css';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';

import InicioEspera from 'pages/Inicio/InicioEspera';
import InicioProyecto from 'pages/Inicio/InicioProyecto';
import MiPerfil from 'pages/Inicio/MiPerfil';
import LDAvance from 'pages/ModuloAvances/LDAvance';
import LDInscripciones from 'pages/ModuloInscripciones/LDInscripciones';
import ESTActualizarProyecto from 'pages/ModuloProyectos/ActualizarProyecto/ESTActualizarProyecto';
import RegistrarProyecto from 'pages/ModuloProyectos/RegistrarProyecto/RegistrarProyecto';
import VerProyectos from 'pages/ModuloProyectos/VerProyectos/VerProyectos';
import IndexProyectos from 'pages/ModuloProyectos/IndexProyectos';
import IndexUsuarios from 'pages/ModuloUsuarios/IndexUsuarios';
import EstadoUsuarios from 'pages/ModuloUsuarios/EstadoUsuarios/EstadoUsuarios';
import GestionPerfil from 'pages/ModuloUsuarios/Perfil/GestionPerfil';
import IndexProyectos2 from 'pages/proyectos/IndexProyectos2';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import SingUp from 'pages/ModuloUsuarios/Ingreso/SingUp';
// import PrivateRoute from 'components/PrivateRoute';
import Ingreso from 'pages/ModuloUsuarios/Ingreso/Ingreso';
import IndexInscripciones from 'pages/inscripciones/IndexInscripciones';
import Error from 'pages/error/Error';
import RolInvalido from 'pages/error/RolInvalido';
import CardWatch from 'pages/Prueba/CardWatch';
import Loading from 'pages/loading/Loading';



const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    // console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);
//
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            {/* INICIO Y PAGINAS*/}
            <Routes>
              <Route path="/error" element={<Error />} />
              <Route path="/rolerror" element={<RolInvalido />} />
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<InicioProyecto />} />
                <Route path="miperfil" element={<MiPerfil />} />
                <Route path="avances" element={<LDAvance />} />
                <Route path="inscripciones" element={<LDInscripciones />} />
                <Route path="proyecto" element={<IndexProyectos />} />
                <Route
                  path="proyecto/actualizar"
                  element={<ESTActualizarProyecto />}
                />
                <Route
                  path="proyecto/registrar"
                  element={<RegistrarProyecto />}
                />
                <Route path="proyecto/ver" element={<VerProyectos />} />
                <Route path="usuarios" element={<IndexUsuarios />} />
                <Route path="usuarios/estado" element={<EstadoUsuarios />} />
                <Route
                  path="usuarios/gestionperfil"
                  element={<GestionPerfil />}
                />
              </Route>
              {/* LOGIN Y REGISTROS */}
              <Route path="/auth" element={<AuthLayout />}>
                {/* <Route path="register" element={<Register />} /> */}
                <Route path="register" element={<SingUp />} />
                {/* <Route path="login" element={<Login />} /> */}
                <Route path="login" element={<Ingreso />} />
              </Route>
              {/* PRUEBAS */}
              <Route path="/prueba" element={<PrivateLayout />}>
                <Route path="usuarios" element={<IndexUsuarios2 />} />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
                <Route path="proyecto" element={<IndexProyectos2 />} />
                <Route path="proyecto/nuevo" element={<NuevoProyecto />} />
                <Route path="inscripciones" element={<IndexInscripciones />} />
                <Route path="watch" element={<CardWatch />} />
                <Route path="loading" element={<Loading />} />
              </Route>
              {/* PAGINA */}
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
