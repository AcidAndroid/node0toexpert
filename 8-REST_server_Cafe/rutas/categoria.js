const express = require('../node_modules/express');
const app = express()

/**
 * Middleware para validar token
 * 
 */
const {
    verificaToken,
    verificaRole
} = require('../middlewares/auntenticacion');

/**
 * Importacion de modelos
 */

const modeloCategoria = require('../modelos/categoria');


/**
 * Funciones
 */

/**
 * Obtiene Todas las categorias
 */
app.get('/categoria', [verificaToken], (req, res) => {
    let categoriasEncontradas = 0

    modeloCategoria.countDocuments({}, (err, conteo) => {
            categoriasEncontradas = conteo
        })
        // console.log(categoriasEncontradas);
    modeloCategoria.find({}).sort({
        descripcion: 1
    }).populate('usuario', 'nombre email').exec((err, categoriaDbOk) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'Error en GET',
                err,
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDbOk || {},
            total: categoriasEncontradas || 0
        })
    })

})

/**
 * Obtiene una categoria por Id
 */
app.get('/categoria/:id', [verificaToken], (req, res) => {

    let id = req.params.id
    let categoriasEncontradas = 0

    modeloCategoria.countDocuments({
        _id: id
    }, (err, conteo) => {
        categoriasEncontradas = conteo
    })
    modeloCategoria.findById({
        _id: id
    }).exec((err, categoriaDbOk) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'Error en GET',
                err,
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDbOk || {},
            total: categoriasEncontradas
        })

    })
})

/**Ingresa una categoria */
app.post('/categoria', [verificaToken], (req, res) => {

    let body = req.body
    let usuario = req.usuario

    console.log(usuario);

    let categoria = new modeloCategoria({
        descripcion: body.descripcion,
        usuario: usuario._id,
    })

    categoria.save((err, categoriaDbOk) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error en POST',
                err,
            })
        }

        if (!categoriaDbOk) {
            return res.status(400).json({
                ok: false,
                message: 'Error en POST',
                err,
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDbOk
        })

    })



})

/**
 * Actualiza una  categoria
 */
app.put('/categoria/:id', [verificaToken], (req, res) => {

    let id = req.params.id

    let categoria = req.body


    modeloCategoria.findByIdAndUpdate(id, categoria, {
        new: true,
        runValidators: true
    }, (err, categoriaDbOk) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error en PUT',
                err,
            })
        }

        if (!categoriaDbOk) {
            return res.status(400).json({
                ok: false,
                message: 'Error en PUT',
                err,
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDbOk
        })

    })

})

/**
 * Borra una categoria
 */
app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res) => {
    //Solo administrador borra categorias

    let id = req.params.id


    modeloCategoria.findByIdAndRemove(id, (err, categoriaDBOk) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error en DELETE',
                err,
            })
        }

        if (!categoriaDBOk) {
            return res.status(400).json({
                ok: false,
                message: 'Error en DELETE. No existe ese elmento para borrar',
                err,
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDBOk
        })

    })

})

module.exports = app