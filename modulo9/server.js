const mongoose = require('mongoose');



const bodyParser = require('body-parser');
require('./config/config')

//Ahora se maneja en un archivo de configuracion
// const port = process.env.PORT | 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





mongoose.connect('mongodb://192.168.56.102:27017/cafe', { useNewUrlParser: true }, (err, resDb) => {
    if (err) {
        throw err
    }

    console.log('Bd online');


});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})