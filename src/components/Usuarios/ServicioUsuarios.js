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

const _obtenerUsuarioById = async(id) => {

     let usuario = {};

     await axios.get('http://localhost:5000/api/retornar_usuario/' + id)
     .then( (res) => {
         usuario = res.data;
     })

     return usuario
}

const _registrarUsuario = async(nuevoUsuario) => {
     let status;

     await axios.post('http://localhost:5000/api/registrar_usuario', nuevoUsuario)
     .then( (res) =>
          status = res.data
     )
     .catch( (err) => {
          status = err
     })

     return status
}

const _actualizarUsuario = async(usuarioActualizado) => {
     let done;

     await axios.put('http://localhost:5000/api/actualizar_usuario', usuarioActualizado)
     .then( (res) => {
          done = res.data
     })
     .catch( (err) => {
          console.log(err)
          done = false;
     })

     return done;
}

const _crearSesion = async(inicioSesionData) => {

     let usuario = await _obtenerUsuarioById(inicioSesionData.correoElectronico),
         response = {
             usuarioValido: false, 
             contrasenaValida: false,
             contrasenaTemp: false,
         };
 
     if(usuario){
         response.usuarioValido = true;
         if(usuario.contrasena.valor === inicioSesionData.contrasena){
               response.contrasenaValida = true;

               if(usuario.contrasena.temp){
                    response.contrasenaTemp = true
               }else{
                    sessionStorage.setItem('usuarioActivo', inicioSesionData.correoElectronico);
               }
         }
     }
 
     return response
}

const _cambiarContrasena = async(reestablecerContrasenaData) => {
     let usuario = await _obtenerUsuarioById(reestablecerContrasenaData.correoElectronico),
          done = false;

     if(usuario){
          usuario.contrasena.valor = reestablecerContrasenaData.nuevaContrasena;
          usuario.contrasena.temp = reestablecerContrasenaData.temporal;
          
          done = true

          API.actualizarUsuario(usuario);
     }
     
     return done
}

const _enviarCorreoElectronico = async(enviarCorreoElecttronicoData) => {
     let enviarInformacion ={
          dest: enviarCorreoElecttronicoData.correoElectronico,
          asunto: 'Nueva contrasena',
          inf: enviarCorreoElecttronicoData.nuevaContrasena
     }

     await axios.post('http://localhost:5000/api/enviarCorreo', enviarInformacion);
}

const API = {
     obtenerTodosLosUsuarios: _obtenerTodosLosUsuarios,
     obtenerUsuarioById: _obtenerUsuarioById,
     registrarUsuario: _registrarUsuario,
     actualizarUsuario: _actualizarUsuario,
     crearSesion: _crearSesion,
     cambiarContrasena: _cambiarContrasena,
     enviarCorreoElectronico: _enviarCorreoElectronico,
};

export default API;