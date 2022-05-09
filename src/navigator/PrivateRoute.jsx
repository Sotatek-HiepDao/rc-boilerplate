import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router';

const PrivateRoute = ({ children, roles, redirectPath = '/' }) => {
  const { authenticated, currentRole } = null;
  const location = useLocation();

  // If a user is not authenticated or is not in roles, access is denied.
  if (!authenticated || !roles?.includes(currentRole)) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
