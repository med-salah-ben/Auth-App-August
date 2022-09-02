import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const isAuth = useSelector(state=>state.authReducer.isAuth)
  return (
    <div>
        {isAuth ? (children): (<Navigate to="/" />)}
    </div>
  )
}

export default PrivateRoute