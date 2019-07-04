import React, { useState, useEffect } from 'react';
import { navigate } from 'hookrouter';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const Perfil = (props) => {

    const [informacionUsuario, setinformacionUsuario] = useState({});

    useEffect(() => {
        let obtenerInformacionUsuarioActivo = async() => {
          const informacionUsuarioActivo = await ServicioUsuarios.obtenerUsuarioById(props.usuarioActivo);

          setinformacionUsuario(informacionUsuarioActivo);
        }
        obtenerInformacionUsuarioActivo();
      }, [props.usuarioActivo]);

    let fechaNacimientoUsuarioActivo = () => {
        let mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaConFormato =  new Date(informacionUsuario.fechaNacimiento).getDate() + 1 + ' ' + mesesDelAnio[new Date(informacionUsuario.fechaNacimiento).getMonth()] + ' ' + new Date(informacionUsuario.fechaNacimiento).getFullYear();

            return fechaConFormato
    }

    let redirigirEditarUsuario = () => {
        navigate('/aplicacionInterna/editarUsuario');
    }
    let redirigirDesactivarUsuario = (e) => {
        e.preventDefault();
        // navigate('/)
    }

    let redirigirCambiarContrasena = () => {
        navigate(`/aplicacionInterna/cambiarContrasena`);
    }

    return (
        <>
            <Header />

            <main className="container p-6">

                <div className="row p-5">
                    <div className="col-md-12">
                        <h1 className="text-center text-brown">Bienvenido a <span className="font-weight-bold font-italic">pinto sobre ruedas</span> </h1>
                    </div>
                </div>

                <div className="row border border-yellow rounded p-4">
                    
                    <div className="col-md-12 border-bottom border-yellow p-4">

                        <div className="row">

                            <h2 className="col-md-6 justify-content-start text-brown">Informacion personal</h2>
                            
                            <nav className="col-md-6 justify-content-end nav nav-pills ">
                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Editar perfil" data-placement="top" onClick={redirigirEditarUsuario}>
                                    <span className="fas fa-user-edit"></span>
                                </a>
                                
                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Desactivar usuario" data-placement="top" onClick={redirigirDesactivarUsuario}>
                                    <span className="fas fa-user-slash"></span>
                                </a>

                                <a href="#" className="nav-link btn-brown text-yellow mx-1" data-toggle="tooltip" title="Cambiar contraseña" data-placement="top" onClick={redirigirCambiarContrasena}>
                                    <span className="fas fa-key"></span>
                                </a>
                            </nav>

                        </div>
                
                    </div>

                    <div className="col-md-12 mt-4">
                        <p className="text-brown font-weight-bold">Primer nombre: <span className="font-weight-normal">{informacionUsuario.primerNombre}</span></p>

                        <p className="text-brown font-weight-bold">Primer apellido: <span className="font-weight-normal">{informacionUsuario.primerApellido}</span></p>
                    
                        <p className="text-brown font-weight-bold">Correo electronico <span className="font-weight-normal">{informacionUsuario.correoElectronico}</span></p>

                        <p className="text-brown font-weight-bold">Fecha de nacimiento: <span className="font-weight-normal">{fechaNacimientoUsuarioActivo()}</span></p>

                        <p className="text-brown font-weight-bold">Modalidad: <span className="font-weight-normal text-capitalize">{informacionUsuario.modalidad}</span></p>
                    </div>
                        
                </div>

            </main>

            <Footer />
        </>
    )
}

export default Perfil;