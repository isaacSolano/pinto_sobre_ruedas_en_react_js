import React from 'react';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import 'components/LandingPage/LandingPage.scss'

const LandingPage = () => {

    return (
        <>

            <Header />

            <main>
                <div className="background-image">
                    <div className="container">
                        <div className="row">
                            <section className="col-md-6 text-justify">
                                <h2 className="text-yellow"><span className="font-weight-bold"> Pinto </span> sobre ruedas</h2>

                                <p className="text-yellow"><span className="font-italic">"Pinto sobre ruedas"</span> es un blog donde podés compartir tus entrenos, rides en bici con nuestra comunidad y recomendar esos restaurantes, sodas que tanto prometen, esos lugares celestiales donde revíves después de cada una de esas aventuras en dos ruedas.</p>

                                <button type="submit" className="btn btn-yellow text-brown">Ver más...</button>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="container p-6">
                    <div className="row p-5">
                        <section className="col-md-3 text-justify m-auto">
                            <p className="icon text-center text-yellow"> <span className="fas fa-utensils"></span>  </p>

                            <p className="text-brown">Comparta con nuestra comunidad sobre sus experiencias en rides, entrenos y recomiéndenos los mejores lugares para esa parada obligatoria en toda ruta.</p>
                        </section>

                        <section className="col-md-3 text-justify m-auto">
                            <p className="icon text-center text-yellow"> <span className="fas fa-map-marked"></span>  </p>

                            <p className="text-brown">¿Ni idea de donde ridear o qué visitar? Ingrese en nuestro blog y vea las mejores recomendaciones que nuestros amigos cleteros le hacen.</p>
                        </section>

                        <section className="col-md-3 text-justify m-auto">
                            <p className="icon text-center text-yellow"> <span className="fas fa-comments"></span>  </p>

                            <p className="text-brown">¿Alguna recomendacion o algo que le gustaría ver en <span className="font-italic font-weight-bold">Pinto sobre ruedas</span>? Escríbanos en pintosobreruedas@gmail.com y bríndenos sus comentarios, ideas y más.</p>
                        </section>
                    </div>
                </div>
                    
                
            </main>

            <Footer />

        </>
    );
}

export default LandingPage;