import React, {useState, useEffect} from 'react';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import NavegacionInterna from 'components/NavegacionInterna/NavegacionInterna';
import Footer from 'components/Footer/Footer';

import ServicioPublicaciones from 'components/Publicaciones/ServicioPublicaciones';
const ListarPublicaciones = (props) => {

    const [misPublicaciones, setMisPublicaciones] = useState([]);

    let [mostrar1, setMostrar1] = useState(false);
    let [mostrar2, setMostrar2] = useState(false);
    let [mostrar3, setMostrar3] = useState(false);
    let [mostrar4, setMostrar4] = useState(false);

    useEffect( () => {
        let obtenerMisPublicaciones = async() => {
            let publicacionesUsuarioActivo = await ServicioPublicaciones.obtenerPublicacionesUsuarioActivo(props.usuarioActivo.correoElectronico);

            setMisPublicaciones(publicacionesUsuarioActivo);
        }

        obtenerMisPublicaciones();
    }, [props.usuarioActivo]);

    let redirigirImagen = (e) => {
        console.log(e.target.src);
    }

    return (
        <>
            <NavegacionInterna usuarioActivo={props.usuarioActivo} />

            <main className="container">
                <div className="row">
                    <h2 className="col-md-12 text-center text-brown p-5">Lista de publicaciones</h2>
                </div>

                <div className="row">
                    {misPublicaciones.map( publicacion => (

                        <div className="col-md-12 border border-brown rounded p-4 m-4" key={publicacion._id}>

                            <div className="row border-bottom border-yellow p-5">

                                <h2 className="col-md-6 justify-content-start text-brown">{publicacion.titulo}</h2>
                                
                                <nav className="col-md-6 justify-content-end nav nav-pills ">
                                    
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Editar Publicación</Tooltip>}>
                                        <a href="#" className="nav-link btn-brown text-yellow mx-1" >
                                            <span className="fas fa-edit"></span>
                                        </a>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement="top" overlay={<Tooltip>Desactivar Publicación</Tooltip>}>
                                        <a href="#" className="nav-link btn-brown text-yellow mx-1" >
                                            <span className="fas fa-minus-circle"></span>
                                        </a>
                                    </OverlayTrigger>
                                    
                                </nav>

                            </div>


                            <p className="text-brown p-6 text-center">{publicacion.descripcion}</p>

                            <div className="text-center">
                                {publicacion.imagen1 ? (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src=   {publicacion.imagen1} onClick={() => {setMostrar1(true)}} />

                                        <Modal show={mostrar1} onHide={() => {setMostrar1(false)}} size="lg" aria-labelledby="modal-imagen">

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
                                ) : (<></>)}
                                {publicacion.imagen2 ? (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen2} onClick={() => {setMostrar2(true)}}/>

                                        <Modal show={mostrar2} onHide={() => {setMostrar2(false)}} size="lg" aria-labelledby="modal-imagen">

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
                                ) : (<></>)}
                                {publicacion.imagen3 ? (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen3} onClick={() => {setMostrar3(true)}}/>

                                        <Modal show={mostrar3} onHide={() => {setMostrar3(false)}} size="lg" aria-labelledby="modal-imagen">

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
                                ) : (<></>)}
                                {publicacion.imagen4 ? (
                                    <>
                                        <img className="col-md-3 m-auto pointer" src={publicacion.imagen4} onClick={() => {setMostrar4(true)}}/>
                                        
                                        <Modal show={mostrar4} onHide={() => {setMostrar4(false)}} size="lg" aria-labelledby="modal-imagen">

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
                                ) : (<></>)}
                            </div>

                            <p className="text-brown p-4 mt-4">{publicacion.fecha}</p>

                        </div>

                    ))}
                </div>

            </main>

            <Footer />
        </>
    )
}

export default ListarPublicaciones