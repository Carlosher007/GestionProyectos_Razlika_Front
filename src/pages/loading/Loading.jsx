import React from 'react';
import Nav from 'components/Nav';
import 'styles/loading.css';

// -
const Loading = () => {
  return (
    <>
      <div className="divNav">
        <Nav titulo="Loading" />
      </div>
      <div className="contLoading">
        <div className="bodyLoading">
          <div className="containerLoading">
            <div className="ringLoading"></div>
            <div className="ringLoading"></div>
            <div className="ringLoading"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
