import React from 'react';
import Swal from 'sweetalert'

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import useLogin from 'components/InicioSesion/useLogin';
import reglasValidacion from 'components/InicioSesion/InicioSesionRules';
import ServicioInicioSesion from 'components/InicioSesion/ServicioInicioSesion';

const InicioSesion = () => {

    const {inicioSesionData, errores, admInicioSesion, admCambio} = useLogin(iniciarSesion, reglasValidacion);

    async function iniciarSesion(){
        let response = await ServicioInicioSesion.verificarUsuarioLogin(inicioSesionData);

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
                });

                ServicioInicioSesion.crearSesion(inicioSesionData.correoElectronico);
            }
        }
    }

    return(
        <>
            <Header />

            <main className="container p-6">

                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Iniciar Sesión</h2>
                </div>

                <form className="row" onSubmit={admInicioSesion} noValidate>

                    <div className="col-md-6 mx-auto">

                        <div className="form-group col-md-12">
                            <label>Correo electrónico:</label>

                            <input type="email" autoComplete="email" className={`form-control ${errores.correoElectronico && "border border-danger"}`} name="correoElectronico" onChange={admCambio} value={inicioSesionData.correoElectronico || ""} />

                            {errores.correoElectronico && (
                                <small className="text-danger">{errores.correoElectronico}</small>
                            )}

                        </div>

                        <div className="form-group col-md-12">
                            <label>Contraseña:</label>
                            
                            <input type="password" autoComplete="password" className={`form-control ${errores.contrasena && "border border-danger"}`} name="contrasena" onChange={admCambio} value={inicioSesionData.contrasena || ""} />

                            {errores.contrasena && (
                                <small className="text-danger">{errores.contrasena}</small>
                            )}
                        </div>

                        <input type="submit" value="Iniciar Sesión" className="col-md-12 my-5 btn btn-brown" />

                    </div>
                </form>
            </main>

            <Footer />
        </>
    )
}

export default InicioSesion;