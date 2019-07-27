import React from 'react';
import { navigate } from 'hookrouter';

import Header from 'components/Header/Header';
import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';


const NotFound = (props) => {

    const redirigirInicio = () => {
        navigate('/');
    };

    return (
        <>
            {props.usuarioActivo === undefined ? 
                (<Header /> ) 
                    :
                (<NavegacionInterna usuarioActivo={props.usuarioActivo} />)
            }
            
            <main className="container">

                <div className="row p-6 text-center">

                    <h1 className=" col-md-12 text-brown p-4">¡Error <span className="text-yellow">404</span>!</h1>

                    <h2 className=" col-md-12 text-brown p-4">No se encontró la página solicitada</h2>
            
                    <h3 className="text-brown col-md-12 p-4"><span className="fas fa-user-injured icon"></span></h3>

                    <button onClick={redirigirInicio} className="btn btn-brown mx-auto my-4"> Volver a la página de inicio</button>
                </div>
                
            </main>

            <Footer />
        </>
    );
};

export default NotFound