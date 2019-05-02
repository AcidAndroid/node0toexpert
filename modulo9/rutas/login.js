/**
 * Dependnecias 
 * */
/** 
 * Express
 */
const express = require('express');
const app = express();

/**
 * Libreria de encriptacion
 */

const bcrypt = require('bcrypt');
/**
 * Libreria para dar uso y filtrado de que atributos quitar de un JSON entre otras cosas
 */
const underscore = require('underscore');


/**
 * Importacion de modelos
 */
let modeloUsuario = require('../modelos/usuario');

/**
 * Funciones
 */
app.post('/login', (req, res) => {


    let body = req.body



    modeloUsuario.findOne({
        email: body.email
    }, (err, usuarioDbOk) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDbOk) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña no validos'
                }
            })
        }


        //Compara el password enviado y el almacenaod en modo encriptado
        const comparacion = bcrypt.compareSync(body.password, usuarioDbOk.password)

        if (!comparacion) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña no valida'
                }
            })
        }

        /**No hay ningun error */

        res.json({
            ok: true,
            usuaurio:usuarioDbOk
            ,token: 'TMPToken'
        })
    })

})


module.exports = app