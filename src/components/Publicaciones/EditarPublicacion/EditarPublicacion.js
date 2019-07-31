import React, {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {navigate} from 'hookrouter';

import Swal from 'sweetalert';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';
import VerificacionesUsuario from 'components/Usuarios/VerificacionesUsuario/VerificacionesUsuario';

import useEditarUsuario from 'components/Publicaciones/EditarPublicacion/useEditarPublicacion';
import reglasValidacion from 'components/Publicaciones/EditarPublicacion/EditarPublicacionRules'

import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';
import ServicioNotificaciones from 'components/Notificaciones/ServicioNotificaciones';

const EditarPublicacion = (props) => {
    const idPublicacion = props.idPublicacion,
        infoUsuarioActivo = props.usuarioActivo;

    if(!idPublicacion){
        navigate('/aplicacionInterna/listarPublicaciones');
    }

    let [publicacionActual, setPublicacionActual] = useState({}),
        [nuevasImagenes, setNuevasImagenes] = useState([]),
        [eliminarImagenes, setEliminarImagenes] = useState([]);

    useEffect( () => {
        let obtInfoPublicacionActual = async() => {
            let infoPublicacionActual = await ServicioPublicaciones.obtenerPublicacionId(idPublicacion);

            setPublicacionActual(infoPublicacionActual);
        }
        obtInfoPublicacionActual();
    }, [props.usuarioActivo]);

    const {valores, errores, admEnvio, admCambio} = useEditarUsuario(enviarEditarPublicacion, reglasValidacion, publicacionActual);

    const onDrop = useCallback(imagenesPublicacion => {
        setNuevasImagenes(imagenesPublicacion);
    }, []);
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
    });

    const eliminarImagen = (e) => {
        let imagen = e.target.name;

        for(let [key, value] of Object.entries(publicacionActual)){
            if(imagen === value){
                eliminarImagenes.push(value);
                value = '';
            }
            publicacionActual = {...publicacionActual, [key]: value};
        }
        setEliminarImagenes(eliminarImagenes);
        setPublicacionActual(publicacionActual);
    }

    async function enviarEditarPublicacion(){
        let contadorImg = 0,
            mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        fechaConFormato =  `${new Date().getDate()}/${mesesDelAnio[new Date().getMonth()]}/${new Date().getFullYear()} a las ${new Date().getHours()}:${new Date().getMinutes()}`,
            nuevaNotificacion = {
            usuario: infoUsuarioActivo.correoElectronico,
            primerNombre: infoUsuarioActivo.primerNombre,
            primerApellido: infoUsuarioActivo.primerApellido,
            idPublicacion: valores.id,
            tituloPublicacion: valores.titulo,
            tipo: 'publicacion',
        };

        valores.imagen1 = publicacionActual.imagen1 || '';
        valores.imagen2 = publicacionActual.imagen2 || '';
        valores.imagen3 = publicacionActual.imagen3 || '';
        valores.imagen4 = publicacionActual.imagen4 || '';
        valores.fecha = fechaConFormato;
        valores.rol = publicacionActual.rol;
        valores.desactivado = 0;
        valores.motivoDesact = '';

        for(let [key, value] of Object.entries(valores)){
            if(key.substring(0, 3) === 'ima' && value != ''){
                contadorImg++
            }
        }
        contadorImg+=nuevasImagenes.length;

        if(contadorImg > 4 || contadorImg === 0){
            Swal({
                title: 'No se puede completar la actualización',
                text: 'Verifique que hayan imágenes y no hayan mas de cuatro archivos',
                icon: 'error',
            })
        }else{
            if(infoUsuarioActivo.correoElectronico !== publicacionActual.usuario){
                navigate('/aplicacionInterna/listarPublicaciones');
            }else{
                await ServicioPublicaciones.editarPublicacion(valores, eliminarImagenes, nuevasImagenes)
                .then( async(res) => {
                    await 
                    Swal({
                        title: 'Cambios guardados',
                        text: 'Sus datos se han actualizado',
                        icon: 'success',
                    })
                    .then ( async() => {
                        await ServicioNotificaciones.registrarNotificacion(nuevaNotificacion);
                        navigate('/aplicacionInterna/listarPublicaciones');
                    })
                })
            }
        }
    }

    return(
        <>
            <VerificacionesUsuario usuarioActivo={props.usuarioActivo} />
            
            <NavegacionInterna usuarioActivo={props.usuarioActivo} />

            <main className="container p-6">
                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Edite la información de <span className="font-italic">"{publicacionActual.titulo}"</span></h2>
                </div>

                <form className="row" onSubmit={admEnvio} noValidate>
                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Título</label>

                            <input type="text" className={`form-control ${errores.titulo && 'border border-danger'}`} name="titulo" onChange={admCambio} value={valores.titulo || ""} />

                            {errores.titulo && (
                                <small className="text-danger">{errores.titulo}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Descripción</label>

                            <textarea className={`form-control ${errores.descripcion && 'border border-danger'}`} name="descripcion" onChange={admCambio} value={valores.descripcion} rows="5"></textarea>
                            
                            {errores.descripcion && (
                                    <small className="text-danger">{errores.descripcion}</small>
                            )}
                        </div>

                        <div className="col-md-12 text-center p-2">
                            <div className="row">
                                <label className="col-md-12">Imágenes actuales</label>
                            </div>

                            <div className="col-md-12">
                                <div className="row">
                                    {publicacionActual.imagen1 && (
                                        <div className="col-md-6 align-baseline py-2 mx-auto">
                                            <img src={publicacionActual.imagen1} className="col-md-12 pb-2"/>
                                            <input type="button" value="Eliminar" className="btn btn-danger" name={publicacionActual.imagen1} onClick={eliminarImagen}/>
                                        </div>
                                    )}

                                    {publicacionActual.imagen2 && (
                                        <div className="col-md-6 align-baseline py-2 mx-auto">
                                            <img src={publicacionActual.imagen2} className="col-md-12 pb-2"/>
                                            <input type="button" value="Eliminar" className="btn btn-danger" name={publicacionActual.imagen2} onClick={eliminarImagen} />
                                        </div>
                                    )}

                                    {publicacionActual.imagen3 && (
                                        <div className="col-md-6 align-baseline py-2 mx-auto">
                                            <img src={publicacionActual.imagen3} className="col-md-12 pb-2"/>
                                            <input type="button" value="Eliminar" className="btn btn-danger" name={publicacionActual.imagen3} onClick={eliminarImagen} />
                                        </div>
                                    )}

                                    {publicacionActual.imagen4 && (
                                        <div className="col-md-6 align-baseline py-2 mx-auto">
                                            <img src={publicacionActual.imagen4} className="col-md-12 pb-2"/>
                                            <input type="button" value="Eliminar" className="btn btn-danger" name={publicacionActual.imagen4} onClick={eliminarImagen} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 text-center p-2">
                            <div className="row" {...getRootProps()}>
                                <input id="inputImagenes" className="d-none" {...getInputProps()} multiple />
        
                                <label htmlFor="inputImagenes" className="pointer border border-brown rounded col-md-12 p-0 m-0 text-center">
                                    { nuevasImagenes == '' ?  (
                                        <p className="p-5 text-brown">Ó agregue más imágenes del ride</p>
                                    ) : (
                                        <ul className="list-group-flush p-0 m-0 ">
                                            {nuevasImagenes.map( (imagen) => (
                                                <li className="list-group-item text-brown" key={imagen.lastModified}> 
                                                    {imagen.name} 
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </label>
                            </div>
                        </div>
                        
                        <input type="submit" value="Editar" className="col-md-12 my-5 btn btn-brown" />

                    </div>
                </form>
            </main>

            <Footer />
        </>
    )
}

export default EditarPublicacion