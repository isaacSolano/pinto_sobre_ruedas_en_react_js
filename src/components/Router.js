import React from 'react';
import {useRoutes} from 'hookrouter';

import LandingPage from 'components/LandingPage/LandingPage';
import ListarPublicacionesAdmin from 'components/ListarPublicacionesAdmin/ListarPublicacionesAdmin';
import RegistroUsuarios from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import InicioSesion from 'components/Usuarios/InicioSesion/InicioSesion';
import ReestablecerContrasena from 'components/Usuarios/ReestablecerContrasena/ReestablecerContrasena';
import AplicacionInterna from 'components/AplicacionInterna/AplicacionInterna';

import NotFound from 'components/404/404';


const routes = {
    '/': () => <LandingPage />,
    '/registroUsuarios': () => <RegistroUsuarios />,
    '/inicioSesion': () => <InicioSesion />,
    '/reestablecerContrasena': () => <ReestablecerContrasena />,
    '/listarPublicacionesAdmin': () => <ListarPublicacionesAdmin />,
    '/aplicacionInterna*': () => <AplicacionInterna />,
}

const Router = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFound />;
}

export default Router