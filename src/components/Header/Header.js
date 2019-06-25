import React from 'react';
import {navigate} from 'hookrouter';
import logo from 'imgs/logo.png'

import 'components/Header/Header.scss';

const Header = () => {

    let redirigirInicio = () => {
        navigate('/');
    }
    let redirigirRegistro = () => {
        navigate('/registroUsuarios');
    }
    let redirigirInicioSesion = () => {
        navigate('/inicioSesion')
    }

    return(
        <header className="bg-yellow sticky-top border-bottom border-brown">
            <div className="container">
                <nav className="row navbar mx-auto">

                    <nav className="nav justify-content-start col-md-4">
                        <a href="#" className=" custom-link py-3 nav-link text-brown" onClick={redirigirInicio}>Inicio</a>
                        <a href="#" className=" custom-link py-3 nav-link text-brown">Equipo</a>
                        <a href="#" className=" custom-link py-3 nav-link text-brown">Comunidad</a>
                    </nav>

                    <a href="#" className="navbar-brand col-md-2 justify-content-center mx-0" onClick={redirigirInicio}>
                        <img src={logo} alt="Logo" className="col-md-10"/>
                    </a>

                    <nav className="nav nav-pills justify-content-end col-md-4">
                        <a href="#" className="nav-link text-brown" onClick={redirigirRegistro}>Registrarse</a>
                        <a href="#" className="nav-link btn-brown text-yellow" onClick={redirigirInicioSesion}>Iniciar Sesión</a>
                    </nav>
                </nav>
            </div>
        </header>
    );
}

export default Header;