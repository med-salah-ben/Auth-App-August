import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector(state=>state.authReducer.user)

  return (
    <div>
       {user?(
        <>
         <h2>User Details :</h2>
        <h4> {user.name} </h4>
        <h4> {user.lastName} </h4>
        <h4> {user.email} </h4>
        </>
       ):(<></>)}

    </div>
  )
}

export default Dashboard