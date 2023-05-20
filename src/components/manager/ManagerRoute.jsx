/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React from 'react'
import { Navigate } from 'react-router-dom'

function ManagerRoute(props) {
  if (localStorage.getItem('manager-token')) {
    return <Navigate to="/manager/dashboard" />
  }
  return props.children
}

export default ManagerRoute
