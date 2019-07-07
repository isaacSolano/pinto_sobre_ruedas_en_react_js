const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
     primerNombre: {type: String, required: true},
     primerApellido: {type: String, required: true},
     correoElectronico: {type: String, required: true, unique:true },
     fechaNacimiento: {type: Date, required: true},
     contrasena: {type: String, required: true}, 
     contrasenaTemp: {type: Boolean, required: true},
     modalidad: {type: String, required: true},
     rol: {type: Number, required: true},
     desactivado: {type: Number, required: true},
     motivoDesact: {type: String},
});

module.exports = mongoose.model('Usuario', UsuarioSchema);