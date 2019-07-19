import React from 'react';
import Swal from 'sweetalert';
import { navigate } from 'hookrouter';

import Header from 'components/Header/Header';
import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import useUsuario from 'components/Usuarios/useUsuario';
import reglasValidacion from 'components/Usuarios/RegistroUsuarios/RegistroUsuariosRules';
import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const RegistroUsuarios = (props) => {

    const {valores, errores, admEnvio, admCambio} = useUsuario(enviarRegistro, reglasValidacion);

    async function enviarRegistro(){

        let rolNuevoUsuario;

        switch(props.usuarioActivo.rol) {
            case 0:
                rolNuevoUsuario = 2;
            break;

            default:
                rolNuevoUsuario = 1;
            break;
        }
        
        const nuevoUsuario = {
            primerNombre: valores.primerNombre,
            primerApellido: valores.primerApellido,
            correoElectronico: valores.correoElectronico,
            fechaNacimiento: valores.fechaNacimiento,
            contrasena: valores.contrasena,
            contrasenaTemp: false,
            modalidad: valores.modalidad,
            rol: rolNuevoUsuario,
            desactivado: 0,
            motivoDesact: '',
        }

        let response = await ServicioUsuarios.registrarUsuario(nuevoUsuario);

        if(response){
            Swal({
                title: "El usuario se ha registrado.",
                text: "El usuario se ha registrado exitosamente en nuestro sistema.",
                icon: "success",
                });
        }else{
            Swal({
                title: "El usuario no se ha podido registar.",
                text: "El usuario ya esta registrado en el sistema, intenta iniciar sesión.",
                icon: "error",
            });
        }
    }

    return (
        <> 
            {props.usuarioActivo === undefined ? 
                (<Header /> ) 
                    :
                (<NavegacionInterna usuarioActivo={props.usuarioActivo} />)
            }

            <main className="container p-6">

                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Registre su información</h2>
                </div>

                <form className="row" onSubmit={admEnvio} noValidate>

                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Primer nombre:</label>
                            <input type="text" className={`form-control ${errores.primerNombre && 'border border-danger'}`} name="primerNombre" onChange={admCambio} value={valores.primerNombre || ""} />

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
                            <input type="email" autoComplete="email" className={`form-control ${errores.correoElectronico && 'border border-danger'}`} name="correoElectronico" onChange={admCambio} value={valores.correoElectronico || ""} />

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
                            <label>Contraseña:</label>
                            <input type="password" autoComplete="new-password" className={`form-control ${errores.contrasena && 'border border-danger'}`} name="contrasena" onChange={admCambio} value={valores.contrasena || ""} />

                            {errores.contrasena && (
                                <small className="text-danger">{errores.contrasena}</small>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <label>Confirme su contraseña:</label>
                            <input type="password" autoComplete="confirm-password" className={`form-control ${errores.confirmacionContrasena && 'border border-danger'}`} name="confirmacionContrasena" onChange={admCambio} value={valores.confirmacionContrasena || ""} />

                            {errores.confirmacionContrasena && (
                                <small className="text-danger">{errores.confirmacionContrasena}</small>
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
                    
                        <input type="submit" value="Registrar" className="col-md-12 my-5 btn btn-brown" />
                    </div>

                </form>
            </main>

            <Footer />

        </>
    )
}

export default RegistroUsuarios;