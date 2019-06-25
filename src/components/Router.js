import React from 'react';
import {useRoutes} from 'hookrouter';

import LandingPage from 'components/LandingPage/LandingPage';
import RegistroUsuarios from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import InicioSesion from 'components/InicioSesion/InicioSesion';

import NotFound from 'components/404/404';


const routes = {
    '/': () => <LandingPage />,
    '/registroUsuarios': () => <RegistroUsuarios />,
    '/inicioSesion': () => <InicioSesion />
}

const Router = () => {
    const routeResult = useRoutes(routes);

    return routeResult || <NotFound />;
}

export default Router