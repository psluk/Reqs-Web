import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';
import { LoginContext, IdEstContext } from "../App";
import '../Menu.css';
import '../Tarjeta.css';

function Admin() {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState('')
    
    useEffect(() => {
        axios.get("/login").then((response) => {
            setLoggedIn(response.data.loggedIn);
            if(!response.data.loggedIn){
                navigate('/')
            }    
        })
    }, [])

  return (
    <div className='Menu tarjeta'>
        <div className='container' id='cubiculos-menu'>
            <h1>Gestionar cubículos</h1>
            <ul>
                <li><a href="/Agregar">Agregar cubículo</a></li>
                <li><a href="/Modificar">Modificar cubículo</a></li>
                <li><a href="/Asignaciones">Ver asignaciones</a></li>
                <li><a href="Gestionar">Gestionar disponibilidad y tiempos de uso</a></li>
            </ul>
        </div>
        <div className='container' id='estudiantes-menu'>
            <h1>Gestionar estudiantes</h1>
            <ul>
                <li><a href="/Estudiantes">Ver estudiantes</a></li>
                <li><a href='/Historial'>Ver historial de uso</a></li>
                <li><a herf='/Contactar'>Contactar estudiante</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Admin