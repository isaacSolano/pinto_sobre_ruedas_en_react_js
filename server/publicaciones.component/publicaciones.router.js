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

module.exports = router;