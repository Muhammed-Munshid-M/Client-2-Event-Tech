import React from 'react'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

function UserProtectedRoute(props) {
    if (localStorage.getItem('token')) {
        return props.children
    } else {
        toast.error('You have no account, Please Login')
        return <Navigate to="/" />
    }
}

export default UserProtectedRoute
