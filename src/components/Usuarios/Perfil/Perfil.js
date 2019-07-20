import React from 'react';
import { navigate } from 'hookrouter';
import Swal from 'sweetalert';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna'
import Footer from 'components/Footer/Footer';


import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const Perfil = (props) => {

    const infoUsuarioActivo = props.usuarioActivo;

    switch (infoUsuarioActivo.desactivado){
        case 1:
            Swal({
                title: 'Su perfil se encuentra desactivado.',
                text: '¿Desea reacttivar su perfil para continuar?',
                icon: 'warning',
                dangerMode: true,
                buttons: ['Mantener perfil desactivado', 'Reactivar perfil'],
            }).then( async(confirmacion) => {
                if(confirmacion){
                    let reactData = {
                        desactivado: 0,
                        motivo: "",
                    }
                    await ServicioUsuarios.actDesactUsuario(infoUsuarioActivo.correoElectronico, reactData);
                    Swal({
                        title: 'Su perfil se ha reactivado',
                        text: 'Bienvenido a pinto sobre ruedas',
                        icon: 'success'
                    })
                }else{
                    ServicioUsuarios.cerrarSesion();
                    navigate('/');
    
                    Swal({
                        title: 'Su perfil se mantiene desactivado',
                        text: 'Gracias por visiar pinto sobre ruedas',
                        icon: 'success',
                    });
                }
            });
        break;

        case 2: 
            Swal({
                title: 'Su perfil fue desactivado por la  administración',
                text: `Razon de la desactivación: "${infoUsuarioActivo.motivoDesact}". Por favor actualice sus datos para continuar`,
                icon: 'warning',
                dangerMode: true,
                buttons: ['Mantener perfil desactivado', 'Editar información']
            }).then( (confirmacion) => {
                if(confirmacion){
                    navigate('/aplicacionInterna/editarUsuario');
                }else{
                    ServicioUsuarios.cerrarSesion();
                    navigate('/');
                    
                    Swal({
                        title: 'Su perfil se mantiene desactivado',
                        text: 'Gracias por visiar pinto sobre ruedas',
                        icon: 'success',
                    });
                }
            })
        break;
    }

    let fechaNacimientoUsuarioActivo = () => {
        let mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaConFormato =  new Date(infoUsuarioActivo.fechaNacimiento).getDate() + 1 + ' ' + mesesDelAnio[new Date(infoUsuarioActivo.fechaNacimiento).getMonth()] + ' ' + new Date(infoUsuarioActivo.fechaNacimiento).getFullYear();

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
                let desactData = {desactivado: 1, motivoDesact: ''}
                await ServicioUsuarios.actDesactUsuario(infoUsuarioActivo.correoElectronico, desactData);
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
            <NavegacionInterna usuarioActivo={infoUsuarioActivo} />

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
                                <OverlayTrigger placement="top" overlay={<Tooltip>Editar información</Tooltip>}>
                                    <a href="#" className="nav-link btn-brown text-yellow mx-1" onClick={redirigirEditarUsuario}>
                                        <span className="fas fa-user-edit"></span>
                                    </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Desactivar usuario</Tooltip>}>
                                    <a href="#" className="nav-link btn-brown text-yellow mx-1" onClick={redirigirDesactivarUsuario}>
                                        <span className="fas fa-user-slash"></span>
                                    </a>
                                </OverlayTrigger>

                                <OverlayTrigger placement="top" overlay={<Tooltip>Cambiar contraseña</Tooltip>}>
                                    <a href="#" className="nav-link btn-brown text-yellow mx-1" onClick={redirigirCambiarContrasena}>
                                        <span className="fas fa-key"></span>
                                    </a>
                                </OverlayTrigger>
                                
                                                                

                            </nav>

                        </div>
                
                    </div>

                    <div className="col-md-12 mt-4">
                        <p className="text-brown font-weight-bold">Primer nombre: <span className="font-weight-normal">{infoUsuarioActivo.primerNombre}</span></p>

                        <p className="text-brown font-weight-bold">Primer apellido: <span className="font-weight-normal">{infoUsuarioActivo.primerApellido}</span></p>
                    
                        <p className="text-brown font-weight-bold">Correo electrónico <span className="font-weight-normal">{infoUsuarioActivo.correoElectronico}</span></p>

                        <p className="text-brown font-weight-bold">Fecha de nacimiento: <span className="font-weight-normal">{fechaNacimientoUsuarioActivo()}</span></p>

                        <p className="text-brown font-weight-bold">Modalidad: <span className="font-weight-normal text-capitalize">{infoUsuarioActivo.modalidad}</span></p>
                    </div>
                        
                </div>

            </main>

            <Footer />
        </>
    )
}

export default Perfil;