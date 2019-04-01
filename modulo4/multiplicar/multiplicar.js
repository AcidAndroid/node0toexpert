const fs = require('fs');



let crearArchivo = (base) => {

    let data = ""




    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`No es numero el valor de '${base}'`)
        }

        for (let index = 0; index <= 10; index++) {
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

module.exports = {
    crearArchivo
}