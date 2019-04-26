const express = require('express');
const app = express();



/**
 * Importacion de modelos
 */

const Usuario = require('../modelos/usuario');

app.get('/', (req, res) => {
    res.json('Hola')
})

app.get('/usuario', (req, res) => {
    res.json('get Gustavo')
})

app.post('/usuario/', (req, res) => {


    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    })


    usuario.save((err, usuarioDbOk) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error en POST',
                err,

            })
        }

        console.log(`Body enviado`, body);
        res.json({ ok: true, usuario: usuarioDbOk })
    })


    // if (!body.nombre) {
    //     res.status(400).json({
    //         messase: 'No se proporciono un nombre'
    //     })
    // } else {
    //     console.log(`Body enviado`, body);
    //     res.json({ usuario: body })
    // }


})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json({ id })
})

app.delete('/usuario/:id', (req, res) => {
    res.json('delete Gustavo')
})

module.exports = app