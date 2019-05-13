const express = require('express');
const file = require('express-fileupload');
const ruta = express();



ruta.use(file({
    useTempFiles: true
}))

ruta.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo
    let id = req.params.id


    //Tipos de objetos que permiten carga de archivos
    let tipoValidos = ['usuario', 'producto']

    //Tipos de extensiones validas
    let extensionesValidas = ['pdf', 'png', 'jpeg', 'jpg', 'bmp']
    let nombreArchivo = req.files.archivo.name
    let extensionPosicion = nombreArchivo.split('.').length

    let extensionNormal = nombreArchivo.split('.')[extensionPosicion - 1]
    extensionPosicion = req.files.archivo.mimetype.split('/').length
    let extensionMime = req.files.archivo.mimetype.split('/')[extensionPosicion - 1]


    //Obtencion del reques de los archivos cargados
    let archivo = req.files.archivo

    console.log(extensionNormal);
    console.log(extensionMime);
    console.log(tipo)

    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipo de objeto no pemitido para tener archivos '
            }
        })
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No hay archivos para cargar'
            }
        })
    }


    if (!extensionesValidas.includes(extensionNormal) || !extensionesValidas.includes(extensionMime)) {
        return res.json({
            ok: false,
            err: {
                message: 'Tipo de archivo no permitido'
            }
        })
    }


    //Cambiar nombre al archivo
    nombreArchivo = `${id} - ${nombreArchivo}-${new Date().getMilliseconds()}.${extensionNormal}`

    console.log(nombreArchivo)


    archivo.mv('uploads/' + tipo + '/' + nombreArchivo, (err) => {

        //Erro al cargar el archivo
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Todo Ok
        return res.status(404).json({
            ok: true,
            message: 'Archivo ' + nombreArchivo + ' cargado'
        })
    })
});


module.exports = ruta