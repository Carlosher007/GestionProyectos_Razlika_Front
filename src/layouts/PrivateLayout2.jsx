import { Outlet } from 'react-router';
import React from 'react';
import Nav from 'components/Nav';
import '../styles/nav.css'

const PrivateLayout2 = () => {
  return (
    <>
    <div class="divNav">
      <Nav/>
    </div>
    <div>
      <Outlet />
    </div>
    </>
  );
};

export default PrivateLayout2;
