import React from 'react';
import {navigate} from 'hookrouter';

import MainHeader from 'components/Header/Header';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const NavegacionInterna = (props) => {

    const rolUsuarioActivo = props.usuarioActivo.rol;
    
    let redirigirRegistroColaborador = () => {
        navigate('/aplicacionInterna/registroColaboradores');
    }

    let redirigirListaUsuarios = () => {
        navigate('/aplicacionInterna/listarUsuarios');
    }

    let redirigirRegistrarPublicacion = () => {
        navigate('/aplicacionInterna/registrarPublicacion');
    }

    let redirigirListarPublicaciones = () => {
        navigate('/aplicacionInterna/listarPublicaciones');
    }

    let redirigirListarNotificaciones = () => {
        navigate('/aplicacionInterna/listarNotificaciones');
    }

    return (
        <>
            <header className="sticky-top bg-brown border-yellow border-bottom">

                <MainHeader />

                <div className="container">

                    {rolUsuarioActivo === 0 ? (
                        <nav className="row navbar mx-auto">
                            <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistroColaborador}>Registrar colaborador</a>
                            
                            <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListaUsuarios}>Lista usuarios</a>

                            <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistrarPublicacion}>Nueva publicación</a>

                            <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListarPublicaciones}>Mis publicaciones</a>

                            <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListarNotificaciones}>Notificaciones</a>
                        </nav>
                    ) : (
                        rolUsuarioActivo === 1 ? (
                            <nav className="row navbar mx-auto">
                                <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistrarPublicacion}>Nueva publicación</a>

                                <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListarPublicaciones}>Mis publicaciones</a>
                            </nav>
                        ) : (
                            rolUsuarioActivo === 2 ? (
                                <nav className="row navbar mx-auto">
                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListaUsuarios}>Lista usuarios</a>

                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistrarPublicacion}>Nueva publicación</a>

                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListarPublicaciones}>Mis publicaciones</a>

                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListarNotificaciones}>Notificaciones</a>
                                </nav>
                            ) : (
                                <p className="py-3 text-yellow text-center">Cargando dopping... 💉💉</p>
                            )
                        )
                    )}
                </div>
            </header>
        </>
    );
};

export default NavegacionInterna