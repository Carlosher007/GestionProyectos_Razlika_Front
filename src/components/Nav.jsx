import '../styles/nav.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

import {
  Flecha,
  GestionUsuarios,
  Inicio,
  Menu,
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

/*
  INSTALAR:
  npm install react-transition-group
*/

function Nav(props) {
  return (
    <Navbar>
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
    </Navbar>
  );
}

function Navbar(props) {
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
            goToMenu="animals"
          >
            Modulo Proyectos
          </DropdownItem>
          {/* SUPONGAMOS QUE QUEREMOS QUE ESTE SOLO APAREZCA PARA LIDER */}
          <PrivateComponent roleList={['ADMINISTRADOR']}>
            <NavLink to="/avances">
              <DropdownItem leftIcon={<Avances />}>Avances</DropdownItem>
            </NavLink>
          </PrivateComponent>
          <NavLink to="/incripciones">
            <DropdownItem leftIcon={<Inscripciones />}>
              Inscripciones
            </DropdownItem>
          </NavLink>
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
            <h2>Regresar</h2>
          </DropdownItem>

          <NavLink to="/moduloUsuarios">
            <DropdownItem leftIcon={<IndexUsuarios />}>Inicio</DropdownItem>
          </NavLink>

          <NavLink to="/moduloUsuarios/miPerfil">
            <DropdownItem leftIcon={<IndexUsuarios />}>Mi Perfil</DropdownItem>
          </NavLink>

          <NavLink to="/moduloUsuarios/editarPerfil">
            <DropdownItem leftIcon={<Pencil />}>Editar Perfil</DropdownItem>
          </NavLink>

          <NavLink to="/moduloUsuariosc/estadoUsuarios">
            <DropdownItem leftIcon={<EstadoUser />}>
              Estado Usuarios
            </DropdownItem>
          </NavLink>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Regresar</h2>
          </DropdownItem>

          <NavLink to="/moduloProyectos">
            <DropdownItem leftIcon={<IndexProyectos />}>Inicio</DropdownItem>
          </NavLink>

          <NavLink to="/moduloProyectos/actualizar">
            <DropdownItem leftIcon={<ActualizarProyecto />}>
              Actualizar Proyectos
            </DropdownItem>
          </NavLink>

          <NavLink to="/moduloProyectos/registrar">
            <DropdownItem leftIcon={<RegistrarProyecto />}>
              Registrar Proyectos
            </DropdownItem>
          </NavLink>

          <NavLink to="/moduloProyectos/ver">
            <DropdownItem leftIcon={<VerProyectos />}>
              Ver Proyectos
            </DropdownItem>
          </NavLink>
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
