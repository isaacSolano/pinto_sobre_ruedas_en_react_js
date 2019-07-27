import React, {useState, useEffect} from 'react';
import { useRoutes, navigate } from 'hookrouter';
import Swal from 'sweetalert';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

import Perfil from 'components/Usuarios/Perfil/Perfil';
import CambiarContrasena from 'components/Usuarios/CambiarContrasena/CambiarContrasena';
import EditarUsuario from 'components/Usuarios/EditarUsuario/EditarUsuario';
import RegistroColaboradores from 'components/Usuarios/RegistroUsuarios/RegistroUsuarios';
import ListarUsuarios from 'components/Usuarios/ListarUsuarios/ListarUsuarios';

import RegistrarPublicacion from 'components/Publicaciones/RegistrarPublicacion/RegistrarPublicacion';
import ListarPublicaciones from 'components/Publicaciones/ListarPublicaciones/ListarPublicaciones';
import EditarPublicacion from 'components/Publicaciones/EditarPublicacion/EditarPublicacion';

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

    if(!usuarioActivo){
        navigate('/');
    }

    const internRoutes = {
        '/': () => <Perfil usuarioActivo={infoUsuarioActivo} />,
        '/cambiarContrasena': () => <CambiarContrasena usuarioActivo={infoUsuarioActivo} />,
        '/editarUsuario': () => <EditarUsuario usuarioActivo={infoUsuarioActivo} />,
        '/registroColaboradores': () => <RegistroColaboradores usuarioActivo={infoUsuarioActivo} />,
        '/listarUsuarios': () => <ListarUsuarios usuarioActivo={infoUsuarioActivo} />,
        '/registrarPublicacion': () => <RegistrarPublicacion usuarioActivo={infoUsuarioActivo} />,
        '/listarPublicaciones': () => <ListarPublicaciones usuarioActivo={infoUsuarioActivo}/>,
        '/editarPublicacion/:idPublicacion': ({idPublicacion}) => <EditarPublicacion usuarioActivo={infoUsuarioActivo} idPublicacion={idPublicacion} />
    }

    const routeResult = useRoutes(internRoutes);
    
    return routeResult || <NotFound usuarioActivo={infoUsuarioActivo} />
};

export default AplicacionInterna