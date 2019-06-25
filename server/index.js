const express = require('express'),
     bodyParser = require('body-parser'),
     mongoose = require('mongoose'),
     cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000,
     dburl = 'mongodb+srv://isaacsolano:muENdkbpMjt2JR2p@cluster0-yijrz.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.set('useCreateIndex', true)
mongoose.connect(dburl, { useNewUrlParser: true } ).then(
     () => {console.log('Base de datos conectada')},
     err => {console.log('No se pudo conectar a la base de datos' + err)
});
     
usuarios = require('./usuarios.component/usuarios.router');

app.use('/api', usuarios);


app.listen(PORT, () =>
  console.log(`Servidor conectado en el puerto ${PORT}`)
);