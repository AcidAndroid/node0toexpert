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
 * Json Web Token
 */
const jwt = require('jsonwebtoken');

/**
 * Libreria para dar uso y filtrado de que atributos quitar de un JSON entre otras cosas
 */
const underscore = require('underscore');

/**
 * Librerias para validar token de Google
 */
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

        let token = jwt.sign({ usuario: usuarioDbOk }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDbOk,
            token
        })
    })

})


/**
 * Configuracion de google
 */
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log('Payload validado por google:', payload);
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}
// verify().catch(console.error);

/**Login con google account y regresa token */
app.post('/google', async(req, res) => {

    let token = req.body.idtoken
    let googleUser = await verify(token)
        .catch(error => {
            return res.status(403).json({
                ok: false,
                err: error
            })
        })

    console.log('====================================');
    console.log('Objeto validado que se usa para crear usuario de Google en mi app');
    console.log('====================================');

    console.log(googleUser);

    /**Token que viene desde index.html */
    // return res.json({ body: req.body })
    // return res.json({ token: req.body.idtoken })
    // return res.json({ usuario: googleUser })

    /**Validacion de existencia de usaurio en BD */
    modeloUsuario.findOne({ email: googleUser.email }, (err, usuarioDbOk) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //Encontro el usuario
        if (usuarioDbOk) {
            //Sí existe el email del usuario pero no se creó de google; no lo deja pasar
            if (usuarioDbOk.google === false) {
                return res.status(400).json({
                        ok: false,
                        err: { message: 'Debe usar su autenticacion normal' }
                    })
                    //Sí existe el email de usaurio y se creó por google;genera un token nuevo o renueva el existente
            } else {
                let token = jwt.sign({ usuario: usuarioDbOk }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

                return res.json({
                    ok: true,
                    usuario: usuarioDbOk,
                    token,
                })

            }
        }
        /**No existe el usaurio en la BD; es nuevo */
        else {

            let usuario = new modeloUsuario()
            usuario.nombre = googleUser.nombre
            usuario.email = googleUser.email
            usuario.img = googleUser.img
            usuario.google = true
            usuario.password = ":)"

            usuario.save((err, usuarioDbOk) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({ usuario: usuarioDbOk }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

                return res.json({
                    ok: true,
                    usuario: usuarioDbOk,
                    token,
                })


            })
        }

    })


});


module.exports = app