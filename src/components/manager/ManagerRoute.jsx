import React from 'react'
import { Navigate } from 'react-router-dom'

function ManagerRoute(props) {
    if (localStorage.getItem('manager-token')) {
        return <Navigate to="/manager/dashboard"/>
    } else {
        return props.children
    }
}

export default ManagerRoute
