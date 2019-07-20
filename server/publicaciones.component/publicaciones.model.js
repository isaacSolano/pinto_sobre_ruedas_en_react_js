const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionesSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen1: {type: String, required: false},
    imagen2: {type: String, required: false},
    imagen3: {type: String, required: false},
    imagen4: {type: String, required: false},
    usuario: {type: String, required: true},
    fecha: {type: String, required: true},
    desactivado: {type: Number, required: true},
    motivoDesact: {type: String, required: false},
});

module.exports = mongoose.model('Publicaciones', PublicacionesSchema);