import {useState, useEffect} from 'react';

const useUser = (registro, validate) => {

    const [usuarios, setUsuarios] = useState({});
    const [errores, setErrores] = useState({});
    const [registrando, setRegistrando] = useState(false);

    useEffect(() => {
        if(Object.keys(errores).length === 0 && registrando ){
            registro();
        }
    }, [errores]);

    const admRegistro = (e) => {
        e.preventDefault();

        setErrores(validate(usuarios));

        setRegistrando(true);
    };

    const admCambio = (e) => {
        e.persist();
        setUsuarios(usuarios => (
                {...usuarios, [e.target.name]: e.target.value}
            )
        );
    };

    return{ 
        admRegistro,
        admCambio,
        usuarios,
        errores,
    }
};

export default useUser;