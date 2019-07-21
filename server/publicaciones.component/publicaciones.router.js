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

router.route('/obtener_publicaciones_usuario/:correoElectronico')
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

router.route('/obtener_publicacion_id/:id')
    .get( (req, res) => {
        PublicacionModel.findById(req.params.id)
        .then( (publicacion) => {
            res.send(publicacion)
        })
        .catch( (err) => {
            res.send(false)
            res.send(err)
        })
    });

router.route('/actualizar_publicacion')
    .put( (req, res) => {
        const ActPublicacion = new PublicacionModel(req.body);
        
        ActPublicacion.updateOne(ActPublicacion)
        .then ((ActPublicacion) => {
            res.send(true)
        })
        .catch( (err) => {
            res.send(false)
            res.send(err)
        })

    })

module.exports = router;