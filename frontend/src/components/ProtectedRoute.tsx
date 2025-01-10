
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }:{children:React.ReactNode}) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signin" />;
};
