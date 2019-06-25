import {useState, useEffect} from 'react';

const useLogin = (iniciarSesion, reglasValidacion) => {

    const [inicioSesionData, setInicioSesionData] = useState({});
    const [errores, setErrores] = useState({});
    const [iniciandoSesion, setIniciandoSesion] = useState(false);
    
    useEffect( () => {
        if(Object.keys(errores).length === 0 && iniciandoSesion){
            iniciarSesion();
        }
    }, [errores]);

    const admInicioSesion = (e) => {
        e.preventDefault();

        setIniciandoSesion(true);

        setErrores(reglasValidacion(inicioSesionData));
    }

    const admCambio = (e) => {
        e.persist();

        setInicioSesionData(inicioSesionData => (
                {...inicioSesionData, [e.target.name]: e.target.value}
            )
        );
    }

    return {
        admInicioSesion,
        admCambio,
        inicioSesionData,
        errores
    }
}

export default useLogin