import axios from 'axios';
import firebase from 'firebase/app';

import firebaseConfig from 'config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

const _registrarPublicacion = async(imagenesPublicacion, informacionPublicacion) => {

    let response = false;

    if(imagenesPublicacion){
        for(let i=0; i<imagenesPublicacion.length; i++) {
            let path = `/ride_${Date.now()}_${imagenesPublicacion[i].name}`,
            storageRef = firebase.storage().ref(path),
            metadata = {contentType: imagenesPublicacion[i].type};
    
            await storageRef.put(imagenesPublicacion[i], metadata)
            .then( (res) => {
                storageRef.getDownloadURL()
                .then( async(url) => {
                    informacionPublicacion = {...informacionPublicacion, [`imagen${i+1}`]: url}
    
                    if(imagenesPublicacion.length === i+1){
                        response = await axios.post('http://localhost:5000/api/registrar_publicacion', informacionPublicacion);

                        return await response
                    }
                });
            });
        };
    }

}

const _obtenerPublicacionesUsuarioActivo = async(usuarioActivo) => {
    let response = false,
    publicacionesUsuarioActivo = {};

    await axios.get(`http://localhost:5000/api/obtener_publicaciones_usuario/${usuarioActivo}`)
    .then( (res) => {
        publicacionesUsuarioActivo = res.data;
    })
    .catch( (err) => {
        response = err;
    })

    if(!response){
        return publicacionesUsuarioActivo
    }else{
        return response
    }
}

const _actDesactPublicacion = async(id, nuevosValores) => {
    let publicacion = await axios.get(`http://localhost:5000/api/obtener_publicacion_id/${id}`),
        nuevaPublicacion = publicacion.data;

    nuevaPublicacion.desactivado = nuevosValores.tipo;
    nuevaPublicacion.motivoDesact = nuevosValores.motivoDesact;

    let response = API.actualizarPublicacion(nuevaPublicacion);

    return response
}

const _actualizarPublicacion = async(nuevaPublicacion) => {
    let response = await axios.put('http://localhost:5000/api/actualizar_publicacion', nuevaPublicacion);

    return response
}

const API = {
    registrarPublicacion: _registrarPublicacion,
    obtenerPublicacionesUsuarioActivo: _obtenerPublicacionesUsuarioActivo,
    actDesactPublicacion: _actDesactPublicacion,
    actualizarPublicacion: _actualizarPublicacion,
};

export default API;