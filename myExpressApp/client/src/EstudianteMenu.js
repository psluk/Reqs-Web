import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';
import { LoginContext, IdEstContext } from "./App";
import './Menu.css';
import './Tarjeta.css';

export default function EstudianteMenu(){

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState('')
    const [IdEstudiante, setIdEstudiante] = useState('')
    const [Nombre, setNombre] = useState('Cargando...');

    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
            setLoggedIn(response.data.loggedIn);
            setIdEstudiante((response.data.idEstudiante) ? response.data.idEstudiante : null)
            if(response.data.loggedIn && response.data.tipoUsuario == 'Estudiante'){
                axios.get(`http://localhost:3001/estudiante?id=${response.data.idEstudiante}`).then((response) => {
                setNombre(`${response.data[0].nombre} ${response.data[0].apellido1} ${response.data[0].apellido2} (${response.data[0].carnet})`)
            })
            }else{
                navigate('/')
            }
            
        })
    }, [])

  return (
        <div className='Menu tarjeta'>
            <div className='container'>
                <p><b>Usuario:</b> {Nombre}</p>
                <h1>Reservar cubículos</h1>
                <ul>
                    <li>
                        <a href='/Cubiculos'>Ver cubículos disponibles</a>
                    </li>
                    <li>
                        <a href='/Apartados'>Ver lista de cubículos apartados</a>
                    </li>
                </ul>
            </div>
        </div>
  )
}
