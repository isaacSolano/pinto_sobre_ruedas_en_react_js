import React from 'react';
import { useRoutes, navigate } from 'hookrouter';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

import Perfil from 'components/Usuarios/Perfil/Perfil';
import CambiarContrasena from 'components/Usuarios/CambiarContrasena/CambiarContrasena';
import EditarUsuario from 'components/Usuarios/EditarUsuario/EditarUsuario';

import NotFound from 'components/404/404'; 

const AplicacionInterna = () => {
    let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();

    if(!usuarioActivo){
        navigate('/');
    }

    const internRoutes = {
        '/': () => <Perfil usuarioActivo={usuarioActivo} />,
        '/cambiarContrasena': () => <CambiarContrasena />,
        '/editarUsuario': () => <EditarUsuario />
    }

    const routeResult = useRoutes(internRoutes);
    
    return routeResult || <NotFound />
};

export default AplicacionInterna