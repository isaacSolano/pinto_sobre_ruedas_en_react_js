const express = require('express');
     router = express.Router(),
     UsuarioModel = require('./usuarios.model');



router.route('/registrar_usuario')
     .post( (req, res) => {
     
          const newUsuario = new UsuarioModel(req.body);
          
          newUsuario.save()
               .then(newUsuario => {
                    res.json(true);
               })
               .catch(err => {
                    res.send(false);
                    res.send(err);
               })

     });

router.route('/retornar_usuarios')
     .get( (req, res) => {
     
          UsuarioModel.find().then((usuarios) => {
               res.send(usuarios);
          });

     });

router.route('/retornar_usuario/:correoElectronico')
     .get( (req, res) => {
          UsuarioModel.find( {correoElectronico: req.params.correoElectronico} )
               .then( (usuario) => {
                    res.send(usuario[0])
               })
     });

module.exports = router;