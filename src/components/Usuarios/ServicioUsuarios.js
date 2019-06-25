import axios from 'axios';

const _obtenerTodosLosUsuarios = async() => {
     let objUsuarios = {};
     
     await axios.get('http://localhost:5000/api/retornar_usuarios')
          .then(  (res) => {
               objUsuarios = res.data
          })
          .catch( (err) => {
               console.log(err)
          });

     return objUsuarios
}

const _registrarUsuario = async(nuevoUsuario) => {
     let status

     await axios.post('http://localhost:5000/api/registrar_usuario', nuevoUsuario)
     .then( (res) =>
          status = res.data
     )
     .catch( (err) => {
          status = err
          console.log(err)
     })

     return status
}

const _obtenerUsuarioById = async(usuarioData) => {

     let usuario = {};

     await axios.get('http://localhost:5000/api/retornar_usuario/' + usuarioData.correoElectronico)
     .then( (res) => {
         usuario = res.data;
     })

     return usuario
}

const API = {
     obtenerTodosLosUsuarios: _obtenerTodosLosUsuarios,
     registrarUsuario : _registrarUsuario,
     obtenerUsuarioById: _obtenerUsuarioById,
};

export default API;