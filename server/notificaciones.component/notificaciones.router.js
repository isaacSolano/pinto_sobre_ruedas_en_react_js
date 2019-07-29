const express = require('express'),
    router = express.Router(),
    NotificacionModel = require('./notificaciones.model');

router.route('/registrar_notificacion')
    .post( (req, res) => {
        const newNotificacion = new NotificacionModel(req.body);

        newNotificacion.save()
        .then( newNotificacion => {
            res.json(true)
        })
        .catch( err => {
            res.send(false)
            res.send(err)
        })
    });

router.route('/eliminar_notificacion_usuario')
    .post( (req, res) => {
        const id = req.body;

        NotificacionModel.deleteMany({usuario: id})
        .then( (response) => {
            res.send(true)
        })
        .catch( (err) => {
            res.send(false)
            res.send(err)
        })
    });

router.route('/eliminar_notificacion_publicacion')
    .post( (req, res) => {
        const id = req.body;

        NotificacionModel.deleteMany({idPublicacion: id})
        .then( (response) => {
            res.send(true)
        })
        .catch( (err) => {
            res.send(false)
            res.send(err)
        })
    });

module.exports = router;