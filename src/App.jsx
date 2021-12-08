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

// import PrivateRoute from 'components/PrivateRoute';

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
    console.log('set token', token);
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

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<InicioProyecto />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="/prueba" element={<PrivateLayout />}>
                <Route path="usuarios" element={<IndexUsuarios2 />} />
                <Route
                  path="usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
