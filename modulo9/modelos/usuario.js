const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email obligatorio'],

    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,

    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});

usuarioSchema.plugin(uniqueValidator, { message: 'El campo {PATH} ya existe en la BD para ese valor' })

module.exports = mongoose.model('Usuario', usuarioSchema)