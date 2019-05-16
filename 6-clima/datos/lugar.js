const axios = require('axios');

/**
 * Obtiene la latitud y longitud de un lugar o direccion dados
 * @param {} lugar 
 */
const getLugar = async(lugar) => {

    //Se cambia la codificacion del string direccion
    let direccionParseada = encodeURI(lugar)



    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${direccionParseada}`,
        // timeout: 1000,
        headers: {
            'X-RapidAPI-Key': '7ad8da25c2msh1b36401408c9c54p1eb3c7jsn01b23658eb05'
        }
    });


    // instance.get().then(respuesta => {
    //     console.log('Estatus', respuesta.status);
    //     console.log('Datos', respuesta.data);
    //     console.log('Datos finales', respuesta.data.Results[0]);
    //     // console.log('Toda la respuesta', respuesta);

    // }).catch(err => {
    //     console.log("Error en peticion", err);
    // })

    const response = await instance.get()

    if (response.data.Results.length == 0) {
        throw new Error(`No hay resultados para ${direccionParseada}`)
    }

    const dataFinal = response.data.Results[0]
    const direccion = dataFinal.name
    const lat = dataFinal.lat
    const lng = dataFinal.lon



    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugar
}