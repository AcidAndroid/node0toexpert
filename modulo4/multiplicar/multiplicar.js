const fs = require('fs');
const colors = require('colors');

let crearArchivo = (base, limite) => {

    let data = ""



    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`No es numero el valor de '${base}'`)
        }

        for (let index = 0; index <= limite; index++) {
            data += `${base} X ${index}=${base*index}\n`
        }

        fs.writeFile(`tablas/tabla_del_${base}.txt`, data, (err) => {
            if (err) {
                reject(err)
            }
            resolve(`tabla_del_${base}`)
        });
    });
}

let mostrar = (base, limite) => {
    let data = ""
    for (let index = 0; index <= limite; index++) {
        data += `${base} X ${index}=${base*index}\n`
    }
    console.log('===================================='.bgCyan.red);
    console.log(data.red);
    console.log('===================================='.blue.bgCyan);
}

module.exports = {
    crearArchivo,
    mostrar
}