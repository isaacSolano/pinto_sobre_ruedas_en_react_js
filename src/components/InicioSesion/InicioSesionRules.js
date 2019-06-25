const validar = (inicioSesion) => {
    let errores = {},
        requerido = 'Este campo es requerido';

    if(!inicioSesion.correoElectronico){
        errores.correoElectronico = requerido
    }else{
        if(!/\S+@\S+\.\S+/.test(inicioSesion.correoElectronico) ){
            errores.correoElectronico = 'El correo electrónico ingresado no tiene formato válido.'
        } 
    }

    if(!inicioSesion.contrasena){errores.contrasena = requerido}

    return errores
}

export default validar