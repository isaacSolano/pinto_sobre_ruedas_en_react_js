const validar = (nuevaContrasenaData) => {
    let errores = {};

    if(!nuevaContrasenaData.nuevaContrasena){
        errores.nuevaContrasena = 'Este campo es requerido';
    }

    if(!nuevaContrasenaData.confContrasena){
        errores.confContrasena = 'Este campo es requerido';
    }

    if(nuevaContrasenaData.nuevaContrasena !== nuevaContrasenaData.confContrasena){
        errores.nuevaContrasena = 'Las contraseñas deben coincidir'
        errores.confContrasena = 'Las contraseñas deben coincidir'
    }

    return errores
}

export default validar
