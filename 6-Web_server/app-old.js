const http = require('http');


http.createServer((req, resp) => {

    let re = {
        nombre: 'Gustaov',
        edad: 33,
        url: req.url
    }
    resp.writeHead(202, { 'Content-Type': 'application/json' })
    resp.write(JSON.stringify(re))
        //El end es obligatorio ponerlo o se queda procesando eternamente
    resp.end()
}).listen(8080)

console.log('Escucando en el puerto 8080');