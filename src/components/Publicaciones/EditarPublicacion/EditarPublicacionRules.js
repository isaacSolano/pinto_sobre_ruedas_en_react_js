const validar = (publicacion) => {
    let errores = {},
        requerido = 'Realice los cambios antes de continuar.';

    if(!publicacion.titulo){errores.titulo = requerido}
    if(!publicacion.descripcion){errores.descripcion = requerido}


    return errores;
}

export default validar