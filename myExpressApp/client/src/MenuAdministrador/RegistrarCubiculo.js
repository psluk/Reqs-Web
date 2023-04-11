import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './RegistrarCubiculo.css';
import '../Tarjeta.css';

const opciones = [{nombre: "Disponible", activo: true}, {nombre: "En mantenimiento", activo: false}];
/* 
export default () => {
    const navigate = useNavigate();
    //const parametros = new URLSearchParams('?' + document.URL.split('/').at(-1).split('?').at(-1));
    const idCubiculo = 2;
    const [nombre, setNombre] = useState();
    const [capacidad, setCapacidad] = useState(0);
    const [idEstado, setidEstado] = useState(2);
    const [servicios, setServicios] = useState([]);
    const [activados, setActivados] = useState(0);
    const [desactivados, setDesactivados] = useState(0);
    const [activos, setActivos] = useState(0);
    const [reservas, setReservas] = useState(null);
    const [tiempoMaximo, setTiempoMaximo] = useState(0);
    const [notificarUsuarios, setNotificar] = useState(false);
    const [cancelarReservas, setCancelar] = useState(false);
    const [infoCargada, setInfoCargada] = useState(false);
    const [estados, setEstados] = useState([]);
    const [estadoActual, setEstadoActual] = useState();

    useEffect(() => {
        if (!idCubiculo) {
            navigate(-1);
        } else {/* 
            axios.get('/cubiculo?id=' + idCubiculo).then((response) => {
                try {
                    let info = response.data;
                    let newServicios = info[0].servicios;
                    
                    for (let i = 0; i < newServicios.length; i++) {
                        newServicios[i].anterior = !(!(newServicios[i].activo))
                    }
                    setServicios(newServicios);
                    //console.log(newServicios)

                    //setActivos(newServicios.filter((s) => (s.activo)).length);
                    //setEstadoActual(info[0].estado)
                    //setNombre(info[0].nombre);
                    //setReservas(info[0].reservas);
                    
                    //setCapacidad(info[0].capacidad);
                    //setTiempoMaximo(info[0].minutosMaximo);
                /*     
                    setInfoCargada(true);
                } catch (error) {
                    console.log(error)
                    alert('Ocurrió un error al cargar la información');
                }
            })
            axios.get('/estados').then((response) => {
                try {
                    setEstados(response.data.estados)
                    /*for (let i = 0; i < response.data.estados.length; i++) {
                        estados[i] = response.data.estados[i]
                    }
                    setInfoCargada(true);
                    console.log('Los estados',estados);
                    setInfoCargada(true);
                } catch (error) {
                    console.log(error)
                    alert('Ocurrió un error al cargar la información');
                }
            })
            axios.get('/servicios').then((response) => {
                try {
                    let info = response.data;
                    let serv = info.servicios;
                    for (let i = 0; i < serv.length; i++) {
                        serv[i].anterior = !(!(serv[i].activo))
                    }
                    setServicios(serv)
                    //console.log('Respuesta recibida',typeof response.data.servicios);
                    for (let i = 0; i < response.data.servicios.length; i++) {
                        servicios[i] = response.data.servicios[i]
                    }
                    //setServicios(servicios)
              /*      //console.log('Servicios cargados', servicios);
                } catch (error) {
                    console.log(error)
                    alert('Ocurrió un error al cargar la información');
                }
            })
        }
    }, [])

    const actualizarServicios = (elemento) => {
        let newServicios = servicios;
        let serviciosActivos = [];
        let hijo;
        
        for (let child = 0; child < elemento.children.length; child++) {
            hijo = elemento.children[child]
            if (hijo.selected) {
                serviciosActivos.push(hijo.value);
            }
        }

        let activados = 0, desactivados = 0, activos = 0;

        for (let i = 0; i < newServicios.length; i++) {
            if (serviciosActivos.indexOf(newServicios[i].nombre) != -1) {
                newServicios[i].activo = true;
                if (!newServicios[i].anterior) {
                    activados++;
                } else {
                    activos++;
                }
            } else {
                newServicios[i].activo = false;
                if (newServicios[i].anterior) {
                    desactivados++;
                }
            }
        }
        setServicios(newServicios);
        setActivados(activados);
        setDesactivados(desactivados);
        setActivos(activos);

        document.getElementById('serviciosSelect').blur();
    }

    const handleSubmit = (e) => {
        axios.post('/cubiculo/crear', {
            estadoActual,
            nombre,
            capacidad,
            tiempoMaximo,
            //servicios: servicios
          }).then(res => {
            switch (res.status){
              case 200:
                alert('Registro existoso');
                window.location.reload();
                break;
              default:
                alert('Ocurrió un error al registrar');
                break;
            }
          }).catch(function (error) {
            try {
              alert('Ocurrió un error:\n\n- ' + error.response.data.errores.join('\n- '));
            }
            catch {
              alert('Ocurrió un error al Registrar.');
            }
          })
        
        e.preventDefault();
    }

    return (
        (infoCargada) ? (<div className="tarjeta cubiculo-registrar">
            <h3>Registrar cubículo</h3>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <div class="form-element">
                        <label for="idNumber">ID</label>
                        <input className="form-control" id="idNumber" type='text' title='Se asignará automáticamente' disabled value={"Se asignará automáticamente"}/>
                    </div>
                    <div class="form-element">
                        <label for="nameInput">Nombre</label>
                        <input className="form-control" id="nameInput" type='text' required value={nombre} placeholder="Nombre del cubículo" onChange={e => setNombre(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="estadoSelect">Estado</label>
                    <select id="estadoSelect" onChange={(e) => {setEstadoActual(e.target.value)}}>
                        {(estados.indexOf(estadoActual) == -1) ? (<option value={estadoActual} selected disabled>{estadoActual}</option>) : <></>}
                        {estados.map((e) => ((e == estadoActual) ? <option value={e} selected>{e}</option> : <option value={e}>{e}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <div class="form-element">
                        <label for="capacityInput">Capacidad</label>
                        <input className="form-control" id="capacityInput" type='number' min={1} step={1} required value={capacidad} placeholder="Capacidad del cubículo" onChange={e => setCapacidad(e.target.value)}/>
                    </div>
                    <div class="form-element">
                        <label for="timeInput">Tiempo máximo (minutos)</label>
                        <input className="form-control" id="timeInput" type='number' min={1} step={1} required value={tiempoMaximo} placeholder="Tiempo máximo de uso" onChange={e => setTiempoMaximo(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group servicios">
                    <label for="serviciosSelect" id="serviciosLabel" title="Utilice la tecla Ctrl para marcar o desmarcar elementos">Servicios especiales</label>
                    <select id="serviciosSelect" multiple size="4" onChange={(e) => actualizarServicios(e.target)} title="Utilice la tecla Ctrl para marcar o desmarcar elementos">
                        {servicios.map((s) => ((s.activo) ? (
                            <option className={((s.anterior) ? "activo" : "inactivo") + " servicioOption"} selected>{s.nombre}</option>
                        ) : (
                            <option className={((s.anterior) ? "activo" : "inactivo") + " servicioOption"}>{s.nombre}</option>
                        )))}
                    </select>
                    <div className="form-group leyendas">
                        {(activos > 0) ? (<div class="leyenda"><span class="activo"></span> <p>Servicio activo actualmente</p></div>) : <></>}
                        {(activados > 0) ? (<div class="leyenda"><span class="activado"></span> <p>Se añadirá</p></div>) : <></>}
                        {(desactivados > 0) ? (<div class="leyenda"><span class="desactivado"></span> <p>Se deshabilitará</p></div>) : <></>}
                    </div>
                </div>
                <div className="form-group acciones-adicionales">
                    {((reservas>0) ? (
                        <div className="accion">
                            <input type="checkbox" id="notificarUsuarios" onChange={(e) => setNotificar(e.target.checked)} />
                            <label for="notificarUsuarios">Notificar usuarios con reservas activas</label>
                        </div>
                    ) : (
                        <div className="accion">
                            <input type="checkbox" id="notificarUsuarios" disabled />
                            <label for="notificarUsuarios" title="No hay reservas activas">Notificar usuarios con reservas activas</label>
                        </div>
                    ))}
                    {((reservas>0) ? (
                        <div className="accion">
                            <input type="checkbox" id="cancelarReservas" onChange={(e) => setCancelar(e.target.checked)} />
                            <label  for="cancelarReservas">Cancelar reservas activas (total: {reservas})</label>
                        </div>
                    ) : (
                        <div className="accion">
                            <input type="checkbox" id="cancelarReservas" disabled />
                            <label for="cancelarReservas">Cancelar reservas activas (no hay)</label>
                        </div>
                    ))}
                </div>
                <input className="btn btn-primary" type="submit" value="Guardar" />
            </form>
            <a href="javascript:void(0);" onClick={(e) => {navigate(-1)}}>Cancelar</a>
        </div>) : <></>
    )
}
*/
function Registrar () {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState();
    const [capacidad, setCapacidad] = useState(0);
    const [idEstado, setidEstado] = useState(2);
    const [servicios, setServicios] = useState([]);
    const [activados, setActivados] = useState(0);
    const [desactivados, setDesactivados] = useState(0);
    const [activos, setActivos] = useState(0);
    const [reservas, setReservas] = useState(null);
    const [tiempoMaximo, setTiempoMaximo] = useState(0);
    const [notificarUsuarios, setNotificar] = useState(false);//eliminar
    const [cancelarReservas, setCancelar] = useState(false);  //eliminar
    const [infoCargada, setInfoCargada] = useState(true);
    const [estados, setEstados] = useState([]);
    const [estadoActual, setEstadoActual] = useState();

    async function submit(e) {
        e.preventDefault();
    
        await axios.post('/cubiculo/crear',
        {
          estadoActual,
          nombre,
          capacidad,
          tiempoMaximo
        })
          .then(res => {
            switch (res.status){
              case 200:
                alert(res.data.message);
                break;
              default:
                break;
            }
          }).catch(function (error) {
            try {
              alert('Ocurrió un error: ' + error.response.data.message);
            }
            catch {
              alert('Ocurrió un error Registrando.');
            }
          })
    }

   
    useEffect(() => {
        axios.get('/estados').then((response) => {
            try {
                setEstados(response.data.estados)
            } catch (error) {
                console.log(error)
                alert('Ocurrió un error al cargar la información');
            }
        })
        axios.get('/servicios').then((response) => {
            try {
                setServicios(response.data.servicios)
            } catch (error) {
                console.log(error)
                alert('Ocurrió un error al cargar la información');
            }
        })
    }, [])

    const actualizarServicios = (elemento) => {
        let newServicios = servicios;
        let serviciosActivos = [];
        let hijo;
        
        for (let child = 0; child < elemento.children.length; child++) {
            hijo = elemento.children[child]
            if (hijo.selected) {
                serviciosActivos.push(hijo.value);
            }
        }

        let activados = 0, desactivados = 0, activos = 0;

        for (let i = 0; i < newServicios.length; i++) {
            if (serviciosActivos.indexOf(newServicios[i].nombre) != -1) {
                newServicios[i].activo = true;
                if (!newServicios[i].anterior) {
                    activados++;
                } else {
                    activos++;
                }
            } else {
                newServicios[i].activo = false;
                if (newServicios[i].anterior) {
                    desactivados++;
                }
            }
        }
        setServicios(newServicios);
        setActivados(activados);
        setDesactivados(desactivados);
        setActivos(activos);

        document.getElementById('serviciosSelect').blur();
    }
    
    const handleSubmit = (e) => {
        axios.put('/cubiculo/crear', {
            estadoActual,
            nombre,
            capacidad,
            tiempoMaximo
            //servicios: servicios
          }).then(res => {
            switch (res.status){
              case 200:
                alert('Registro existoso');
                window.location.reload();
                break;
              default:
                alert('Ocurrió un error');
                break;
            }
          }).catch(function (error) {
            try {
              alert('Ocurrió un error:\n\n- ' + error.response.data.errores.join('\n- '));
            }
            catch {
              alert('Ocurrió un error al Registrar.');
            }
          })
        
        e.preventDefault();
    } 

    return (
        (infoCargada) ? (<div className="tarjeta cubiculo-registrar">
            <h3>Registrar cubículo</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <div class="form-element">
                        <label for="idNumber">ID</label>
                        <input className="form-control" id="idNumber" type='text' title='Se asignará automáticamente' disabled value={"Se asignará automáticamente"}/>
                    </div>
                    <div class="form-element">
                        <label for="nameInput">Nombre</label>
                        <input className="form-control" id="nameInput" type='text' required value={nombre} placeholder="Nombre del cubículo" onChange={e => setNombre(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="estadoSelect">Estado</label>
                    <select id="estadoSelect" onChange={(e) => {setEstadoActual(e.target.value)}}>
                        {(estados.indexOf(estadoActual) == -1) ? (<option value={estadoActual} selected disabled>{estadoActual}</option>) : <></>}
                        {estados.map((e) => ((e == estadoActual) ? <option value={e} selected>{e}</option> : <option value={e}>{e}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <div class="form-element">
                        <label for="capacityInput">Capacidad</label>
                        <input className="form-control" id="capacityInput" type='number' min={1} step={1} required value={capacidad} placeholder="Capacidad del cubículo" onChange={e => setCapacidad(e.target.value)}/>
                    </div>
                    <div class="form-element">
                        <label for="timeInput">Tiempo máximo (minutos)</label>
                        <input className="form-control" id="timeInput" type='number' min={1} step={1} required value={tiempoMaximo} placeholder="Tiempo máximo de uso" onChange={e => setTiempoMaximo(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group servicios">
                    <label for="serviciosSelect" id="serviciosLabel" title="Utilice la tecla Ctrl para marcar o desmarcar elementos">Servicios especiales</label>
                    <select id="serviciosSelect" multiple size="4" onChange={(e) => actualizarServicios(e.target)} title="Utilice la tecla Ctrl para marcar o desmarcar elementos">
                        {servicios.map((s) => ((s.activo) ? (
                            <option className={((s.anterior) ? "activo" : "inactivo") + " servicioOption"} selected>{s.nombre}</option>
                        ) : (
                            <option className={((s.anterior) ? "activo" : "inactivo") + " servicioOption"}>{s.nombre}</option>
                        )))}
                    </select>
                    <div className="form-group leyendas">
                        {(activos > 0) ? (<div class="leyenda"><span class="activo"></span> <p>Servicio activo actualmente</p></div>) : <></>}
                        {(activados > 0) ? (<div class="leyenda"><span class="activado"></span> <p>Se añadirá</p></div>) : <></>}
                        {(desactivados > 0) ? (<div class="leyenda"><span class="desactivado"></span> <p>Se deshabilitará</p></div>) : <></>}
                    </div>
                </div>
                <div className="form-group acciones-adicionales">
                    {((reservas>0) ? (
                        <div className="accion">
                            <input type="checkbox" id="notificarUsuarios" onChange={(e) => setNotificar(e.target.checked)} />
                            <label for="notificarUsuarios">Notificar usuarios con reservas activas</label>
                        </div>
                    ) : (
                        <div className="accion">
                            <input type="checkbox" id="notificarUsuarios" disabled />
                            <label for="notificarUsuarios" title="No hay reservas activas">Notificar usuarios con reservas activas</label>
                        </div>
                    ))}
                    {((reservas>0) ? (
                        <div className="accion">
                            <input type="checkbox" id="cancelarReservas" onChange={(e) => setCancelar(e.target.checked)} />
                            <label  for="cancelarReservas">Cancelar reservas activas (total: {reservas})</label>
                        </div>
                    ) : (
                        <div className="accion">
                            <input type="checkbox" id="cancelarReservas" disabled />
                            <label for="cancelarReservas">Cancelar reservas activas (no hay)</label>
                        </div>
                    ))}
                </div>
                <input className="btn btn-primary" type="submit" value="Guardar" />
            </form>
            <a href="javascript:void(0);" onClick={(e) => {navigate(-1)}}>Cancelar</a>
        </div>) : <></>
    )
}

export default Registrar 