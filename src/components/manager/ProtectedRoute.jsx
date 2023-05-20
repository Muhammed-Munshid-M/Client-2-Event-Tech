/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
  if (localStorage.getItem('manager-token')) {
    return props.children;
  }
  return <Navigate to="/manager" />;
}

export default ProtectedRoute;
