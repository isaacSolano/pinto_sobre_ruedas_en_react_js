import {useState, useEffect} from 'react';

const useUsuario = (registro, validate) => {

    const [valores, setvalores] = useState({});
    const [errores, setErrores] = useState({});
    const [registrando, setCompletando] = useState(false);

    useEffect(() => {
        if(Object.keys(errores).length === 0 && registrando ){
            registro();
        }
    }, [errores]);

    const admEnvio = (e) => {
        e.preventDefault();

        setErrores(validate(valores));

        setCompletando(true);
    };

    const admCambio = (e) => {
        e.persist();
        setvalores(valores => (
                {...valores, [e.target.name]: e.target.value}
            )
        );
    };

    return{ 
        admEnvio,
        admCambio,
        valores,
        errores,
    }
};

export default useUsuario;