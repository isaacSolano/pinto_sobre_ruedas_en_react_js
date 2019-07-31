import React, {useState, useEffect} from 'react';
import { useRoutes, navigate } from 'hookrouter';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';
import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';
import ServicioNotificaciones from 'components/Notificaciones/ServicioNotificaciones';

import Perfil from 'components/Usuarios/Perfil/Perfil';
import CambiarContrasena from 'components/Usuarios/CambiarContrasena/CambiarContrasena';
import EditarUsuario from 'components/Usuarios/EditarUsuario/EditarUsuario';
import RegistroColaboradores from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import ListarUsuarios from 'components/Usuarios/ListarUsuarios/ListarUsuarios';

import RegistrarPublicacion from 'components/Publicaciones/RegistrarPublicacion/RegistrarPublicacion';
import ListarPublicaciones from 'components/Publicaciones/ListarPublicaciones/ListarPublicaciones';
import EditarPublicacion from 'components/Publicaciones/EditarPublicacion/EditarPublicacion';

import ListarNotificaciones from 'components/Notificaciones/ListarNotificaciones/ListarNotificaciones';
import ListaNotificacionAdmin from 'components/Notificaciones/ListarNotificaciones/ListaNotificacionAdmin';

import NotFound from 'components/404/404'; 

const AplicacionInterna = () => {
    
    let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();
    const [infoUsuarioActivo, setInfoUsuarioActivo] = useState({}),
        [publicacionesUsuarioActivo, setPublicacionesUsuarioACtivo] = useState([]),
        [notificaciones, setNotificaciones] = useState([]);

    useEffect( () => {
        let obtenerInfoUsuarioActivo = async() => {
            let datos = await ServicioUsuarios.obtenerUsuarioById(usuarioActivo);

            setInfoUsuarioActivo(datos);
        }

        let obtenerPublicacionesUsuarioActivo = async() => {
            let publicaciones = await ServicioPublicaciones.obtenerPublicacionesUsuarioActivo(usuarioActivo);

            setPublicacionesUsuarioACtivo(publicaciones);
        }

        let obtenerNotificaciones = async() => {
            let todasLasNotificaciones = await ServicioNotificaciones.obtenerNotificaciones();

            setNotificaciones(todasLasNotificaciones);
        }

        obtenerInfoUsuarioActivo();
        obtenerPublicacionesUsuarioActivo();
        obtenerNotificaciones();
    }, [usuarioActivo]);

    if(!usuarioActivo){
        navigate('/');
    }

    const internRoutes = {
        '/': () => <Perfil usuarioActivo={infoUsuarioActivo} publicacionesUsuarioActivo={publicacionesUsuarioActivo} notificaciones={notificaciones}/>,
        '/cambiarContrasena': () => <CambiarContrasena usuarioActivo={infoUsuarioActivo} />,
        '/editarUsuario': () => <EditarUsuario usuarioActivo={infoUsuarioActivo} />,
        '/registroColaboradores': () => <RegistroColaboradores usuarioActivo={infoUsuarioActivo} />,
        '/listarUsuarios': () => <ListarUsuarios usuarioActivo={infoUsuarioActivo} />,
        '/registrarPublicacion': () => <RegistrarPublicacion usuarioActivo={infoUsuarioActivo} />,
        '/listarPublicaciones': () => <ListarPublicaciones usuarioActivo={infoUsuarioActivo} publicacionesUsuarioActivo={publicacionesUsuarioActivo} />,
        '/editarPublicacion/:idPublicacion': ({idPublicacion}) => <EditarPublicacion usuarioActivo={infoUsuarioActivo} idPublicacion={idPublicacion} />,
        '/listarNotificaciones': () => <ListarNotificaciones usuarioActivo={infoUsuarioActivo} notificaciones={notificaciones} />,
        '/listaNotificacionAdmin/:tipo/:id': ({tipo, id}) => <ListaNotificacionAdmin usuarioActivo={infoUsuarioActivo} tipo={tipo} id={id}/>
    }

    const routeResult = useRoutes(internRoutes);
    
    return routeResult || <NotFound usuarioActivo={infoUsuarioActivo} />
};

export default AplicacionInterna