import React from 'react';

import SassLogo from 'imgs/sass.svg';
import BootstrapLogo from 'imgs/bootstrap.svg';
import ReactLogo from 'imgs/react.svg';
import NodeLogo from 'imgs/node.svg';
import MongoLogo from 'imgs/mongodb.svg'
import ExpressLogo from 'imgs/express.svg'

const Footer = () => (
    <footer className="bg-brown p-5">
        <div className="container">
            <div className="row">

                <section className="col-md-6 text-left align-self-center">
                    <p className="text-yellow">pinto sobre ruedas</p>
                    <p className="text-yellow">Derechos reservados 2019 &#174; </p>
                </section>

                <section className="col-md-6 text-right align-self-center">
                    <h2 className="text-yellow">Tecnologías utilizadas</h2>

                    <img src={ReactLogo} alt="React" className="col-md-2 p-3"/>
                    <img src={SassLogo} alt="Sass" className="col-md-2 p-3"/>
                    <img src={BootstrapLogo} alt="Bootstrap" className="col-md-2 p-3"/>
                    <img src={NodeLogo} alt="Node" className="col-md-2 p-3"/>
                    <img src={ExpressLogo} alt="Express" className="col-md-3 p-3"/>
                    <img src={MongoLogo} alt="Mongo" className="col-md-4 p-3"/>                    
                    
                </section>

            </div>
        </div>
    </footer>
);

export default Footer;