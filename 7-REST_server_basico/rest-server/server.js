const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config')

//Ahora se maneja en un archivo de configuracion
// const port = process.env.PORT | 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Hola')
})

app.get('/usuario', (req, res) => {
    res.json('get Gustavo')
})

app.post('/usuario/', (req, res) => {


    let body = req.body

    if (!body.nombre) {
        res.status(400).json({
            messase: 'No se proporciono un nombre'
        })
    } else {
        console.log(`Body enviado`, body);
        res.json({ usuario: body })
    }


})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json({ id })
})

app.delete('/usuario/:id', (req, res) => {
    res.json('delete Gustavo')
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})