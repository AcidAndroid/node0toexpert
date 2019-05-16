const mongoose = require('mongoose');
const uniqueValidator = require('../node_modules/mongoose-unique-validator');


let categoriaSchema = new mongoose.Schema({
        descripcion: {
            type: String,
            unique: true,
            required: [true, 'La descripcion es requerida']
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuario',
            // required: true
        }

    })
    // categoriaSchema.plugin(uniqueValidator, {
    //     message: 'El campo {PATH} ya existe en la BD para ese valor'
    // })

module.exports = mongoose.model('categoria', categoriaSchema)