import '../styles/nav.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

import {
  Flecha,
  GestionUsuarios,
  Inicio,
  Menu,
  VerEstd,
  User,
  GestionProyectos,
  Avances,
  Inscripciones,
  IndexUsuarios,
  Pencil,
  EstadoUser,
  IndexProyectos,
  ActualizarProyecto,
  RegistrarProyecto,
  VerProyectos,
  Logouti,
} from './Iconos.js';

// import { ReactComponent as PlusIcon } from '../icons/plus.svg';
// import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useUser } from 'context/userContext';
import MediaQuery from 'react-responsive';
/*
  INSTALAR:
  npm install react-transition-group
*/

function Nav(props) {
  const { userData } = useUser();
  const capitalize = (str) => {
    if (str != null) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }
  };
  return (
    <>
    <MediaQuery query="(min-device-width: 800px)">
      <Navbar2>
        {/* <div> */}
        <div className="NavbarCont">
          <p className="title">{props.titulo}</p>
        </div>
        <div>
          <NavLink to="/">
            <NavItem icon={<Inicio />} />
          </NavLink>
        </div>

        <div>
          <NavItem icon={<Menu />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </div>
        {/* </div> */}

        <div>
          <Logout />
        </div>
        <div className="datosUserNav">
          <div>
            {userData.foto ? (
              <img
                style={{ height: '60px', marginRight: '70px' }}
                className=" datosUserNavInto rounded-full"
                src={userData.foto}
                alt="Foto"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="datosUserNavInto">{userData.nombre}:</div>
          <div className="datosUserNavInto">{capitalize(userData.rol)}</div>
        </div>
      </Navbar2>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 799px)">
      <Navbar2>
        <div>
          <NavLink to="/">
            <NavItem icon={<Inicio />} />
          </NavLink>
        </div>

        <div>
          <NavItem icon={<Menu />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </div>
        {/* </div> */}
        <div>
          <Logout />
        </div>
      </Navbar2>
    </MediaQuery>
  </>
  );
}

function Navbar2(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 15);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {/* <NavLink to="perfil/miperfil">
            <DropdownItem leftIcon={<User />}>Mi Perfil</DropdownItem>
          </NavLink> */}
          <DropdownItem
            leftIcon={<GestionUsuarios />}
            rightIcon={<Flecha />}
            goToMenu="modUsuarios"
          >
            Modulo Usuarios
          </DropdownItem>
          <DropdownItem
            leftIcon={<GestionProyectos />}
            rightIcon={<Flecha />}
            goToMenu="proyecto"
          >
            Modulo Proyectos
          </DropdownItem>
          {/* SUPONGAMOS QUE QUEREMOS QUE ESTE SOLO APAREZCA PARA LIDER */}
          {/* <PrivateComponent roleList={['ADMINISTRADOR']}> */}
          {/* <PrivateComponent roleList={['ESTUDIANTE']}>
            <NavLink to="/proyecto/verestd">
              <DropdownItem leftIcon={<Avances />}>Avances</DropdownItem>
            </NavLink>
          </PrivateComponent> */}

          {/* </PrivateComponent> */}
          <PrivateComponent roleList={['LIDER']}>
            <NavLink to="/inscripciones">
              <DropdownItem leftIcon={<Inscripciones />}>
                Inscripciones
              </DropdownItem>
            </NavLink>
          </PrivateComponent>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'modUsuarios'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2 style={{ fontSize: '18px' }}>Regresar</h2>
          </DropdownItem>

          <NavLink to="/usuarios">
            <DropdownItem leftIcon={<IndexUsuarios />}>Inicio</DropdownItem>
          </NavLink>

          <NavLink to="/usuarios/miperfil">
            <DropdownItem leftIcon={<IndexUsuarios />}>Mi Perfil</DropdownItem>
          </NavLink>

          <NavLink to="/usuarios/gestionperfil">
            <DropdownItem leftIcon={<Pencil />}>Editar Perfil</DropdownItem>
          </NavLink>
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <NavLink to="/usuarios/estadoad">
              <DropdownItem leftIcon={<EstadoUser />}>
                Estado Usuarios
              </DropdownItem>
            </NavLink>
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
            <NavLink to="/usuarios/estadold">
              <DropdownItem leftIcon={<EstadoUser />}>
                Estado Usuarios
              </DropdownItem>
            </NavLink>
          </PrivateComponent>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'proyecto'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2 style={{ fontSize: '18px' }}>Regresar</h2>
          </DropdownItem>

          <NavLink to="/proyecto">
            <DropdownItem leftIcon={<IndexProyectos />}>Inicio</DropdownItem>
          </NavLink>

          {/* <NavLink to="/proyecto/actualizar">
            <DropdownItem leftIcon={<ActualizarProyecto />}>
              Actualizar Proyectos
            </DropdownItem>
          </NavLink> */}
          <PrivateComponent roleList={['LIDER']}>
            <NavLink to="/proyecto/nuevo">
              <DropdownItem leftIcon={<ActualizarProyecto />}>
                Registrar Proyectos
              </DropdownItem>
            </NavLink>
          </PrivateComponent>

          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <NavLink to="/proyecto/ver">
              <DropdownItem leftIcon={<VerProyectos />}>
                Ver Proyectos
              </DropdownItem>
            </NavLink>
          </PrivateComponent>

          <PrivateComponent roleList={['LIDER']}>
            <NavLink to="/proyecto/vermisproyectoslider">
              <DropdownItem leftIcon={<RegistrarProyecto />}>
                Ver Mis Proyectos Y Registrar
              </DropdownItem>
            </NavLink>
          </PrivateComponent>

          <PrivateComponent roleList={['LIDER']}>
            <NavLink to="/proyecto/verproyectoslider">
              <DropdownItem leftIcon={<VerProyectos />}>
                Ver Todos los Proyectos Y Registrar
              </DropdownItem>
            </NavLink>
          </PrivateComponent>

          {/* <PrivateComponent roleList={['ESTUDIANTE']}>
            <NavLink to="/proyecto/vermisproyectosest">
              <DropdownItem leftIcon={<VerProyectos />}>
                Ver tus  Proyectos
              </DropdownItem>
            </NavLink>
          </PrivateComponent> */}

          <PrivateComponent roleList={['ESTUDIANTE']}>
            <NavLink to="/proyecto/verestd">
              <DropdownItem leftIcon={<VerEstd />}>
                Ver todos los proyectos
              </DropdownItem>
            </NavLink>
          </PrivateComponent>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Nav;

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    // console.log('eliminar token');
    setToken(null);
  };
  return (
    // <li>
    <NavLink onClick={() => deleteToken()} to="/auth/login">
      <NavItem icon={<Logouti />}></NavItem>
    </NavLink>
    // </li>
  );
};
