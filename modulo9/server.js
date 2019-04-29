const mongoose = require('mongoose');
const express = require('express');
const app = express();



require('./config/config')

//Ahora se maneja en un archivo de configuracion
// const port = process.env.PORT | 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./rutas/usuario'))





mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resDb) => {
    if (err) {
        throw err
    }

    console.log('Bd online');


});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})