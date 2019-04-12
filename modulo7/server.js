const express = require('express');
app = express()

const hbs = require('hbs');



//Paciales para no repetir html
hbs.registerPartials(__dirname + '/views/parciales')
    //Contenido estatico
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'hbs');

app.get('/', (req, resp) => {

    let re = {
        nombre: 'Gustavo',
        edad: 33,
        url: req.url
    }

    // resp.send(re)
    resp.render('home.hbs', {
            nombre: 'Pollo',
            anio: new Date().getFullYear()
        })
        // res.send('Hola mundo!')

})


app.get('/home', (req, res) => {
    res.render('about.hbs')
})


app.listen(3000, () => {
    console.log('Escucnado en el puerto 3000');
})