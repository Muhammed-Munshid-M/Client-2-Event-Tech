import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute(props) {
    if (localStorage.getItem('manager-token')) {
        return props.children
    } else {
        return <Navigate to="/manager"/> 
    }
}

export default ProtectedRoute
