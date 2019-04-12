const express = require('express');
app = express()

const hbs = require('hbs');



//Paciales de hbs para no repetir html
hbs.registerPartials(__dirname + '/views/parciales')
    //Contenido estatico
app.use(express.static(__dirname + '/public'))


//Helpres de hbs
hbs.registerHelper('getAnio', () => { return new Date().getFullYear() })

app.set('view engine', 'hbs');

app.get('/', (req, resp) => {

    let re = {
        nombre: 'Gustavo',
        edad: 33,
        url: req.url
    }

    // resp.send(re)
    resp.render('home.hbs', {
            nombre: 'Pollo'
        })
        // res.send('Hola mundo!')

})


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        anio: new Date().getFullYear()
    })
})


app.listen(3000, () => {
    console.log('Escucnado en el puerto 3000');
})