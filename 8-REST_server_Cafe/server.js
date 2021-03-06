const mongoose = require('mongoose');
const express = require('./node_modules/express');
const app = express();



require('./config/config')

//Ahora se maneja en un archivo de configuracion
// const port = process.env.PORT | 3000
const bodyParser = require('./node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//hacer publica la carpeta de html
const path = require('path')
app.use(express.static(path.resolve(__dirname, './public')))

console.log(path.resolve(__dirname, './public'));


//Las rutas ya no exportan una a una....
// app.use(require('./rutas/usuario'))
// app.use(require('./rutas/login'))

//Se exportan todas las rutas en una sola
app.use(require('./rutas/rutas'))





mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resDb) => {
    if (err) {
        throw err
    }

    console.log('Bd online');


});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})