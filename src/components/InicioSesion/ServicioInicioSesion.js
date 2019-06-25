import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const _verificarUsuarioLogin = async(inicioSesionData) => {

    let usuario = await ServicioUsuarios.obtenerUsuarioById(inicioSesionData),
        response = {
            usuarioValido: false, 
            contrasenaValida: false
        };

    if(usuario){
        response.usuarioValido = true;
        if(usuario.contrasena === inicioSesionData.contrasena){
            response.contrasenaValida = true;
        }
    }

    return response
}

const _crearSesion = (nuevoCorreoActivo) => {
    sessionStorage.setItem('usuarioActivo', nuevoCorreoActivo)
}

const API = {
    verificarUsuarioLogin: _verificarUsuarioLogin,
    crearSesion: _crearSesion,
}

export default API