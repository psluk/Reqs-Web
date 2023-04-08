import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from './Login'
import EstudianteMenu from './EstudianteMenu'
import Registro from './Registro'



export default function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
      </>
      
    
  )
}