const validar = (publicacion) => {
    let errores = {},
        requerido = 'Este campo es requerido';

    if(!publicacion.titulo){errores.titulo = requerido}
    if(!publicacion.descripcion){errores.descripcion = requerido}

    return errores;
}

export default validar