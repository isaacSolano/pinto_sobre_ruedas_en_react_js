import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna'
import Footer from 'components/Footer/Footer'

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';
import Swal from 'sweetalert';

const ListarUsuarios = (props) => {
    
    const [listaUsuarios, setListaUsuarios] = useState([]),
        infoUsuarioActivo = props.usuarioActivo;

    if(infoUsuarioActivo.rol === 1){
        navigate('/aplicacionInterna');
    }

    useEffect( () => {
        let obtenerTodosLosUsuarios = async() => {
            let todosLosUsuarios = await ServicioUsuarios.obtenerTodosLosUsuarios();

            setListaUsuarios(todosLosUsuarios);
        }

        obtenerTodosLosUsuarios();
    }, [props.usuarioActivo]);

    let desactivarUsuario = async(e) => {
        let id = e.target.name,
            desactData = {};

        Swal({
            title: '¿Desea desactivar este usuario?',
            text: 'Describa la razón de la desactivación',
            content: 'input',
            icon: 'warning',
            dangerMode: true,
            buttons: ["No", "Sí"],
        }).then ( async(confirmacion) => {
            if(confirmacion){

                desactData = {
                    desactivado: 2,
                    motivo: confirmacion
                }
                const response = await ServicioUsuarios.actDesactUsuario(id, desactData);
                if(response){
                    Swal({
                        title: 'El usuario se desactivó correctamente',
                        text: 'El motivo de la desactivación se envió correctamente',
                        icon: 'success',
                    })
                }else{
                    Swal({
                        title: 'Tuvimos un problema en el proceso',
                        text: 'El usuario no se desactivó, intente de nuevo.',
                        icon: 'error',
                    })
                }
                navigate('/aplicacionInterna');
            }
        });
    }

    let cambiarRol = async(e) => {
        let usuarioActual = JSON.parse(e.target.name),
        nuevoRol = false;

        switch (usuarioActual.rol){
            case 1:
                nuevoRol = 2;
            break;

            case 2:
                nuevoRol = 1;
            break;

            default:
                nuevoRol = 1;
        }

        usuarioActual.rol = nuevoRol;

        let response = await ServicioUsuarios.actualizarUsuario(usuarioActual);

        if(response){
            Swal({
                title: 'El cambio se guardó correctamente',
                text: 'Ahora el usuario tendra permisos distintos',
                icon: 'success',
            })
        }else{
            Swal({
                title: 'No se pudo completar su petición',
                text: 'Hubo un problema en el proceso, intente mas tarde',
                icon: 'error',
            });
        }
        navigate('/aplicacionInterna');
    }

    return (
        <>
            <NavegacionInterna usuarioActivo={infoUsuarioActivo} />
            
            <main className="container">

                <div className="row p-4">
                    <h2 className="col-md-12 text-brown p-4 text-center">Lista de usuarios</h2>
                </div>

                <div className="row">
                    <div className="col-md-12 p-4">

                        <table className="mx-auto table table-brown table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center text-brown">Nombre</th>
                                    <th className="text-center text-brown">Apellido</th>
                                    <th className="text-center text-brown">Correo electrónico</th>
                                    <th className="text-center text-brown">Rol</th>
                                    <th className="text-center text-brown">Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaUsuarios.map( (usuario) => (

                                    usuario.correoElectronico === props.usuarioActivo.correoElectronico || usuario.rol === 0 ? (
                                        <tr key={usuario.correoElectronico} ></tr>
                                    ) : (
                                            <tr key={usuario.correoElectronico}>
                                                <td className="text-center text-brown"> {usuario.primerNombre} </td>
                                                <td className="text-center text-brown"> {usuario.primerApellido} </td>
                                                <td className="text-center text-brown"> {usuario.correoElectronico} </td>
                                                <td className="text-center text-brown">
                                                    {usuario.rol === 1 ? (
                                                        <p>Cliente</p>
                                                    ) : (
                                                        usuario.rol === 2 ? (
                                                            <p>Colaborador</p>
                                                        ) : (
                                                            <p>Por definir</p>
                                                        )
                                                    )} 
                                                </td>

                                                <td className="text-center text-brown">
                                                    {infoUsuarioActivo.rol === 0 ? (
                                                        
                                                        usuario.rol === 1 ? (
                                                            <div>
                                                                <input type="button" value="Convertir a colaborador" name={JSON.stringify(usuario)} onClick={cambiarRol} className="btn btn-brown text-yellow mx-2" />

                                                                {usuario.desactivado === 1 || usuario.desactivado === 2 ? (
                                                                    <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                                ) : (
                                                                    <input type="button" value="Desactivar" className="btn btn-danger mx-2" name={usuario.correoElectronico} onClick={desactivarUsuario} />
                                                                )}

                                                            </div>
                                                        ) : (
                                                        usuario.rol === 2 ? (
                                                            <div>
                                                                <input type="button" value="Convertir a cliente" name={JSON.stringify(usuario)} onClick={cambiarRol} className="btn btn-brown text-yellow mx-2" />

                                                                {usuario.desactivado === 1 || usuario.desactivado === 2 ? (
                                                                    <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                                ) : (
                                                                    <input type="button" value="Desactivar" className="btn btn-danger mx-2" name={usuario.correoElectronico} onClick={desactivarUsuario} />
                                                                )}

                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                            )
                                                        )
                                                        
                                                    ) : (
                                                        infoUsuarioActivo.rol === 2 ? (

                                                            usuario.desactivado === 1 || usuario.desactivado === 2 ? (
                                                                <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                            ) : (
                                                                <input type="button" value="Desactivar" className="btn btn-danger mx-2" name={usuario.correoElectronico} onClick={desactivarUsuario} />
                                                            )
                                                        ) : (
                                                            <span className="font-weight-bold text-danger">No tienes accesos para tomar acciones sobre estos usuarios</span>
                                                        )
                                                    )}


                                                </td>
                                            </tr>
                                        )
                                    ))
                                }
                            </tbody>
                        </table>         
                    
                    </div>
                </div>
            </main>
            
            <Footer />
        </>
    ) 
}

export default ListarUsuarios