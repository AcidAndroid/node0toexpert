const { argv } = require('./config/yargs');
const { getLugar } = require('./datos/lugar');
const { getClima } = require('./datos/clima');
// const axios = require('axios');

let direccion = argv.direccion
let lugar
    // direccion = encodeURI(direccion)

console.log('Direccion o lugar:', direccion);


// getLugar(direccion).then(response => {
//         lugar = response
//         console.log(lugar)
//     })
//     .catch(err => console.log(err))

//Objeto prueba
/**
 * { direccion: 'Yucatan, Mexico',
  lat: '32.599998',
  lng: '-115.089996' }
 * 
 */

// getClima({
//         direccion: 'Yucatan, Mexico',
//         lat: '32.599998',
//         lng: '-115.089996'
//     })
//     .then(res => {
//         console.log(res)
//     })


const getInfo = async(direccion) => {

    try {
        const lugar = await getLugar(direccion)
        const temp = await getClima(lugar)
        return `El clima para ${lugar.direccion} es de ${temp.temp}`
    } catch (error) {
        console.error(error);
    }

}

getInfo(direccion)
    .then(respuesta => { console.log(respuesta) })
    .catch(err => { console.log(err) });