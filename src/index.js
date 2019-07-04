import React from 'react';
import { render } from 'react-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/scss/estilosGenerales.scss';
import 'jquery/dist/jquery.slim'
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';

import Router from 'components/Router';

render( <Router />, document.querySelector('#principal') );