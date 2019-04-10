const express = require('express');
let app = express()

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