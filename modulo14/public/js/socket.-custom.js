var socket = io()


//Los eventos emit son para enviar informacion al servidor
//Los eventos on son para escuchar inforamcion desde el servidor

//Los eventos on son para escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor al objeto "io" ');
})

socket.on('disconnect', function() {
    console.log('Conexion perdida con el servidor');
})

//Los eventos emit son para enviar informacion al servidor
// socket.emit('enviarMensaje', {
//     usuario: 'Kell',
//     mensaje: 'hola mundo! vengo desde el navegador'
// })

socket.emit('enviarMensaje', {
    usuario: 'Kell',
    mensaje: 'hola mundo! vengo desde el navegador con confiramcion de recepcion'
}, function(respuesta) {
    console.log(respuesta);
})

socket.emit('enviarMensaje', {
    mensaje: 'hola mundo! vengo desde el navegador con confiramcion de recepcion pero no mando usaurio;debo ser un callback con mensaje de error'
}, function(respuesta) {
    console.log(respuesta);
})

socket.on('enviarMensaje', function(data) {
    console.log('====================================');
    console.log('Respuesta del servidor');
    console.log('====================================');
    console.log(data);
})