const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
     primerNombre: {type: String, required: true},
     primerApellido: {type: String, required: true},
     correoElectronico: {type: String, required: true, unique:true },
     fechaNacimiento: {type: String, required: true},
     contrasena: {type: String, required: true},
     modalidad: {type: String, required: true},
     rol: {type: Number, required: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);