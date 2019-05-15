const express = require('express');



const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;


//Lo requerido para correr sockets
const socketIO = require('socket.io');
const http = require('http');

let server = http.createServer(app)

//io = Comuncacion del backend
module.exports.io = socketIO(server)
require('./sockets/socket')




/**
 * Middelware
 */
app.use(express.static(publicPath));


/**
 * Se sustituye el app.listen por server.listen para poder
 * usar el modulo http que es OBLIGATORIO para usar socket.io
 */
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});