import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {navigate} from 'hookrouter';

import Swal from 'sweetalert';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';
import VerificacionesUsuario from 'components/Usuarios/VerificacionesUsuario/VerificacionesUsuario';

import usePublicacion from 'components/Publicaciones/usePublicacion';
import reglasValidacion from 'components/Publicaciones/RegistrarPublicacion/RegistrarPublicacionRules';

import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';
import ServicioNotificaciones from 'components/Notificaciones/ServicioNotificaciones';

const RegistrarPublicacion = (props) => {

    const {valores, errores, admEnvio, admCambio} = usePublicacion(enviarRegistrarPublicacion, reglasValidacion);

    const [archivos, setArchivos] = useState();

    const onDrop = useCallback(imagenesPublicacion => {
        setArchivos(imagenesPublicacion);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
    });

    async function enviarRegistrarPublicacion(){
        let mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        fechaConFormato =  `${new Date().getDate()}/${mesesDelAnio[new Date().getMonth()]}/${new Date().getFullYear()} a las ${new Date().getHours()}:${new Date().getMinutes()}`;
        
        valores.usuario = props.usuarioActivo.correoElectronico;
        valores.fecha = fechaConFormato;
        valores.desactivado = 0;
        valores.motivoDesact = '';
        valores.id = Date.now();
        valores.rol = props.usuarioActivo.rol;

        let nuevaNotificacion = {
            usuario: props.usuarioActivo.correoElectronico,
            primerNombre: props.usuarioActivo.primerNombre,
            primerApellido: props.usuarioActivo.primerApellido,
            idPublicacion: valores.id,
            tituloPublicacion: valores.titulo,
            tipo: 'publicacion',
        };

        
        if(archivos && archivos.length < 5){
            await ServicioPublicaciones.registrarPublicacion(archivos, valores)
            .then( async(res) => {
                await 
                Swal({
                    title: 'Publicación registrada',
                    text: 'Sus datos se han registrado',
                    icon: 'success',
                }).then ( async() => {
                    await ServicioNotificaciones.registrarNotificacion(nuevaNotificacion);
                    navigate('/aplicacionInterna');
                })
            })
        }else{
            Swal({
                title: 'No se puede completar el registro',
                text: 'Verifique que adjunte imágenes y no hayan más de 4 archivos',
                icon: 'error',
            })
        }
    }
    return (
        <>
            <VerificacionesUsuario usuarioActivo={props.usuarioActivo} />
            <NavegacionInterna usuarioActivo={props.usuarioActivo} />

            <main className="container p-6">

                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Registre una nueva publicación</h2>
                </div>

                <form className="row" onSubmit={admEnvio} encType="multipart/form-data" >
                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Título</label>
                            <input type="text" name="titulo" className={`form-control ${errores.titulo && 'border border-danger'}`}  onChange={admCambio} value={valores.titulo || ""}/>

                            {errores.titulo && (
                                <small className="text-danger">{errores.titulo}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Descripción</label>
                            <textarea name="descripcion" className={`form-control ${errores.descripcion && 'border border-danger'}`} onChange={admCambio} value={valores.descripcion || ""} rows="5 "></textarea>
                        
                            {errores.descripcion && (
                                <small className="text-danger">{errores.titulo}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">

                            <div className="mt-5" {...getRootProps()}>
                                <input id="inputImagenes" className="d-none" {...getInputProps()} multiple />
    
                                <label htmlFor="inputImagenes" className="pointer border border-brown rounded col-md-12 p-0 m-0 text-center">
                                    { !archivos ? (
                                        <p className="p-5 text-brown"> Agregue imagenes del ride</p>
                                    ) : (
                                        <ul className="list-group-flush p-0 m-0 ">
                                            {archivos.map( (imagen) => (
                                                <li className="list-group-item text-brown" key={imagen.lastModified}> 
                                                    {imagen.name} 
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </label>
                            </div>
                        </div>


                        <input type="submit" value="Registrar" className="col-md-12 my-5 btn btn-brown" />

                    </div>

                </form>

            </main>

            <Footer />
        </>
    )
}

export default RegistrarPublicacion