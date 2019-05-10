const express = require('express');
const app = express()
    /**
     * Middleware para validar token
     * 
     */
const { verificaToken, verificaRole } = require('../middlewares/auntenticacion');

/**
 * Importacion de modelos
 */

const modeloProducto = require('../modelos/producto');

/**
 * Funciones
 */

/**
 * Todos lo Productos con paginacion
 * 
 */
app.get('/producto', (req, res) => {


    let totalProductos = 0

    let desde = Number(req.query.desde || 0)
    let limite = Number(req.query.limite || 5)


    modeloProducto.countDocuments({}, (err, conteo) => {
        totalProductos = conteo
    })
    modeloProducto.find({ disponible: true })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .sort({ nombre: -1 })
        .skip(desde)
        .limit(limite)
        .exec((err, productosDbOk) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,

                })
            }

            if (!productosDbOk) {
                return res.json({
                    ok: false,
                    err: {
                        messasge: "No hay productos"
                    }
                })
            }

            return res.json({
                ok: true,
                totalProductos,
                productosDbOk
            })

        })


})

/**
 * Producto by Id
 */
app.get('/producto/:id', (req, res) => {
    let id = req.params.id


    modeloProducto.findById({ _id: id })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDbOk) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            }

            if (!productoDbOk) {
                return res.json({
                    ok: false,
                    err: {
                        messasge: 'No hay productos con esa clave'
                    }
                })
            }

            return res.json({
                ok: true,
                productoDbOk
            })
        })


})

/**
 * Agregar un producto
 */
app.post('/producto', [verificaToken], (req, res) => {


    let { nombre, precioUni, descripcion, disponible, categoria } = req.body
    let usuario = req.usuario._id


    let producto = new modeloProducto({
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria,
        usuario
    })

    producto.save((err, productoDbOk) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoDbOk) {
            return res.status(500).json({
                ok: false,
                err: {
                    messasge: 'Error en POST producto',
                }
            })
        }

        return res.json({
            ok: true,
            productoDbOk
        })
    })





})

/**
 * Actulizacion de un producto
 */
app.put('/producto/:id', [verificaToken], (req, res) => {

    let id = req.params.id

    let producto = req.body


    modeloProducto.findByIdAndUpdate(id, producto, {
        new: true,
        runValidators: true
    }, (err, productoDbOk) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoDbOk) {
            return res.status(500).json({
                ok: false,
                err: {
                    messasge: 'Error en POST producto',
                }
            })
        }

        return res.json({
            ok: true,
            productoDbOk
        })

    })

})

/**
 * Borrado de un producto
 */
app.delete('/producto/:id', [verificaToken], (req, res) => {

    let id = req.params.id

    let { nombre, precioUni, descripcion, disponible, categoria } = req.body
    let usuario = req.usuario._id




    modeloProducto.findByIdAndUpdate(id, {
        disponible: false
    }, (err, productoDbOk) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoDbOk) {
            return res.status(500).json({
                ok: false,
                err: {
                    messasge: 'Error en POST producto',
                }
            })
        }

        return res.json({
            ok: true,
            productoDbOk
        })

    })


})
module.exports = app