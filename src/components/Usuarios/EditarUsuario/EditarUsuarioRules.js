const validar = (usuario) => {
    let errores = {},
        requerido = 'Realice los cambios antes de continuar.',
        edadUsuario = new Date() - new Date(usuario.fechaNacimiento);

    if(!usuario.primerNombre){errores.primerNombre = requerido}
    if(!usuario.primerApellido){errores.primerApellido = requerido}
    if(!usuario.fechaNacimiento){errores.fechaNacimiento = requerido}
    if(usuario.modalidad === 0){errores.modalidad = requerido}

    if(!usuario.correoElectronico){
        errores.correoElectronico = requerido
    }else{
        if(!/\S+@\S+\.\S+/.test(usuario.correoElectronico)){
            errores.correoElectronico = 'El correo electrónico ingresado no tiene formato válido.'
        }
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