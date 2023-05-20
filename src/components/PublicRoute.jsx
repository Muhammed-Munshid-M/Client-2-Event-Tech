/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute(props) {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export default PublicRoute;
