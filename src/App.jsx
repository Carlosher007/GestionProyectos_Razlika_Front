import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
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
import InicioEspera  from 'pages/Inicio/InicioEspera';

// import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider
      domain="misiontic-concesionario.us.auth0.com"
      clientId="WsdhjjQzDLIZEHA6ouuxXGxFONFGAQ4g"
      redirectUri="http://localhost:3000/admin"
      audience="api-autenticacion-concesionario-mintic"
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SingUp />} />
            <Route path="/espera" element={<InicioEspera />} />
            <Route path="/">
              <Route path="inicio" element={<InicioProyecto />} />
              {/* <Route path="miperfil" element={<MiPerfil />} /> */}
            </Route>

            <Route path="/moduloUsuarios">
              <Route path="" element={<IndexUsuarios />} />
              <Route path="miPerfil" element={<MiPerfil />} />
              <Route path="editarPerfil" element={<GestionPerfil />} />
              <Route path="estadoUsuarios" element={<EstadoUsuarios />} />
            </Route>

            <Route path="/moduloProyectos">
              <Route path="" element={<IndexProyectos />} />
              <Route path="actualizar" element={<ESTActualizarProyecto />} />
              <Route path="registrar" element={<RegistrarProyecto />} />
              <Route path="ver" element={<VerProyectos />} />
            </Route>

            <Route path="/incripciones">
              <Route path="" element={<LDInscripciones />} />
            </Route>

            <Route path="/avances">
              <Route path="" element={<LDAvance />} />
            </Route>
            {/* <Route path="/avances" element={<PrivateLayout2 />}>
              <Route path="" element={<LDAvance />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Auth0Provider>
  );
}

export default App;
