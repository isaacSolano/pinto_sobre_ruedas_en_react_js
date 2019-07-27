import React from 'react';
import {navigate} from 'hookrouter';
import Swal from 'sweetalert';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const VerificacionesUsuario = (props) => {

    let infoUsuarioActivo = props.usuarioActivo;

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

    if(infoUsuarioActivo.contrasenaTemp){
        Swal({
            title: 'Estás usando una contrasena temporal',
            text: 'Cambiela para poder continuar',
            icon: 'warning',
            buttons: ['Regresar', 'Cambiar contrasena'],
            dangerMode: true,
        })
        .then(confirmacion => {
            if(confirmacion){
                navigate('/aplicacionInterna/cambiarContrasena');
            }else{
                Swal({
                    title: 'Nos vemos pronto',
                    text: 'Gracias por visitar pinto sobre ruedas',
                    icon: 'success',
                });
                ServicioUsuarios.cerrarSesion();
                navigate('/');
            }
        })
    }

    return(<></>)
}

export default VerificacionesUsuario