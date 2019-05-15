const { io } = require('../server');

/**Funciones del socket */
//Los eventos emit son para enviar informacion al cliente
//Los eventos on son para escuchar inforamcion desde el cliente

io.on('connection', (cliente) => {
    console.log('Usuario conectado');

    cliente.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    //Escuchar cliente sin conforamcion de recepcion del mensaje
    // cliente.on('enviarMensaje', (data) => {
    //     console.log('====================================');
    //     console.log('Datos recibidos desde el cliente');
    //     console.log('====================================');
    //     console.log(data);
    // })

    //Escuchar cliente con confirmacion de recepcion del mensaje
    cliente.on('enviarMensaje', (data, callback) => {
        console.log('====================================');
        console.log('Datos recibidos desde el cliente con confirmacion');
        console.log('====================================');
        console.log(data);


        if (data.usuario) {
            callback({ respuesta: 'Respuesta recibida y procesada correctamente!' });
        } else {
            callback({ respuesta: 'No se proporciono usuario!' });
        }


    })


    //Respuesta emitida al cliente desde el servidor
    cliente.emit('enviarMensaje', { usaurio: 'Servidor/Admin', mensaje: 'Hola. Bienvenido' })


})

module.exports = io