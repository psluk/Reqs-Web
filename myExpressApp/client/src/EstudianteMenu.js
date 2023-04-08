import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation} from "react-router-dom";
import axios from 'axios';
import { LoginContext, IdEstContext } from "./App";

export default function EstudianteMenu(){

    const [loggedIn, setLoggedIn] = useState('')
    const [IdEstudiante, setIdEstudiante] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Carnet, setCarnet] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
            setLoggedIn(response.data.loggedIn);
            setIdEstudiante((response.data.idEstudiante) ? response.data.idEstudiante : null)

            axios.get(`http://localhost:3001/estudiante?id=${response.data.idEstudiante}`).then((response) => {
                setNombre(`${response.data[0].nombre} ${response.data[0].apellido1} ${response.data[0].apellido2}`)
                setCarnet(response.data[0].carnet)
            })
        })

    }, [])

  return (
        <div className='Menu-Estudiante'>
            <h3>{Nombre}</h3>
            <h3>{Carnet}</h3>
            <div className='container'>
                <h3>Reservar cubículos</h3>
                <ul>
                    <li>
                        <a>Ver cubículos disponibles</a>
                    </li>
                    <li>
                        <a>Ver lista de cubículos apartados</a>
                    </li>
                </ul>
            </div>
        </div>
  )
}
