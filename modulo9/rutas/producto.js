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

/**Productos */
app.get('/producto', (req, res) => {
    res.json({
        ok: true,
        messasge: 'GET producto'
    })
})

/**
 * Producto by Id
 */
app.get('/producto/:id', (req, res) => {
    let id = req.params.id
    res.json({
        ok: true,
        messasge: 'GET producto id ' + id
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

    console.log(producto);

    res.json({
        ok: true,
        messasge: 'POST producto',
        producto
    })

})

/**
 * Actulizacion de un producto
 */
app.put('/producto/:id', [verificaToken], (req, res) => {

    let id = req.params.id
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

    res.json({
        ok: true,
        messasge: 'PUT producto' + id,
        producto
    })


})

/**
 * Borrado de un producto
 */
app.delete('/producto/:id', [verificaToken], (req, res) => {

    let id = req.params.id

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

    res.json({
        ok: true,
        messasge: 'DELETE producto' + id,
        producto
    })


})
module.exports = app