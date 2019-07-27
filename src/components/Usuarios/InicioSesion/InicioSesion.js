import React from 'react';
import Swal from 'sweetalert';
import { navigate } from 'hookrouter';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import useUsuario from 'components/Usuarios/useUsuario';
import reglasValidacion from 'components/Usuarios/InicioSesion/InicioSesionRules';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const InicioSesion = () => {

    const {valores, errores, admEnvio, admCambio} = useUsuario(iniciarSesion, reglasValidacion);

    async function iniciarSesion(){
        let response = await ServicioUsuarios.crearSesion(valores);

        if(!response.usuarioValido){
            Swal({
                title: 'El usuario no está registrado.',
                text: 'Verifique que el usuario ya se haya registrado.',
                icon: 'error',
            });
        }else{
            if(!response.contrasenaValida){
                Swal({
                    title: 'La contraseña es incorrecta.',
                    text: 'Verifique la contraseña digitada.',
                    icon: 'error',
                });
            }else{
                Swal({
                    title: 'Credenciales verificadas.',
                    text: '¡Bienvenido a Pinto Sobre Ruedas!',
                    icon: 'success',
                })
                .then( () => {
                    navigate(`/aplicacionInterna`);
                })

            }
        }
    }

    function reestablecerContrasena() {
        navigate('/reestablecerContrasena');
    }

    return(
        <>
            <Header />

            <main className="container p-6">

                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Iniciar Sesión</h2>
                </div>

                <form className="row" onSubmit={admEnvio} noValidate>

                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Correo electrónico:</label>

                            <input type="email" autoComplete="email" className={`form-control ${errores.correoElectronico && "border border-danger"}`} name="correoElectronico" onChange={admCambio} value={valores.correoElectronico || ""} />

                            {errores.correoElectronico && (
                                <small className="text-danger">{errores.correoElectronico}</small>
                            )}

                        </div>

                        <div className="form-group col-md-12">
                            <label>Contraseña:</label>
                            
                            <input type="password" autoComplete="password" className={`form-control ${errores.contrasena && "border border-danger"}`} name="contrasena" onChange={admCambio} value={valores.contrasena || ""} />

                            {errores.contrasena && (
                                <small className="text-danger">{errores.contrasena}</small>
                            )}
                        </div>

                        <input type="submit" value="Iniciar Sesión" className="col-md-12 my-5 btn btn-brown" />

                    </div>
                </form>

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <a href="#" onClick={reestablecerContrasena}>¿Olvidó su contraseña?</a>
                    </div>

                </div>

            </main>
            <Footer />
        </>
    )
}

export default InicioSesion;