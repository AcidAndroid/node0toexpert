const express = require('express');
let app = express()

//Contenido estatico
app.use(express.static(__dirname + '/public'))

app.get('/', (req, resp) => {

    let re = {
        nombre: 'Gustaov',
        edad: 33,
        url: req.url
    }

    resp.send(re)
        // res.send('Hola mundo!')

})

app.listen
app.listen(3000, () => {
    console.log('Escucnado en el puerto 3000');
})