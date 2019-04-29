process.env.PORT = process.env.PORT || 3000

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**Base de datos */
let urlDB
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://192.168.56.102:27017/cafe'
} else {
    urlDB = 'mongodb://mongo:mongomon9@ds145456.mlab.com:45456/cafe'
}
process.env.URLDB = urlDB