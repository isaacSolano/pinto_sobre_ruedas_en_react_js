import React, {useState, useEffect} from 'react';

import Modal from 'react-bootstrap/Modal';

import Header from 'components/Header/Header';
import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';
import ServicioUsuarios from 'components/Usuarios/ServicioUsuarios';

const ListarPublicacionesAdmin = () => {

    let [publicacionesAdmin, setPublicacionesAdmin] = useState([]),
        [infoUsuarioActivo, setInfoUsuarioActivo] = useState({}),
        [mostrarImagen1, setMostrarImagen1] = useState(false),
        [mostrarImagen2, setMostrarImagen2] = useState(false),
        [mostrarImagen3, setMostrarImagen3] = useState(false),
        [mostrarImagen4, setMostrarImagen4] = useState(false);

    useEffect( () => {
        let obtenerPublicacionesAdmin = async() => {
            let rol = ['0', '2'];
            let publicacionesAdmin = await ServicioPublicaciones.obtenerPublicacionesRol(rol);
            
            setPublicacionesAdmin(publicacionesAdmin);
        }

        let usuarioActivo = async() => {
            let usuarioActivo = ServicioUsuarios.obtenerUsuarioActivo();

            if(usuarioActivo){
                let infoUsuarioActivo = await ServicioUsuarios.obtenerUsuarioById(usuarioActivo);

                setInfoUsuarioActivo(infoUsuarioActivo);
            }
        }

        obtenerPublicacionesAdmin();
        usuarioActivo();

    }, []);

    return(
        <>
            {Object.entries(infoUsuarioActivo).length === 0 ? (
                <Header />
            ) : (
                <NavegacionInterna usuarioActivo={infoUsuarioActivo} />
            )}

            <main className="container">

                <div className="row">
                    <h2 className="col-md-12 text-center text-brown p-5">Publicaciones de administración</h2>
                </div>

                {publicacionesAdmin.map(publicacion => (
                    <div className="col-md-12 border border-brown rounded p-4 m-5">

                        <div className="row border-bottom border-yellow p-5">
                            <h2 className="col-md-12 justify-content-start text-brown">{publicacion.titulo}</h2>
                        </div>

                        <p className="text-brown p-6 text-center">{publicacion.descripcion}</p>

                        <div className="text-center">
                            {publicacion.imagen1 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src=   {publicacion.imagen1} onClick={() => {setMostrarImagen1(true)}} />

                                    <Modal show={mostrarImagen1} onHide={() => {setMostrarImagen1(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {publicacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={publicacion.imagen1} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                            {publicacion.imagen2 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={publicacion.imagen2} onClick={() => {setMostrarImagen2(true)}}/>

                                    <Modal show={mostrarImagen2} onHide={() => {setMostrarImagen2(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {publicacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={publicacion.imagen2} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                            </> 
                            )}
                            {publicacion.imagen3 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={publicacion.imagen3} onClick={() => {setMostrarImagen3(true)}}/>

                                    <Modal show={mostrarImagen3} onHide={() => {setMostrarImagen3(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {publicacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={publicacion.imagen3} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                            {publicacion.imagen4 && (
                                <>
                                    <img className="col-md-3 m-auto pointer" src={publicacion.imagen4} onClick={() => {setMostrarImagen4(true)}}/>
                                    
                                    <Modal show={mostrarImagen4} onHide={() => {setMostrarImagen4(false)}} size="lg" aria-labelledby="modal-imagen">

                                        <Modal.Header className="text-brown" closeButton>
                                            <Modal.Title id="modal-imagen">
                                                {publicacion.titulo}
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body className="row">
                                            <img src={publicacion.imagen4} className="col-md-12 text-center" />
                                        </Modal.Body>
                                        
                                    </Modal>
                                </>
                            )}
                        </div>

                        <p className="text-brown p-2 mt-4">{publicacion.fecha}</p>
                        <p className="text-brown p-2 mt-4">{`Por: ${publicacion.usuario}`}</p>
                    </div>
                ))}
            </main>
            
            <Footer />
        </>
    )
}

export default ListarPublicacionesAdmin