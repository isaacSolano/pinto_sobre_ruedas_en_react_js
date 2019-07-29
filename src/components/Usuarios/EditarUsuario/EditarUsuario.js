import React from 'react';
import {navigate} from 'hookrouter';
import Swal from 'sweetalert';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import useEditarUsuario from 'components/Usuarios/EditarUsuario/useEditarUsuario';
import reglasValidacion from 'components/Usuarios/EditarUsuario/EditarUsuarioRules';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';
import ServicioNotificaciones from 'components/Notificaciones/ServicioNotificaciones'

const EditarUsuario = (props) => {

    const infoUsuarioActivo = props.usuarioActivo;

    const {valores, errores, admEnvio, admCambio} = useEditarUsuario(enviarEditarUsuario, reglasValidacion, infoUsuarioActivo);

    async function enviarEditarUsuario(){
        valores.desactivado = 0;
        valores.motivoDesact = "";

        let nuevaNotificacion = {
            usuario: valores.correoElectronico,
            primerNombre: valores.primerNombre,
            primerApellido: valores.primerApellido,
            tipo: 'usuario',
        }

        let response = await ServicioUsuarios.actualizarUsuario(valores);
    
        if(response){
            Swal({
                title: 'Se guardaron los cambios.',
                text: 'Su información se ha actualizado.',
                icon: 'success',
            })
            .then( async() => {
                await ServicioNotificaciones.registrarNotificacion(nuevaNotificacion)
                navigate('/aplicacionInterna');
            })

        }else{
            Swal({
                title: 'No se guardaron los cambios.',
                text: 'Tuvimos un problema actualizando su información. Intente más tarde.',
                icon: 'error',
            });
        }
    }

    return (
        <>
            <NavegacionInterna usuarioActivo={infoUsuarioActivo} />

            <main className="container p-6">

                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Edite su información</h2>
                </div>

                <form className="row" onSubmit={admEnvio} noValidate>

                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Primer nombre:</label>
                            <input type="text" className={`form-control ${errores.primerNombre && 'border border-danger'}`} name="primerNombre" onChange={admCambio} value={valores.primerNombre || "" } />

                            {errores.primerNombre && (
                                <small className="text-danger">{errores.primerNombre}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Primer apellido:</label>
                            <input type="text" className={`form-control ${errores.primerApellido && 'border border-danger'}`} name="primerApellido" onChange={admCambio} value={valores.primerApellido || ""} />

                            {errores.primerApellido && (
                                <small className="text-danger">{errores.primerApellido}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Correo electrónico:</label>
                            <input type="email" autoComplete="email" className={`form-control ${errores.correoElectronico && 'border border-danger'}`} name="correoElectronico" onChange={admCambio} value={valores.correoElectronico || ""} disabled />

                            {errores.correoElectronico && (
                                <small className="text-danger">{errores.correoElectronico}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Fecha de nacimiento:</label>
                            <input type="date" className={`form-control ${errores.fechaNacimiento && 'border border-danger'}`} name="fechaNacimiento" onChange={admCambio} value={valores.fechaNacimiento || ""} />

                            {errores.fechaNacimiento && (
                                <small className="text-danger">{errores.fechaNacimiento}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Modalidad de deporte</label>

                            <select className={`form-control ${errores.modalidad && 'border border-danger'}`} name="modalidad" onChange={admCambio} value={valores.modalidad || ""} >
                                <option value="0">Seleccione</option>
                                <option value="bmx">BMX</option>
                                <option value="ruta">Ruta</option>
                                <option value="mtb">MTB</option>
                                <option value="otro">Otro</option>
                            </select>

                            {errores.modalidad && (
                                <small className="text-danger">{errores.modalidad}</small>
                            )}
                        </div>
                    
                        <input type="submit" value="Editar" className="col-md-12 my-5 btn btn-brown" />
                    </div>

                </form>
            </main>


            <Footer />
        </>
    )
}

export default EditarUsuario