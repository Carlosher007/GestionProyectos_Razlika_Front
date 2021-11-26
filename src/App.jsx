import React, { useState } from 'react';
// import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import 'styles/globals.css';
import PrivateLayout2 from 'layouts/PrivateLayout2';
import Login from 'pages/ModuloUsuarios/Ingreso/Login';
import IndexUsuarios from 'pages/ModuloUsuarios/IndexUsuarios';
import GestionPerfil from 'pages/ModuloUsuarios/Perfil/GestionPerfil';
import EstadoUsuarios from 'pages/ModuloUsuarios/EstadoUsuarios/EstadoUsuarios';
import InicioProyecto from 'pages/Inicio/InicioProyecto';
import IndexProyectos from 'pages/ModuloProyectos/IndexProyectos';
import ESTActualizarProyecto from 'pages/ModuloProyectos/ActualizarProyecto/ESTActualizarProyecto';
import RegistrarProyecto from 'pages/ModuloProyectos/RegistrarProyecto/RegistrarProyecto';
import VerProyectos from 'pages/ModuloProyectos/VerProyectos/VerProyectos';
import LDInscripciones from 'pages/ModuloInscripciones/LDInscripciones';
import LDAvance from 'pages/ModuloAvances/LDAvance';
import MiPerfil from 'pages/Inicio/MiPerfil';
import SingUp from 'pages/ModuloUsuarios/Ingreso/SingUp';
import InicioEspera from 'pages/Inicio/InicioEspera';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
// import PrivateRoute from 'components/PrivateRoute';
import EditarUsuarios from 'pages/Pruebas/EditarUsuarios';
import IndexUsuariosPrueba from 'pages/Pruebas/IndexUsuariosPrueba';
import 'styles/tabla.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SingUp />} />
            <Route path="/espera" element={<InicioEspera />} />
            <Route path="/" element={<PrivateLayout2 />}>
              <Route path="inicio" element={<InicioProyecto />} />
              {/* <Route path="miperfil" element={<MiPerfil />} /> */}
            </Route>

            <Route path="/moduloUsuarios" element={<PrivateLayout2 />}>
              <Route path="" element={<IndexUsuarios />} />
              <Route path="miPerfil" element={<MiPerfil />} />
              <Route path="editarPerfil" element={<GestionPerfil />} />
              <Route path="estadoUsuarios" element={<EstadoUsuarios />} />
            </Route>

            <Route path="/moduloProyectos" element={<PrivateLayout2 />}>
              <Route path="" element={<IndexProyectos />} />
              <Route path="actualizar" element={<ESTActualizarProyecto />} />
              <Route path="registrar" element={<RegistrarProyecto />} />
              <Route path="ver" element={<VerProyectos />} />
            </Route>

            <Route path="/incripciones" element={<PrivateLayout2 />}>
              <Route path="" element={<LDInscripciones />} />
            </Route>

            <Route path="/avances" element={<PrivateLayout2 />}>
              <Route path="" element={<LDAvance />} />
            </Route>
            {/* <Route path="/avances" element={<PrivateLayout2 />}>
              <Route path="" element={<LDAvance />} />
            </Route> */}

            <Route path="/pruebas" element={<PrivateLayout2 />}>
              <Route path="" element={<IndexUsuariosPrueba />} />
              <Route path='editar/:_id' element={<EditarUsuarios />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
