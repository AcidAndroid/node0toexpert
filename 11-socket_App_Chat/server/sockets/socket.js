const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')

const usuarios = new Usuarios

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre) {
            callback({ err: true, mensaje: 'Se requeire el nombre de usuario' })
        }
        console.log(data);
        let usuariosConectados = usuarios.agregarPersona(client.id, data.nombre)
        callback({ err: false, mensaje: "", usuarios: usuariosConectados })
    })

});