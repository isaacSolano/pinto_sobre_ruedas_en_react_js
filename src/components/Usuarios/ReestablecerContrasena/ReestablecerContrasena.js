import React from 'react';
import Swal from 'sweetalert';
import { navigate } from 'hookrouter';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import useUsuario from 'components/Usuarios/useUsuario';
import reglasValidacion from 'components/Usuarios/ReestablecerContrasena/ReestablecerContrasenaRules';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';


const ReestablecerContrasena = () => {

    const {valores, errores, admEnvio, admCambio} = useUsuario(reestablecerContrasena, reglasValidacion);

    async function reestablecerContrasena(){
        valores.nuevaContrasena = Math.random().toString(36).substring(2);
        valores.temporal = true;

        let contrasenaCambiada = await ServicioUsuarios.cambiarContrasena(valores);

        if(contrasenaCambiada){
            Swal({
                title: 'Revise su correo electronicónico.',
                text: 'Se le ha enviado una contrasena temporal.',
                icon: 'success',
            })
            .then( async() => {
                await ServicioUsuarios.enviarCorreoElectronico(valores);
                navigate('/inicioSesion');
            })


        }else{
            Swal({
                title: 'El usuario no está registrado.',
                text: 'Verifique que el usuario ya se haya registrado.',
                icon: 'error',
            });
        }

    }

    return(
        <>
           <Header />

            <main className="container p-6">
                <div className="row p-5">
                    <h2 className="text-center text-brown col-md-12">Ingrese su correo electrónico y le enviaremos ayuda.</h2>
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

                            
                            <input type="submit" value="Enviar asistencia" className="col-md-12 my-5 btn btn-brown" />
                        </div>
                    </form>
            </main>

           <Footer />
        </>
    )
}

export default ReestablecerContrasena