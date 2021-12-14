import { useUser } from 'context/userContext';
import RolInvalido from 'pages/error/RolInvalido';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return (
    <div data-testid="not-authorized">
      <RolInvalido />;
      {/* a */}
    </div>
  );


};

export default PrivateRoute;
