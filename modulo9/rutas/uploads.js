const express = require('express');
const file = require('express-fileupload');
const ruta = express();



ruta.use(file({
    useTempFiles: true
}))

ruta.put('/upload', (req, res) => {

    let extensionesValidas=['pdf','png','jpeg','jpg','bmp']
    let nombreArchivo= req.files.archivo.name
    let extensionPosicion =nombreArchivo.split('.').length

    let extensionNormal= nombreArchivo.split('.')[extensionPosicion-1]
    extensionPosicion =req.files.archivo.mimetype.split('/').length
    let extensionMime= req.files.archivo.mimetype.split('/')[extensionPosicion-1]
    

    console.log(extensionNormal);
    console.log(extensionMime);


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No hay archivos para cargar'
            }
        })
    }


    if(!extensionesValidas.includes(extensionNormal) || !extensionesValidas.includes(extensionMime) ){
        return res.json({
            ok:false
            ,err:{
                message:'Tipo de archivo no permitido'
            }
        })
    }



    let archivo = req.files.archivo

    archivo.mv('uploads/'+ nombreArchivo, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.status(404).json({
            ok:true
            ,message:'Archivo ' + nombreArchivo  + ' cargado'
        })
    })
});


module.exports = ruta