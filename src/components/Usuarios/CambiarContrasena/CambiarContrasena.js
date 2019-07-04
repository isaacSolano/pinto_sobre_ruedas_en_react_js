import React from 'react';
import Swal from 'sweetalert';
import {navigate} from 'hookrouter';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import useusuario from 'components/Usuarios/useUsuario';
import reglasValidacion from 'components/Usuarios/CambiarContrasena/CambiarContrasenaRules'

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const CambiarContrasena = (props) => {

    const {valores, errores, admEnvio, admCambio} = useusuario(cambiarContrasena, reglasValidacion);

    async function cambiarContrasena(){
        let cambios = {
            correoElectronico: props.usuarioActivo,
            nuevaContrasena: valores.nuevaContrasena,
            temporal: false
        },

        response = await ServicioUsuarios.cambiarContrasena(cambios);
    
        if(response){
            Swal({
                title: 'Datos actualizados.',
                text: 'Se ha actualizado su contraseña, inicie sesión',
                icon: 'success',
            });

            navigate('/aplicacionInterna');
        }else{
            Swal({
                title: 'Hubo un problema en el proceso.',
                text: 'No se pudo cambiar su contraseña.',
                icon: 'error',
            });
        }
    }
    return(
        <>
            <Header />
        
            <main className="container p-6">
                <div className="row p-5">
                    <h1 className="text-center text-brown col-md-12">Digite una nueva contraseña.</h1>
                </div>

                <form className="row" onSubmit={admEnvio} noValidate>

                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Nueva contraseña</label>

                            <input type="password" autoComplete="password" className={`form-control ${errores.nuevaContrasena && "border border-danger"}`} name="nuevaContrasena" onChange={admCambio} value={valores.nuevaContrasena || ""} />

                            {errores.nuevaContrasena && (
                                <small className="text-danger">{errores.nuevaContrasena}</small>
                            )}

                        </div>

                        <div className="form-group col-md-12">
                            <label>Confirmación contraseña</label>

                            <input type="password" autoComplete="password" className={`form-control ${errores.confContrasena && "border border-danger"}`} name="confContrasena" onChange={admCambio} value={valores.confContrasena || ""} />

                            {errores.nuevaContrasena && (
                                <small className="text-danger">{errores.nuevaContrasena}</small>
                            )}

                        </div>

                        <input type="submit" value="Cambiar contraseña" className="col-md-12 my-5 btn btn-brown" />                        
                    </div>
                </form>
            </main>

            <Footer />
        </>
    )
}

export default CambiarContrasena