const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        let data = require('../data/data.json')
        this.tickets = []


        //Continua con el dia normal
        if (data.hoy == this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
                //Reinicia el dia y los tickets
        } else {
            this.reiniciarDia()
        }
    }

    reiniciarDia() {
        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []
        this.grabarDatos()
        console.log('Reinicilizado el sistema');

    }


    siguienteTicket() {

        this.ultimo += 1;

        let nuevoTicket = new Ticket(this.ultimo, null)
        this.tickets.push(nuevoTicket)

        this.grabarDatos()
        return `Ticket: ${this.ultimo}`
    }

    estadoActual() {
        return `Ticket: ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4
    }


    atenderTicket(numEscriorio) {

        if (this.tickets.length == 0) {
            return 'Sin tickets'
        }


        let numeroTicket = this.tickets[0].numero
        this.tickets.shift()

        let atenderTicket = new Ticket(numeroTicket, numEscriorio)
        this.ultimos4.unshift(atenderTicket)

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)
        }


        console.log('Ulstimos 4', this.ultimos4);

        this.grabarDatos()

        return atenderTicket


    }

    grabarDatos() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        console.log(jsonData);
        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server//data/data.json', jsonDataString)
    }
}





module.exports = { TicketControl }