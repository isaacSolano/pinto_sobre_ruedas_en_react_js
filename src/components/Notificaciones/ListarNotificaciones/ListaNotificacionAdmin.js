import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';
import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';

const ListaNotificacionAdmin = (props) => {
    if(props.usuarioActivo.rol === 1){
        navigate('/aplicacionInterna');
    }

    let id = props.id,
        tipo = props.tipo;

    let [informacionNotificacion, setInformacionNotificacion] = useState({});

    useEffect( () => {
        switch (tipo) {
            case 'usuario':
                let obtenerInformacionUsuario = async() => {
                    let informacionUsuario = await ServicioUsuarios.obtenerUsuarioById(id);

                    setInformacionNotificacion(informacionUsuario);
                }

                obtenerInformacionUsuario()
            break;

            case 'publicacion':
                let obtenerInformacionPublicacion = async() => {
                    let informacionPublicacion = await ServicioPublicaciones.obtenerPublicacionId(id);

                    setInformacionNotificacion(informacionPublicacion);
                }

                obtenerInformacionPublicacion();
            break;
        }
    }, [id]);

    let [mostrarImagen1, setMostrarImagen1] = useState(false);
    let [mostrarImagen2, setMostrarImagen2] = useState(false);
    let [mostrarImagen3, setMostrarImagen3] = useState(false);
    let [mostrarImagen4, setMostrarImagen4] = useState(false);

    let fechaNacimientoUsuarioActivo = () => {
        let mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaConFormato =  new Date(informacionNotificacion.fechaNacimiento).getDate() + 1 + ' ' + mesesDelAnio[new Date(informacionNotificacion.fechaNacimiento).getMonth()] + ' ' + new Date(informacionNotificacion.fechaNacimiento).getFullYear();

            return fechaConFormato
    }
    
    let desactivarPublicacion = (e) => {
        e.preventDefault();
        let id = informacionNotificacion.id;

        console.log(id);
    }

    let redirigirDesactivarUsuario = (e) => {
        e.preventDefault();
        let correoElectronico = informacionNotificacion.correoElectronico

        console.log(correoElectronico);
    }

    return(
        <>
            <NavegacionInterna usuarioActivo={props.usuarioActivo} />

            <main className="container">
                {tipo === 'usuario' && (
                    <div className="row border border-yellow rounded p-4 m-4">

                        <div className="col-md-12 border-bottom border-yellow p-4">
                            <div className="row">
                                <h2 className="col-md-6 justify-content-start text-brown">{informacionNotificacion.primerNombre} {informacionNotificacion.primerApellido}</h2>
                                
                                <nav className="col-md-6 justify-content-end nav nav-pills ">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Desactivar usuario</Tooltip>}>
                                        <a href="#" className="nav-link btn-brown text-yellow mx-1" onClick={redirigirDesactivarUsuario}>
                                            <span className="fas fa-user-slash"></span>
                                        </a>
                                    </OverlayTrigger>
                                </nav>
                            </div>
                        </div>

                        <div className="col-md-12 mt-4">
                            <p className="text-brown font-weight-bold">Correo electrónico <span className="font-weight-normal">{informacionNotificacion.correoElectronico}</span></p>

                            <p className="text-brown font-weight-bold">Fecha de nacimiento: <span className="font-weight-normal">{fechaNacimientoUsuarioActivo()}</span></p>

                            <p className="text-brown font-weight-bold">Modalidad: <span className="font-weight-normal text-capitalize">{informacionNotificacion.modalidad}</span></p>
                        </div>
                    </div>
                )}

                {tipo === 'publicacion' && (
                    <div className="col-md-12 border border-brown rounded p-4 m-4">

                        <div className="row border-bottom border-yellow p-5">

                            <h2 className="col-md-6 justify-content-start text-brown">{informacionNotificacion.titulo}</h2>
                            
                            <nav className="col-md-6 justify-content-end nav nav-pills ">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Desactivar publicación</Tooltip>}>
                                    <a href="#" className="nav-link btn-brown text-yellow mx-1" onClick={desactivarPublicacion} >
                                        <span className="fas fa-minus-circle"></span>
                                    </a>
                                </OverlayTrigger>
                            </nav>

                        </div>


                        <p className="text-brown p-6 text-center">{informacionNotificacion.descripcion}</p>

                        <div className="text-center">
                            {informacionNotificacion.imagen1 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src=   {informacionNotificacion.imagen1} onClick={() => {setMostrarImagen1(true)}} />

                                    <Modal show={mostrarImagen1} onHide={() => {setMostrarImagen1(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {informacionNotificacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={informacionNotificacion.imagen1} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                            {informacionNotificacion.imagen2 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={informacionNotificacion.imagen2} onClick={() => {setMostrarImagen2(true)}}/>

                                    <Modal show={mostrarImagen2} onHide={() => {setMostrarImagen2(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {informacionNotificacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={informacionNotificacion.imagen2} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                            </> 
                            )}
                            {informacionNotificacion.imagen3 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={informacionNotificacion.imagen3} onClick={() => {setMostrarImagen3(true)}}/>

                                    <Modal show={mostrarImagen3} onHide={() => {setMostrarImagen3(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {informacionNotificacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={informacionNotificacion.imagen3} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                            {informacionNotificacion.imagen4 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={informacionNotificacion.imagen4} onClick={() => {setMostrarImagen4(true)}}/>
                                    
                                    <Modal show={mostrarImagen4} onHide={() => {setMostrarImagen4(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {informacionNotificacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={informacionNotificacion.imagen4} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                        </div>

                        <p className="text-brown p-2 mt-4">{informacionNotificacion.fecha}</p>
                        <p className="text-brown p-2 mt-4">{`Por ${informacionNotificacion.usuario}`}</p>
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}

export default ListaNotificacionAdmin