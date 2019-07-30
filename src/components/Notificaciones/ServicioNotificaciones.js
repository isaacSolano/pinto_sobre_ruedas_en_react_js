import axios from 'axios';

const _registrarNotificacion = async(nuevaNotificacion) => {
    let response = false;
    switch (nuevaNotificacion.tipo) {
        case 'usuario':
            response = API.eliminarPreviaNotificacionUsuario(nuevaNotificacion.usuario);
        break;

        case 'publicacion':
            response = API.eliminarPreviaNotificacionPublicacion(nuevaNotificacion.idPublicacion);
        break;
    }

    if(response){
        await axios.post('http://localhost:5000/api/registrar_notificacion', nuevaNotificacion);
    }
}

const _eliminarPreviaNotificacionUsuario = async(idUsuario) => {
    let response = await axios.post('http://localhost:5000/api/eliminar_notificacion_usuario', [idUsuario]);

    return response
}

const _eliminarPreviaNotificacionPublicacion = async(idPublicacion) => {
    let response = await axios.post('http://localhost:5000/api/eliminar_notificacion_publicacion', [idPublicacion]);

    return response
}

const _obtenerNotificaciones = async() => {
    let todasLasNotificaciones = [];
    await axios.get('http://localhost:5000/api/obtener_notificaciones')
    .then( (res) => {
        todasLasNotificaciones = res.data;
    });

    return todasLasNotificaciones
}

const API = {
    registrarNotificacion: _registrarNotificacion,
    eliminarPreviaNotificacionUsuario: _eliminarPreviaNotificacionUsuario,
    eliminarPreviaNotificacionPublicacion: _eliminarPreviaNotificacionPublicacion,
    obtenerNotificaciones: _obtenerNotificaciones,
}

export default API;