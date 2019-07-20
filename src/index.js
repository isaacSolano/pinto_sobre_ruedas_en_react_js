import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/css/all.css';
import 'components/scss/estilosGenerales.scss';


import Router from 'components/Router';

render( <Router />, document.querySelector('#principal') );