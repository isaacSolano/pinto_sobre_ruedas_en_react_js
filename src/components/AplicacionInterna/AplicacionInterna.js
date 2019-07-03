import React from 'react';
import { useRoutes, navigate } from 'hookrouter';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

import Perfil from 'components/Usuarios/Perfil/Perfil';

import NotFound from 'components/404/404'; 

const AplicacionInterna = () => {
    let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();

    if(!usuarioActivo){
        navigate('/');
    }

    const internRoutes = {
        '/': () => <Perfil usuarioActivo={usuarioActivo} />,
    }

    const routeResult = useRoutes(internRoutes);
    
    return routeResult || <NotFound />
};

export default AplicacionInterna