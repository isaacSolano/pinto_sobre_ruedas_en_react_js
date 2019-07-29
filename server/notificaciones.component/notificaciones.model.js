const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const NotificacionSchema = new Schema({
    usuario: {type: String, required: true},
    primerNombre: {type: String, required: true},
    primerApellido: {type: String, required: true},
    idPublicacion: {type: String, required: false},
    tituloPublicacion: {type: String, required: false},
    tipo: {type: String, required: true},
});

module.exports = mongoose.model('Notificaciones', NotificacionSchema);