import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import Doctor from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/doctors' element={<Doctor/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/doctors/:id' element={<DoctorDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
  )
}

export default Routers