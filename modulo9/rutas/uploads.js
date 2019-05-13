const express = require('express');
const file = require('express-fileupload');
const ruta = express();

/**
 * Modelos
 */
const modeloUsuario = require('../modelos/usuario');


const fs = require('fs');
const path = require('path');

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


    //Obtencion del request de los archivos cargados
    let archivo = req.files.archivo

    // console.log(extensionNormal);
    // console.log(extensionMime);
    // console.log(tipo)

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

    //Validacion de los archivos y su extension
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

    // console.log(nombreArchivo)


    archivo.mv('uploads/' + tipo + '/' + nombreArchivo, (err) => {

        //Erro al cargar el archivo
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Actulizar imagen de usaurio
        imagenUsuario(id, res, nombreArchivo)

    })
});

/**
 * 
 * @param {*} id Id del usaurio
 * @param {*} res Respuesta del servidor
 * @param {*} nombreArchivo Nombre del archivo
 */
const imagenUsuario = (id, res, nombreArchivo) => {

    modeloUsuario.findById(id, (err, usuarionDbOk) => {
        //Erro al buscar usuarios
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarionDbOk) {
            //Borra imagenees de usuarios que ya no existen
            borrarArchivo(nombreArchivo, 'usuario')
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }


        //Actuliza la imagen borrando la previa y dejando solo la nueva
        borrarArchivo(usuarionDbOk.img, 'usuario')

        usuarionDbOk.img = nombreArchivo

        usuarionDbOk.save((err, usuarioGuardado) => {
            return res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })

    })
    modeloUsuario.findByIdAndUpdate(id, {}, (err, usuarionDbOk) => {

    })
}

const imagenProducto = (id) => {

}

const borrarArchivo = (nombreARchivo, tipo) => {
    //Borra el archivo que existe previamente para poner la nueva y no tener imagenes almacenadas

    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${nombreARchivo}`)

    if (fs.existsSync(pathImagen)) { fs.unlinkSync(pathImagen) }

}

module.exports = ruta