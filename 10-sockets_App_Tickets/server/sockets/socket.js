const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl


io.on('connection', (client) => {

    let estadoActual = {
        estadoActual: ticketControl.estadoActual(),
        ultimos4: ticketControl.getUltimos4()
    }
    console.log('Usuario conectado');
    client.emit('estadoActual', estadoActual)

    client.on('nuevoTicket', (data, actulizar) => {
        let siguiente = ticketControl.siguienteTicket()
        console.log(`Generar nuevo ticket ${siguiente}`)
        actulizar(siguiente);
    })




    client.on('atenderTicket', (data, callback) => {
        console.log(data);
        if (!data.escritorio) {
            return callback({ err: true, mensaje: 'Escritorio necesario' })
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)
    })
    client.broadcast.emit('estadoActual', estadoActual)
});