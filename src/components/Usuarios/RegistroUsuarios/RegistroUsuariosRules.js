const validar = (usuario) => {
    let errores = {},
        requerido = 'Este campo es requerido.',
        edadUsuario = new Date() - new Date(usuario.fechaNacimiento);

    if(!usuario.primerNombre){errores.primerNombre = requerido}
    if(!usuario.primerApellido){errores.primerApellido = requerido}
    if(!usuario.fechaNacimiento){errores.fechaNacimiento = requerido}
    if(!usuario.contrasena){errores.contrasena = requerido}
    if(!usuario.confirmacionContrasena){errores.confirmacionContrasena = requerido}
    if(!usuario.modalidad){errores.modalidad = requerido}

    if(!usuario.correoElectronico){
        errores.correoElectronico = requerido
    }else{
        if(!/\S+@\S+\.\S+/.test(usuario.correoElectronico)){
            errores.correoElectronico = 'El correo electrónico ingresado no tiene formato válido.'
        }
    }

    if(usuario.contrasena !== usuario.confirmacionContrasena){
        errores.contrasena = 'Las contraseñas no coinciden.';
        errores.confirmacionContrasena = 'Las contraseñas no coinciden.';
    }

    if( edadUsuario/31536000000 <= 0){
        errores.fechaNacimiento = 'El año de nacimiento no ser mayor al año actual.';
    }else{
        if(edadUsuario/31536000000 < 18){
            errores.fechaNacimiento = 'El usuario debe ser mayor de dieciocho años para ingresar.';
        }
    }


    return errores;
}

export default validar