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
                        </nav>
                    ) : (
                        rolUsuarioActivo === 1 ? (
                            <nav className="row navbar mx-auto">
                                <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistrarPublicacion}>Nueva publicación</a>
                            </nav>
                        ) : (
                            rolUsuarioActivo === 2 ? (
                                <nav className="row navbar mx-auto">
                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirListaUsuarios}>Lista usuarios</a>

                                    <a href="#" className="py-3 nav-link text-yellow" onClick={redirigirRegistrarPublicacion}>Nueva publicación</a>
                                </nav>
                            ) : (
                                <p>nada</p>
                            )
                        )
                    )}
                </div>
            </header>
        </>
    );
};

export default NavegacionInterna