const axios = require('axios');

const getClima = async(lugar) => {



    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lugar.lat}&lon=${lugar.lng}&appid=9db613302080a50eeededb33b74b3ac6&units=metric`)


    if (response.data.main.length == 0) {
        throw new Error(`No hay de clima para ${lugar.direccion}`)
    }

    return response.data.main
}

module.exports = {
    getClima
}