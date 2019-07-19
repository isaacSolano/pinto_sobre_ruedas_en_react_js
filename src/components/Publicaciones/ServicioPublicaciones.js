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

const API = {
    registrarPublicacion: _registrarPublicacion,
};

export default API;