const validar = (inicioSesionData) => {
    let errores = {},
        requerido = 'Este campo es requerido';

    if(!inicioSesionData.correoElectronico){
        errores.correoElectronico = requerido
    }else{
        if(!/\S+@\S+\.\S+/.test(inicioSesionData.correoElectronico) ){
            errores.correoElectronico = 'El correo electrónico ingresado no tiene formato válido.'
        } 
    }

    if(!inicioSesionData.contrasena){errores.contrasena = requerido}

    return errores
}

export default validar