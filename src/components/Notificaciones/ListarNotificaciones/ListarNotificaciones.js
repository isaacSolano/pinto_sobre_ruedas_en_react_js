import React from 'react';
import {navigate} from 'hookrouter';

import Swal from 'sweetalert';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import ServicioNotificaciones from 'components/Notificaciones/ServicioNotificaciones';

const ListarNotificaciones = (props) => {
    if(props.usuarioActivo.rol === 1){
        navigate('/aplicacionInterna');
    }

    const usuarioActivo = props.usuarioActivo,
        notificaciones = props.notificaciones;

    let redirigirListaAdmin = (e) => {
        let id = e.target.id,
            tipo = e.target.name;

        navigate(`/aplicacionInterna/listaNotificacionAdmin/${tipo}/${id}`);
    }

    let eliminarNotificacion = async(e) => {
        let id = e.target.name;

        await ServicioNotificaciones.eliminarNotificacionById(id)
        .then( (res) => {
            Swal({
                title: 'Gracias por revisar.',
                text: 'La notificación se eliminó correctamente',
                icon: 'success',
            })
            navigate('/aplicacionInterna')
        })
        .catch( (err) => {
            Swal({
                title: 'Hubo un problema en el proceso.',
                text: 'Intente más tarde.',
                icon: 'error',
            })
        })
    }

    return (
        <>
            <NavegacionInterna usuarioActivo={usuarioActivo} />

            <main className="container">
                <div className="row">
                    <h2 className="col-md-12 text-center text-brown p-5">Nuevas notificaciones</h2>
                </div>

                <div className="row">
                    {notificaciones.map(notificacion => (

                        (notificacion.usuario != props.usuarioActivo.correoElectronico) && (
                            <div className="col-md-8 border border-brown rounded p-4 mx-auto my-4" key={notificacion._id}>

                                <div className="row border-bottom border-yellow p-3">
                                    <h2 className="col-md-12 text-brown">
                                        {notificacion.tipo === 'usuario' && (
                                            <span>
                                                Actividad en un perfil
                                            </span>

                                        )}
                                        {notificacion.tipo === 'publicacion' && (
                                            <span>
                                                Actividad en una publicación
                                            </span>
                                        )}
                                    </h2>
                                </div>

                                <div className="row text-center">
                                    <p className="col-md-4 text-brown py-4">Primer nombre: <span>{notificacion.primerNombre}</span></p>
                                    <p className="col-md-4 text-brown py-4">Primer apellido: <span>{notificacion.primerApellido}</span></p>

                                    {notificacion.tipo === 'publicacion' && (
                                        <p className="col-md-4 text-brown py-4">Título de la publicación: <span>{notificacion.tituloPublicacion}</span></p>
                                    )}

                                    {notificacion.tipo === 'usuario' && (
                                        <p className="col-md-4 py-4">Correo electrónico <span>{notificacion.usuario}</span></p>
                                    )}
                                </div>

                                <div className="row text-center">
                                    <button className="col-md-4 btn btn-brown text-yellow mx-auto" name={notificacion._id} onClick={eliminarNotificacion} >Ya me encargué de esto</button>

                                    {notificacion.tipo === 'usuario' && (
                                        <button className="col-md-4 btn btn-brown text-yellow mx-auto" id={notificacion.usuario} name={notificacion.tipo} onClick={redirigirListaAdmin} >Ver más...</button>
                                    )}

                                    {notificacion.tipo === 'publicacion' && (
                                        <button className="col-md-4 btn btn-brown text-yellow mx-auto" id={notificacion.idPublicacion} name={notificacion.tipo} onClick={redirigirListaAdmin} >Ver más...</button>
                                    )}
                                </div>
                            </div>
                        )
                        
                    ))}
                </div>
            </main>

            <Footer />
        </>
    )

}

export default ListarNotificaciones