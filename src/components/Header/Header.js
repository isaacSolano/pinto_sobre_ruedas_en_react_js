import React from 'react';
import {navigate} from 'hookrouter';
import Swal from 'sweetalert';

import logo from 'imgs/logo.png';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

import 'components/Header/Header.scss';

const Header = () => {

    let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();

    let redirigirInicio = () => {
        navigate('/');
    }

    let redirigirListarPublicacionesAdmin = () => {
        navigate('/listarPublicacionesAdmin')
    }

    let redirigirRegistro = () => {
        navigate('/registroUsuarios');
    }

    let redirigirInicioSesion = () => {
        navigate('/inicioSesion')
    }

    let redirigirPerfil = () => {
        navigate('/aplicacionInterna');
    }

    
    let cerrarSesion = () => {
        Swal({
            title: '¿Desea cerrar sesión?',
            icon: 'warning',
            buttons: ["No, continuar navegando.", "Sí, cerrar sesión."],
            dangerMode: true,
        })
        .then((cerrarSesion) => {
            if(cerrarSesion){
                Swal({title: '¡Gracias por su visita!', icon: 'success'});

                ServicioUsuarios.cerrarSesion();
                navigate('/');
            }else{
                Swal({title: 'Su sesión continua activa', icon: 'success'});
            }
        });
    }

    return(
        <header className="bg-yellow sticky-top border-bottom border-brown">
            <div className="container">
                <nav className="row navbar mx-auto">

                    <nav className="nav justify-content-start col-md-4">
                        <a href="#" className=" custom-link py-3 nav-link text-brown" onClick={redirigirInicio}>Inicio</a>
                        <a href="#" className=" custom-link py-3 nav-link text-brown" onClick={redirigirListarPublicacionesAdmin}>Equipo</a>
                        <a href="#" className=" custom-link py-3 nav-link text-brown">Comunidad</a>
                    </nav>

                    <a href="#" className="navbar-brand col-md-2 justify-content-center mx-0" onClick={redirigirInicio}>
                        <img src={logo} alt="Logo" className="col-md-10"/>
                    </a>

                    <nav className="nav nav-pills justify-content-end col-md-4">

                        {usuarioActivo ? (
                            <a href="#" className="custom-link nav-link text-brown" onClick={redirigirPerfil}>Mi perfil</a>
                        ) : (
                            <a href="#" className="custom-link nav-link text-brown" onClick={redirigirRegistro}>Registrarse</a>
                        )}
                        
                        {usuarioActivo ? (
                            <a href="#" className="nav-link btn-brown text-yellow" onClick={cerrarSesion}>Cerrar Sesión</a>
                        ) : (
                            <a href="#" className="nav-link btn-brown text-yellow" onClick={redirigirInicioSesion}>Iniciar Sesión</a>
                        )}
                        
                    </nav>
                </nav>
            </div>
        </header>
    );
}

export default Header;