import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Roles } from '../enums/Roles/ERoles';

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: Roles;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const location = useLocation();
  const { user: currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;