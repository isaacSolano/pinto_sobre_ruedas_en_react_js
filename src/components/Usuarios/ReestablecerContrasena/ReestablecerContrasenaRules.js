const validar = (reestablecerContrasenaData) => {
    let errores = {};

    if(!reestablecerContrasenaData.correoElectronico){
        errores.correoElectronico = 'Este campo es requerido';
    }else{
        if(!/\S+@\S+\.\S+/.test(reestablecerContrasenaData.correoElectronico) ){
            errores.correoElectronico = 'El correo electrónico ingresado no tiene formato válido.'
        } 
    }

    return errores
}

export default validar