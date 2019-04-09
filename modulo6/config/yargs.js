const argv = require('yargs')
    .options({
        direccion: {
            desc: "Ciudad para obtener el clima",
            alias: 'd',
            demand: true
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}