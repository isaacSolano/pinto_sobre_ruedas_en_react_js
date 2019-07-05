import React from 'react';
import { navigate } from 'hookrouter';
import Swal from 'sweetalert';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna'

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const Perfil = (props) => {

    const informacionUsuarioActivo = props.infoUsuarioActivo;

    let fechaNacimientoUsuarioActivo = () => {
        let mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaConFormato =  new Date(informacionUsuarioActivo.fechaNacimiento).getDate() + 1 + ' ' + mesesDelAnio[new Date(informacionUsuarioActivo.fechaNacimiento).getMonth()] + ' ' + new Date(informacionUsuarioActivo.fechaNacimiento).getFullYear();

            return fechaConFormato
    }

    let redirigirEditarUsuario = () => {
        navigate('/aplicacionInterna/editarUsuario');
    }
    let redirigirDesactivarUsuario = (e) => {
        e.preventDefault();
        Swal({
            title: '¿Desea desactivar su perfil?',
            text: 'Puede reactivarlo cuando desee solo con iniciar sesión.',
            icon: 'warning',
            buttons: ["Mantener perfil activo", "Desactivar perfil"],
            dangerMode: true,
        })
        .then( async(confirmacion) => {
            if(confirmacion){
                Swal({
                    title: 'Adiós',
                    text: 'Gracias por compartir sus historias con nosotros.',
                    icon: 'success',
                });

                await ServicioUsuarios.actDesactUsuario(informacionUsuarioActivo.correoElectronico);
                await ServicioUsuarios.cerrarSesion();
                navigate('/');
            }else{
                Swal({
                    title: 'Su perfil continua activo',
                    text: 'Gracias por seguir compartiendo historias con nosotros.',
                    icon: 'success',
                })
            }
        });
    }

    let redirigirCambiarContrasena = () => {
        navigate(`/aplicacionInterna/cambiarContrasena`);
    }

    return (
        <>
            <Header />

            <main className="container p-6">

                <div className="row p-5">
                    <div className="col-md-12">
                        <h1 className="text-center text-brown">Bienvenido a <span className="font-weight-bold font-italic">pinto sobre ruedas</span> </h1>
                    </div>
                </div>

                <div className="row border border-yellow rounded p-4 mt-4">
                    
                    <div className="col-md-12 border-bottom border-yellow p-4">

                        <div className="row">

                            <h2 className="col-md-6 justify-content-start text-brown">Información personal</h2>
                            
                            <nav className="col-md-6 justify-content-end nav nav-pills ">
                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Editar perfil" data-placement="top" onClick={redirigirEditarUsuario}>
                                    <span className="fas fa-user-edit"></span>
                                </a>
                                
                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Desactivar usuario" data-placement="top" onClick={redirigirDesactivarUsuario}>
                                    <span className="fas fa-user-slash"></span>
                                </a>

                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Cambiar contraseña" data-placement="top" onClick={redirigirCambiarContrasena}>
                                    <span className="fas fa-key"></span>
                                </a>
                            </nav>

                        </div>
                
                    </div>

                    <div className="col-md-12 mt-4">
                        <p className="text-brown font-weight-bold">Primer nombre: <span className="font-weight-normal">{informacionUsuarioActivo.primerNombre}</span></p>

                        <p className="text-brown font-weight-bold">Primer apellido: <span className="font-weight-normal">{informacionUsuarioActivo.primerApellido}</span></p>
                    
                        <p className="text-brown font-weight-bold">Correo electrónico <span className="font-weight-normal">{informacionUsuarioActivo.correoElectronico}</span></p>

                        <p className="text-brown font-weight-bold">Fecha de nacimiento: <span className="font-weight-normal">{fechaNacimientoUsuarioActivo()}</span></p>

                        <p className="text-brown font-weight-bold">Modalidad: <span className="font-weight-normal text-capitalize">{informacionUsuarioActivo.modalidad}</span></p>
                    </div>
                        
                </div>

                <NavegacionInterna usuarioActivo={props.infoUsuarioActivo.correoElectronico} />

            </main>

            <Footer />
        </>
    )
}

export default Perfil;