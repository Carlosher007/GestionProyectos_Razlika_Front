import { Outlet } from 'react-router';
import React from 'react';
// import Nav from 'components/Nav';
// import '../styles/nav.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout2 = () => {
  return (
    <>
    {/* <div class="divNav">
      <Nav/>
    </div> */}
    <div>
      <Outlet />
    </div>
    <div>
      <ToastContainer />
    </div>
    </>
  );
};

export default PrivateLayout2;
