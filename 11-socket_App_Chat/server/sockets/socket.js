const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios

io.on('connection', (client) => {

    console.log('Usuario conectado');

    /**
     * Momento de conexion de nun nuevo cliente
     */
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            callback({ err: true, mensaje: 'Se requeire el nombre de usuario y la sala' })
        }
        // console.log('Datos enviados por el cliente recien conectado:', data);


        //Se agrega el usuario a una sala
        client.join(data.sala)

        //Se agrega a la lista de personas el nuevo integrante del chat
        let usuariosConectados = usuarios.agregarPersona(client.id, data.nombre, data.sala)

        //Enviar a todas las personas en general
        // client.broadcast.emit('listaPersonas', usuarios.getPersonas())

        //Enviar a todos los de la misma sala
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala))

        //Se regresa al cliente los usaurios conectados inclido el mismo
        callback({ err: false, mensaje: "", usuarios: usuarios.getPersonasPorSala(data.sala) })
    })

    /**
     * Momento de desconexion de un cliente
     */
    client.on('disconnect', () => {
        console.log('Datos del cliente que se desconecta', client.id);
        let personaBorrada = usuarios.borrarPersona(client.id)


        console.log('Persona borrada socket', personaBorrada);
        if (personaBorrada) {
            client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Servidor', `${personaBorrada.nombre} salio del chat.`))
        }

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala))

    })

    /**Momento de enviar un mensaje por un usuario */
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    })

    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })
});