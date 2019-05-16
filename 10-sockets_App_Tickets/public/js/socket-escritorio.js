var socket = io()
var tituloEscritorio = $('#lblTitulo')
var atendiendo = $('#lblAtendiendo')

var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
console.log(escritorio);
tituloEscritorio.text('Escritorio: ' + escritorio)

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
        console.log(data);
        if (data === 'Sin tickets') {
            alert(data)
            atendiendo.text(data)
            return
        }
        atendiendo.text('Ticket: ' + data.numero)
    })

})