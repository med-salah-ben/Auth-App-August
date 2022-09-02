import React from 'react';
import {Navbar , Container, Nav, Button} from "react-bootstrap"
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../JS/actions/action';
import Login from './Login';
import Register from './Register';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch(logoutUser())
  }
  const user = useSelector((state)=>state.authReducer.user)
  const isAuth = useSelector(state=>state.authReducer.isAuth)
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>Auth App</Navbar.Brand>
      <Nav className="me-auto">
        {user?<Nav.Link style={{color:'white'}}> {user.name} </Nav.Link>:(<></>)}
        <Nav.Link style={{color:'white'}}><Link to="/"> Home </Link></Nav.Link>
        {isAuth?<Nav.Link style={{color:'white'}}> <Link to="/dashboard"> Dashboard </Link> </Nav.Link>:(<></>)}
      </Nav>
      { !user ? (
      <>
      <Register />
      <Login />
      </>):(
        <Button variant="dark" onClick={()=>handleLogout()}>Logout</Button>
      )}
      
    </Container>
  </Navbar>
  )
}

export default AppNavbar