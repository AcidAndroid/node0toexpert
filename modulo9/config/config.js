process.env.PORT = process.env.PORT || 3000

/**
 * Entorno
 * La variable process.env.NODE_ENV la asigna Hroku por default si no es Heroku
 * entonces es desarrollo y la varialbe no existe asigna los valoeres
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 * Vencimiento del token
 */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 30


/**
 * Seed de atentnticacion
 */
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-de-desarrollo'


/**Base de datos */
let urlDB
if (process.env.NODE_ENV == 'dev') {
    //Local pero con vbox maquina virutal
    // urlDB = 'mongodb://192.168.56.102:27017/cafe'

    //Local pero conectandose a mlab
    urlDB = 'mongodb://mongo:mongomon9@ds145456.mlab.com:45456/cafe'
} else {
    //Esta linea se usa para cuando se despliega a produccion en heroku
    // urlDB = 'mongodb://mongo:mongomon9@ds145456.mlab.com:45456/cafe'
    //Cuando se quiere proteger que no se vean los datos en HERORKU
    urlDB = process.env.MONGO_DB
}
process.env.URLDB = urlDB