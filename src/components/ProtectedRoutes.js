import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const SignedInUser = () => {
  const { user } = useAuthContext();

  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export  {ProtectedRoutes, SignedInUser};
