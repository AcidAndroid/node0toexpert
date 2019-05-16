var socket = io()
var lblEscritorio1 = $("#lblEscritorio1")
var lblEscritorio2 = $("#lblEscritorio2")
var lblEscritorio3 = $("#lblEscritorio3")
var lblEscritorio4 = $("#lblEscritorio4")

var lblTicket1 = $("#lblTicket1")
var lblTicket2 = $("#lblTicket2")
var lblTicket3 = $("#lblTicket3")
var lblTicket4 = $("#lblTicket4")

lblTickets = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]
lblEscritorios = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]

socket.on('estadoActual', function(data) {
    console.log(data);
    actulizaEscritorios(data.ultimos4)
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
})



function actulizaEscritorios(ultimos4) {
    for (let index = 0; index < ultimos4.length; index++) {
        lblTickets[index].text('Ticket ' + ultimos4[index].numero)
        lblEscritorios[index].text('Escritorio ' + ultimos4[index].escritorio)
            // const element = ultimos4[index];

    }
}