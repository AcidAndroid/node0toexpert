process.env.PORT = process.env.PORT || 3000

/**
 * Entorno
 * La variable process.env.NODE_ENV la asigna Hroku por default si no es Heroku
 * entonces es desarrollo y la varialbe no existe asigna los valoeres
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**Base de datos */
let urlDB
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://192.168.56.102:27017/cafe'
} else {
    //Esta linea se usa para cuando se despliega a produccion en heroku
    // urlDB = 'mongodb://mongo:mongomon9@ds145456.mlab.com:45456/cafe'
    //Cuando se quiere proteger que no se vean los datos en HERORKU
    urlDB = process.env.MONGO_DB
}
process.env.URLDB = urlDB