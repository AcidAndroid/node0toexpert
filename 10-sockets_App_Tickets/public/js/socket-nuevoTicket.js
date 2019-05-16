var socket = io()
var label = $('#lblNuevoTicket')

socket.on('estadoActual', function(data) {
    console.log('Menssaje del servidor', data);
    var nuevoTicket = data.estadoActual
    label.text(nuevoTicket)
})

socket.on('connect', function() {
    console.log('Conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Servidor fuera de linea');
})

$('button').on('click', function() {
    socket.emit('nuevoTicket', { hola: 'adasd' }, function(nuevoTicket) {
        // console.log(label.text());
        // console.log(nuevoTicket);
        label.text(nuevoTicket)
    })
})



$('body').on('load', function() {
    console.log('Cargado');
})