import React, {useEffect} from "react";
import { Routes , Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import './App.css';
import AppNavbar from './components/AppNavbar';
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import {getAuthUser} from "./JS/actions/action"

function App() {
  const dispatch = useDispatch();
  const getUser = () => dispatch(getAuthUser());

  useEffect(()=>{
    getUser()
  },[])

  return (
   <div>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>
} />
    </Routes>
   </div>
  );
}

export default App;
