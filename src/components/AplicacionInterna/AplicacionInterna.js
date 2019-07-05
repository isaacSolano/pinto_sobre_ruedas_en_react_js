import React, {useState, useEffect} from 'react';
import { useRoutes, navigate } from 'hookrouter';
import Swal from 'sweetalert';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

import Perfil from 'components/Usuarios/Perfil/Perfil';
import CambiarContrasena from 'components/Usuarios/CambiarContrasena/CambiarContrasena';
import EditarUsuario from 'components/Usuarios/EditarUsuario/EditarUsuario';
import RegistroColaboradores from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import ListarUsuarios from 'components/Usuarios/ListarUsuarios/ListarUsuarios';

import NotFound from 'components/404/404'; 

const AplicacionInterna = () => {
    
    let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();
    const [infoUsuarioActivo, setInfoUsuarioActivo] = useState({});

    useEffect( () => {
        let obtenerInfoUsuarioActivo = async() => {
            let datos = await ServicioUsuarios.obtenerUsuarioById(usuarioActivo);

            setInfoUsuarioActivo(datos);
        }
        obtenerInfoUsuarioActivo();
    }, [usuarioActivo]);

    if(infoUsuarioActivo.desactivado){
        Swal({
            title: 'Su perfil se encuentra desactivado.',
            text: '¿Desea reacttivar su perfil para continuar?',
            icon: 'warning',
            buttons: ['Mantener perfil desactivado', 'Reactivar perfil'],
        }).then( async(confirmacion) => {
            if(confirmacion){
                await ServicioUsuarios.actDesactUsuario(usuarioActivo);

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
    }

    if(!usuarioActivo){
        navigate('/');
    }

    const internRoutes = {
        '/': () => <Perfil infoUsuarioActivo={infoUsuarioActivo} />,
        '/cambiarContrasena': () => <CambiarContrasena usuarioActivo={usuarioActivo} />,
        '/editarUsuario': () => <EditarUsuario infoUsuarioActivo={infoUsuarioActivo} />,
        '/registroColaboradores': () => <RegistroColaboradores rolUsuario={infoUsuarioActivo.rol} />,
        '/listarUsuarios': () => <ListarUsuarios rolUsuario={infoUsuarioActivo.rol} usuarioActivo={usuarioActivo} />,
    }

    const routeResult = useRoutes(internRoutes);
    
    return routeResult || <NotFound />
};

export default AplicacionInterna