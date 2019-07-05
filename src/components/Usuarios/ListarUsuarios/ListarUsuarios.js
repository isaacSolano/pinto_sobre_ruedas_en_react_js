import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const ListarUsuarios = (props) => {

    if(props.rolUsuario === 1){
        navigate('/aplicacionInterna');
    }

    const [listaUsuarios, setListaUsuarios] = useState([]);

    useEffect( () => {
        let obtenerTodosLosUsuarios = async() => {
            let todosLosUsuarios = await ServicioUsuarios.obtenerTodosLosUsuarios();

            setListaUsuarios(todosLosUsuarios);
        }

        obtenerTodosLosUsuarios();
    }, [props.usuarioActivo]);

    return (
        <>
            <Header />
            
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

                                    usuario.correoElectronico === props.usuarioActivo || usuario.rol === 0 ? (
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
                                                    {props.rolUsuario === 0 ? (
                                                        
                                                        usuario.rol === 1 ? (
                                                            <div>
                                                                <input type="button" value="Convertir a colaborador" className="btn btn-brown text-yellow mx-2" />

                                                                {usuario.desactivado ? (
                                                                    <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                                ) : (
                                                                    <input type="button" value="Desactivar" className="btn btn-danger mx-2" />
                                                                )}

                                                            </div>
                                                        ) : (
                                                        usuario.rol === 2 ? (
                                                            <div>
                                                                <input type="button" value="Convertir a cliente" className="btn btn-brown text-yellow mx-2" />

                                                                {usuario.desactivado ? (
                                                                    <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                                ) : (
                                                                    <input type="button" value="Desactivar" className="btn btn-danger mx-2" />
                                                                )}

                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                            )
                                                        )
                                                        
                                                    ) : (
                                                        props.rolUsuario === 2 ? (

                                                            usuario.desactivado ? (
                                                                <input type="button" value="El usuario ya está desactivado" className="btn btn-danger mx-2" disabled />
                                                            ) : (
                                                                <input type="button" value="Desactivar" className="btn btn-danger mx-2" />
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