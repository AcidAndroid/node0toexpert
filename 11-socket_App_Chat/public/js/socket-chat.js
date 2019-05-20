var socket = io();
var params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('usuario y sala necesario')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(data) {
        console.log('Usuario conectado, estos son los usuarios actuales en el chat:', data)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar mensajes de todos los usuarios
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//Escuchar cambios de usuarios (entrada o desconexion de usuarios)
socket.on('listaPersonas', function(data) {
    console.log('Usuarios actuales conectados:', data);

})

//Escuchar mensaje privado
socket.on('mensajePrivado', function(data) {
    console.log('Mensaje privado', data);
})