const express = require('express'),
    router = express.Router(),
    PublicacionModel = require('./publicaciones.model');

router.route('/registrar_publicacion')
    .post( (req, res) => {

        const nuevaPublicacion = new PublicacionModel(req.body)

        nuevaPublicacion.save()
        .then(nuevaPublicacion => {
            res.json(true);
        })
        .catch( err => {
            res.send(false);
            res.send(err);   
        })

    });

router.route(`/obtener_publicaciones_usuario/:correoElectronico`)
    .get( (req, res) => {
        PublicacionModel.find()
        .then( (publicaciones) => {
            let publicacionesUsuario = [];
            publicaciones.forEach( (publicacion) => {
                if(publicacion.usuario == req.params.correoElectronico){
                    publicacionesUsuario.push(publicacion)
                }
            })
            res.send(publicacionesUsuario);
        })
    });

module.exports = router;