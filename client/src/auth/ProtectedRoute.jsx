import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import ROUTES from '../util/routes';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
