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

const _obtenerPublicacionId = async(id) => {
    let response = false;

    await axios.get(`http://localhost:5000/api/obtener_publicacion_id/${id}`)
    .then( res => {
        response = res.data    
    })
    .catch( err => {
        response = err
    })

    return response
}

const _actDesactPublicacion = async(id, nuevosValores) => {
    let publicacion = await API.obtenerPublicacionId(id),
        response = false;

    if(publicacion){
        publicacion.desactivado = nuevosValores.tipo;
        publicacion.motivoDesact = nuevosValores.motivoDesact;

        response = API.actualizarPublicacion(publicacion);

        if(!response){
            return response
        }
    }else{
        response = publicacion
    }

    return response
}

const _actualizarPublicacion = async(nuevaPublicacion) => {
    let response = await axios.put('http://localhost:5000/api/actualizar_publicacion', nuevaPublicacion);

    return response
}

const _editarPublicacion = async(nuevaPublicacion, eliminarImagenes, nuevasImagenes) => {
    let response = false;
    for(let i=0; i < nuevasImagenes.length; i++) {
        let path = `/ride_${Date.now()}_${nuevasImagenes[i].name}`,
        storageRef = firebase.storage().ref(path),
        metadata = {contentType: nuevasImagenes[i].type};

        await storageRef.put(nuevasImagenes[i], metadata)
        .then( (res) => {
            storageRef.getDownloadURL()
            .then( async(url) => {
                for(let [propiedad, valor] of Object.entries(nuevaPublicacion)){
                    
                    if(propiedad.substring(0, 3) === 'ima' && valor === ''){
                        nuevaPublicacion = {...nuevaPublicacion, [propiedad]: url}
                        API.actualizarPublicacion(nuevaPublicacion)
                        .then( async (res) => {
                            return await res.data
                        })
                        
                        break;
                    }
                }
            });
        });
    };

    API.eliminarImagen(eliminarImagenes)
    .then( async(res) => {
        await API.actualizarPublicacion(nuevaPublicacion);
    })
}

const _eliminarImagen = async(urlImagenes) => {
    let response = [];
    for(let i = 0; i<urlImagenes.length; i++){
        let imageRef = firebase.storage().refFromURL(urlImagenes[i]);

        imageRef.delete()
        .then( res => {
            response.push(res);
        })
        .catch( err => {
            response.push(err);
        })
    }

    for(let i = 0; i>response.length; i++){
        if(!response[i]){
            return false
        }else{
            return true
        }
    }
}

const API = {
    registrarPublicacion: _registrarPublicacion,
    obtenerPublicacionesUsuarioActivo: _obtenerPublicacionesUsuarioActivo,
    obtenerPublicacionId: _obtenerPublicacionId, 
    actDesactPublicacion: _actDesactPublicacion,
    actualizarPublicacion: _actualizarPublicacion,
    editarPublicacion: _editarPublicacion,
    eliminarImagen: _eliminarImagen,
};

export default API;