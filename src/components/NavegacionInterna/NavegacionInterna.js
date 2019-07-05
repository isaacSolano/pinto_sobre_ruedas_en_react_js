import React, {useState, useEffect} from 'react';
import {navigate} from 'hookrouter';


import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const NavegacionInterna = (props) => {

    const [rolUsuarioActivo, setRolUsurioActivo] = useState();

    useEffect( () => {
        const obtenerRolUsuarioActivo = async() => {
            let infoUsuario = await ServicioUsuarios.obtenerUsuarioById(props.usuarioActivo);

            setRolUsurioActivo(infoUsuario.rol);
        }

        obtenerRolUsuarioActivo();
    }, [props.usuarioActivo]);

    let redirigirRegistroColaborador = () => {
        navigate('/aplicacionInterna/registroColaboradores');
    }

    return (
        <>
        <main>
            <div className="row border border-yellow rounded p-4 mt-4">
                <div className="col-md-12 border-bottom border-yellow p-4">
                    <h2 className="col-md-12 text-brown">Más opciones</h2>
                </div>

                <div className="col-md-12 p-4">
                    {rolUsuarioActivo === 0 ? (
                        <input type="button" value="Registrar colaborador" className="btn btn-brown text-yellow" onClick={redirigirRegistroColaborador} />
                    ) : (
                        rolUsuarioActivo === 1 ? (
                            <p>Cliente</p>   
                        ) : (
                            rolUsuarioActivo === 2 ? (
                                <p>Colaborador</p>
                            ) : (
                                <p>nada</p>
                            )
                        )
                    )}
                </div>
            </div>
        </main>
        </>
    );
};

export default NavegacionInterna