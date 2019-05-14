const express = require('express');
const ruta = express();
const fs = require('fs');
const path = require('path');

const { verificaTokenImg } = require('../middlewares/auntenticacion');

/**
 * Obtiene la imagen
 */
ruta.get('/imagen/:tipo/:nombreArchivo', [verificaTokenImg], (req, res) => {

    let tipo = req.params.tipo
    let nombreArchivo = req.params.nombreArchivo
        // console.log(req.params);

    let pathImg = `./uploads/${tipo}/${nombreArchivo}`
    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${nombreArchivo}`)


    if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
    }

    let pathNoImage = path.resolve(__dirname, `../assets/no-image.jpg`)
    return res.sendFile(pathNoImage)

})



module.exports = ruta