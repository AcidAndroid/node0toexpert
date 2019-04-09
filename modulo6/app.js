const { argv } = require('./config/yargs');
const axios = require('axios');

let direccion = argv.direccion

direccion = encodeURI(direccion)



console.log('Direccion o lugar:', direccion);

const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${direccion}`,
    // timeout: 1000,
    headers: { 'X-RapidAPI-Key': '7ad8da25c2msh1b36401408c9c54p1eb3c7jsn01b23658eb05' }
});

instance.get().then(respuesta => {
    console.log('Estatus', respuesta.status);
    console.log('Datos', respuesta.data);
    console.log('Datos finales', respuesta.data.Results[0]);
    // console.log('Toda la respuesta', respuesta);

}).catch(err => {
    console.log("Error en peticion", err);
})