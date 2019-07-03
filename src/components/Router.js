import React from 'react';
import {useRoutes} from 'hookrouter';

import LandingPage from 'components/LandingPage/LandingPage';
import RegistroUsuarios from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import InicioSesion from 'components/Usuarios/InicioSesion/InicioSesion';
import ReestablecerContrasena from 'components/Usuarios/ReestablecerContrasena/ReestablecerContrasena';
import CambiarContrasena from 'components/Usuarios/CambiarContrasena/CambiarContrasena';
import AplicacionInterna from 'components/AplicacionInterna/AplicacionInterna';

import NotFound from 'components/404/404';


const routes = {
    '/': () => <LandingPage />,
    '/registroUsuarios': () => <RegistroUsuarios />,
    '/inicioSesion': () => <InicioSesion />,
    '/reestablecerContrasena': () => <ReestablecerContrasena />,
    '/cambiarContrasena/:correoElectronico': ({correoElectronico}) => <CambiarContrasena correoElectronico={correoElectronico} />,
    '/aplicacionInterna*': () => <AplicacionInterna />
}

const Router = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFound />;
}

export default Router