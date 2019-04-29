/**
 * Dependnecias 
 * */
const express = require('express');
const app = express();
//Libreria para encriptar
const bcrypt = require('bcrypt');
/**
 * Libreria para dar uso y filtrado de que atributos quitar de un JSON entre otras cosas
 */
const underscore = require('underscore');


/**
 * Importacion de modelos
 */

const Usuario = require('../modelos/usuario');


/**
 * Funciones
 */


app.get('/', (req, res) => {
    res.json('Hola')
})

/**
 * Obtiene los datos de usuario
 */
app.get('/usuario', (req, res) => {
    res.json('get Gustavo')
})

/**
 * Ingresa los datos del usuario
 * 
 */
app.post('/usuario/', (req, res) => {


    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 15),
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

        usuarioDbOk.password = null

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

/** 
 * Actualiza un usaurio
 * @param id Id de usuario
 */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
        //Estas lineas permiten actulizar solo algunos campos del objeto y otros aunque se manden los ignora
    let body = underscore.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
        // let body = req.body

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDBOk) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error en PUT',
                err,

            })
        }

        res.json({
            ok: true,
            usuario: usuarioDBOk
        })
    })

})

app.delete('/usuario/:id', (req, res) => {
    res.json('delete Gustavo')
})




module.exports = app