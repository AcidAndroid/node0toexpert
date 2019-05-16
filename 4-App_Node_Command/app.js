// const mul = require('./multiplicar/multiplicar');
const {
    crearArchivo,
    mostrar
} = require('./multiplicar/multiplicar');
const { argv } = require('./config/yargs');
const colors = require('colors');



// let base = 4
// let args = process.argv
console.log(argv);
// console.log(argv.base);
// console.log(argv.limite);
// console.log(args);
//args tiene los parametros generales con los que se ejecuta node
// console.log(args[2].split('='));
// console.log(args[2].split('=')[1]);
// console.log(Number(args[2].split('=')[1]));

let commando = argv._[0]

switch (commando) {
    case 'listar':
        console.log('Listar')
        mostrar(argv.base, argv.limite)
        break;
    case 'crear':
        console.log('Crear')
        crearArchivo(argv.base, argv.limite).then((archivo) => {
            console.log('===================================='.bgGreen.red);
            console.log(`Archivo ${archivo} creado`.cyan);
            console.log('===================================='.bgGreen.red);
        }).catch((e) => {
            console.log('==============ERROR======================'.bgRed);
            console.log(e.bgRed);
            console.log('===================================='.bgRed);
        })
        break;
    default:
        console.log('Comando no recnocido');
        break;
}


// if (args[2] || args[2].split('=') || args[2].split('=')[1] || Number(args[2].split('=')[1])) {
//     base = args[2].split('=')[1]
// }