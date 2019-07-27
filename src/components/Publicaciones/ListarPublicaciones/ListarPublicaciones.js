import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';

import Swal from 'sweetalert';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';
import VerificacionesUsuario from 'components/Usuarios/VerificacionesUsuario/VerificacionesUsuario';

import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';

const ListarPublicaciones = (props) => {

    const [misPublicaciones, setMisPublicaciones] = useState([]);

    let [mostrarImagen1, setMostrarImagen1] = useState(false);
    let [mostrarImagen2, setMostrarImagen2] = useState(false);
    let [mostrarImagen3, setMostrarImagen3] = useState(false);
    let [mostrarImagen4, setMostrarImagen4] = useState(false);

    useEffect( () => {
        let obtenerMisPublicaciones = async() => {
            let publicacionesUsuarioActivo = await ServicioPublicaciones.obtenerPublicacionesUsuarioActivo(props.usuarioActivo.correoElectronico);

            setMisPublicaciones(publicacionesUsuarioActivo);
        }

        obtenerMisPublicaciones();
    }, [props.usuarioActivo]);

    let desactivarPublicacion = async(e) => {
        e.preventDefault();

        let idPublicacion = e.target.id,
            datosDesact = {
                tipo: 1,
                motivoDesact: '',
            };

        Swal({
            title: '¿Desea desactivar esta publicación?',
            text: 'Si se desactiva no podrá ser vista por otros usuarios',
            icon: 'warning',
            dangerMode: true,
            buttons: ['No', 'Sí'],
        })
        .then( async(confirmacion) => {
            if(confirmacion){
                let response = await ServicioPublicaciones.actDesactPublicacion(idPublicacion, datosDesact);

                if(response){
                    Swal({
                        title: 'La publicación se desactivó correctamente',
                        text: 'Ahora la informacion no podrá ser vista por otros usuarios',
                        icon: 'success',
                    }).then ( () => {
                        navigate('/aplicacionInterna');
                    })
                }else{
                    Swal({
                        title: 'Hubo un error en el proceso',
                        text: 'Por favor intente de nuevo',
                        icon: 'error',
                    })
                }
            }else{
                Swal({
                    title: 'La publicación no se desactivó',
                    text: 'Aún podrá ser vista por otros usuarios',
                    icon: 'warning',
                })
            }
        })

    }

    let reactivarPublicacion = async(e) => {
        e.preventDefault();

        let idPublicacion = e.target.id,
            datosAct = {
                tipo: 0,
                motivoDesact: '',
            };

        Swal({
            title: '¿Desea reactivar esta publicación?',
            text: 'Una vez la reactive, podrá ser vista por otros usuarios',
            icon: 'info',
            buttons: ['No', 'Sí'],
        })
        .then( async(confirmacion) => {
            if(confirmacion){
                let response = await ServicioPublicaciones.actDesactPublicacion(idPublicacion, datosAct);

                if(response){
                    Swal({
                        title: 'La publicación se reactivó correctamente',
                        text: 'Ahora podrá ser vista por otros usuarios',
                        icon: 'success',
                    }).then ( () => {
                        navigate('/aplicacionInterna');
                    })
                }else{
                    Swal({
                        title: 'Hubo un error en el proceso',
                        text: 'Por favor intente de nuevo',
                        icon: 'error',
                    })
                }
            }else{
                Swal({
                    title: 'La publicación no se reactivó',
                    text: 'Aún no podrá ser vista por otros usuarios',
                    icon: 'warning',
                    dangerMode: true,
                })
            }
        })
    }

    let editarPublicacion = (e) => {
        e.preventDefault();

        console.log(e);
        let idPublicacion = e.target.id;

        navigate(`/aplicacionInterna/editarPublicacion/${idPublicacion}`);
    }

    return (
        <>
            <VerificacionesUsuario usuarioActivo={props.usuarioActivo} />
            <NavegacionInterna usuarioActivo={props.usuarioActivo} />

            <main className="container">
                <div className="row">
                    <h2 className="col-md-12 text-center text-brown p-5">Lista de publicaciones</h2>
                </div>

                <div className="row">
                    {misPublicaciones.map( publicacion => (

                        <div className="col-md-12 border border-brown rounded p-4 m-4" key={publicacion._id}>

                            <div className="row border-bottom border-yellow p-5">

                                <h2 className="col-md-6 justify-content-start text-brown">{publicacion.titulo}</h2>
                                
                                <nav className="col-md-6 justify-content-end nav nav-pills ">
                                    
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Editar publicación</Tooltip>}>
                                        <a href="" id={publicacion._id} className="nav-link btn-brown text-yellow mx-1" onClick={editarPublicacion} >
                                            <span className="fas fa-edit"></span>
                                        </a>
                                    </OverlayTrigger>

                                    {publicacion.desactivado === 1 ? (
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Reactivar publicación</Tooltip>}>
                                            <a href="" id={publicacion._id} className="nav-link btn-brown text-yellow mx-1" onClick={reactivarPublicacion} >
                                                <span className="fas fa-check-circle"></span>
                                            </a>
                                        </OverlayTrigger>    
                                    ) : (
                                        publicacion.desactivado === 0 && (
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Desactivar publicación</Tooltip>}>
                                                <a href="" id={publicacion._id} className="nav-link btn-brown text-yellow mx-1" onClick={desactivarPublicacion} >
                                                    <span className="fas fa-minus-circle"></span>
                                                </a>
                                            </OverlayTrigger>
                                        )
                                    )}

                                    
                                </nav>

                            </div>


                            <p className="text-brown p-6 text-center">{publicacion.descripcion}</p>

                            <div className="text-center">
                                {publicacion.imagen1 && (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src=   {publicacion.imagen1} onClick={() => {setMostrarImagen1(true)}} />

                                        <Modal show={mostrarImagen1} onHide={() => {setMostrarImagen1(false)}} size="lg" aria-labelledby="modal-imagen">

                                            <Modal.Header className="text-brown" closeButton>
                                                <Modal.Title id="modal-imagen">
                                                    {publicacion.titulo}
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body className="row">
                                                <img src={publicacion.imagen1} className="col-md-12 text-center" />
                                            </Modal.Body>
                                            
                                        </Modal>
                                    </>
                                )}
                                {publicacion.imagen2 && (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen2} onClick={() => {setMostrarImagen2(true)}}/>

                                        <Modal show={mostrarImagen2} onHide={() => {setMostrarImagen2(false)}} size="lg" aria-labelledby="modal-imagen">

                                            <Modal.Header className="text-brown" closeButton>
                                                <Modal.Title id="modal-imagen">
                                                    {publicacion.titulo}
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body className="row">
                                                <img src={publicacion.imagen2} className="col-md-12 text-center" />
                                            </Modal.Body>
                                            
                                        </Modal>
                                </> 
                                )}
                                {publicacion.imagen3 && (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen3} onClick={() => {setMostrarImagen3(true)}}/>

                                        <Modal show={mostrarImagen3} onHide={() => {setMostrarImagen3(false)}} size="lg" aria-labelledby="modal-imagen">

                                            <Modal.Header className="text-brown" closeButton>
                                                <Modal.Title id="modal-imagen">
                                                    {publicacion.titulo}
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body className="row">
                                                <img src={publicacion.imagen3} className="col-md-12 text-center" />
                                            </Modal.Body>
                                            
                                        </Modal>
                                    </>
                                )}
                                {publicacion.imagen4 && (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen4} onClick={() => {setMostrarImagen4(true)}}/>
                                        
                                        <Modal show={mostrarImagen4} onHide={() => {setMostrarImagen4(false)}} size="lg" aria-labelledby="modal-imagen">

                                            <Modal.Header className="text-brown" closeButton>
                                                <Modal.Title id="modal-imagen">
                                                    {publicacion.titulo}
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body className="row">
                                                <img src={publicacion.imagen4} className="col-md-12 text-center" />
                                            </Modal.Body>
                                            
                                        </Modal>
                                    </>
                                )}
                            </div>

                            <p className="text-brown p-2 mt-4">{publicacion.fecha}</p>

                            {publicacion.desactivado === 1 ? (
                                <p className="text-danger p-2 font-weight-bold">Esta publicación se encuentra desactivada, reactívela para que sea visible.</p>
                            ) : (
                                publicacion.desactivado === 2 && (
                                    <p className="text-danger p-2 font-weight-bold">Esta publicación fue desactivada por administración, debido a <span className="font-italic">"{publicacion.motivoDesact}"</span>, edite la información para que sea visible.</p>
                                )
                            )}

                        </div>

                    ))}
                </div>

            </main>

            <Footer />
        </>
    )
}

export default ListarPublicaciones