// const mul = require('./multiplicar/multiplicar');
const { crearArchivo } = require('./multiplicar/multiplicar');
let base = 4


crearArchivo(base).then((archivo) => {
    console.log('====================================');
    console.log(`Archivo ${archivo} creado`);
    console.log('====================================');
}).catch((e) => {
    console.log('==============ERROR======================');
    console.log(e);
    console.log('====================================');
})