import axios from 'axios';

const _obtenerTodosLosUsuarios = async() => {
     let objUsuarios = {};
     
     await axios.get('http://localhost:5000/api/retornar_usuarios')
          .then(  (res) => {
               objUsuarios = res.data
          })

     return objUsuarios
}

const _obtenerUsuarioById = async(id) => {
     
     let usuario = {};

     await axios.get(`http://localhost:5000/api/retornar_usuario/${id}`)
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

     await axios.put(`http://localhost:5000/api/actualizar_usuario`, usuarioActualizado)
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
         if(usuario.contrasena === inicioSesionData.contrasena){
               response.contrasenaValida = true;
               response.contrasenaTemp = usuario.contrasenaTemp;

               sessionStorage.setItem('usuarioActivo', inicioSesionData.correoElectronico);
         }
     }
 
     return response
}

const _cerrarSesion = () => {
     sessionStorage.removeItem('usuarioActivo');
}

const _cambiarContrasena = async(reestablecerContrasenaData) => {
     let usuario = await _obtenerUsuarioById(reestablecerContrasenaData.correoElectronico),
          done = false;

     if(usuario){
          usuario.contrasena = reestablecerContrasenaData.nuevaContrasena;
          usuario.contrasenaTemp = reestablecerContrasenaData.temporal;
          
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

const _obtenerUsuarioActivo = () => {
     let usuarioActivo = sessionStorage.getItem('usuarioActivo');

     return usuarioActivo
}

const _actDesactUsuario = async(id, nuevoValor) => {
     let usuario = await _obtenerUsuarioById(id);

     usuario.desactivado = nuevoValor.desactivado;
     usuario.motivoDesact = nuevoValor.motivo;

     let response = API.actualizarUsuario(usuario);

     return response

}

const API = {
     obtenerTodosLosUsuarios: _obtenerTodosLosUsuarios,
     obtenerUsuarioById: _obtenerUsuarioById,
     registrarUsuario: _registrarUsuario,
     actualizarUsuario: _actualizarUsuario,
     crearSesion: _crearSesion,
     cerrarSesion: _cerrarSesion,
     obtenerUsuarioActivo: _obtenerUsuarioActivo,
     cambiarContrasena: _cambiarContrasena,
     enviarCorreoElectronico: _enviarCorreoElectronico,
     actDesactUsuario: _actDesactUsuario,
};

export default API;