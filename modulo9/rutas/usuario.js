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
 * Middleware para validar token
 * 
 */
const { verificaToken } = require('../middlewares/auntenticacion');

/**
 * Funciones
 */

/** 
 * Ssolo mueestra un pequeño
 */
app.get('/', (req, res) => {
    res.json('Hola')
})

/**
 * Obtiene los datos de todos los usuarios activos
 */
app.get('/usuario', verificaToken, (req, res) => {

    let desde = Number(req.query.desde || 0)
    let limite = Number(req.query.limite || 5)

    let condicionFiltro = {
        estado: true
    }

    //El segundo parametro es la espeicifacion de que campos mostrar en el find
    Usuario.find(condicionFiltro, 'nombre estado email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuariosDBOk) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'Error en GET'
                })
            }

            Usuario.count(condicionFiltro, (err, conteo) => {

                // console.log(usuariosDBOk);
                // res.json('get Gustavo')

                res.json({
                    ok: true,
                    total: conteo,
                    usuarios: usuariosDBOk,

                })
            })


        })




})

/**
 * Ingresa los datos del usuario
 * 
 */
app.post('/usuario/', (req, res) => {


    let body = req.bodys

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
        res.json({
            ok: true,
            usuario: usuarioDbOk
        })
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

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDBOk) => {

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

/**
 * Da de baja o borra de la coleccion de usaurios
 */
app.delete('/usuario/:id', (req, res) => {

    let borrado = req.body.borrado
    let id = req.params.id
    let body = underscore.pick(req.body, ['estado'])


    if (borrado) {
        return borradoUsuario(id, res)
    }

    return bajaUsuario(id, res)

    // res.json('delete Gustavo')
})

/**
 * Baja del usaurio pero sin borrar de la coleccion
 * @param {number} id 
 * @param {*} res 
 */
const bajaUsuario = (id, res) => {

    let cambioEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambioEstado, {
        new: true
    }, (err, usaurioDbBajaOk) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'Error en DELETE',
                err
            })
        }

        if (!usaurioDbBajaOk) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no existe",
                }
            })
        }

        return res.json({
            ok: true,
            usuario: usaurioDbBajaOk
        })

    })

}

/**
 * Borra de la Coleccion fisicamente el registro
 * @param {*} id 
 * @param res
 */
const borradoUsuario = (id, res) => {
    Usuario.findByIdAndRemove(id, (err, usuarioDbBorradoOk) => {

        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'Error en DELETE',
                err
            })
        }

        if (!usuarioDbBorradoOk) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no existe",
                }
            })
        }

        return res.json({
            ok: true,
            usuario: usuarioDbBorradoOk
        })

    })

}



module.exports = app