import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';



const server = Server.init(3000)

//NO Usa el patron singleton aqui;cada linea crea una nueva instancia
const mysql = new MySQL()
const mysql2 = new MySQL()
const mysql3= new MySQL()
const mysql4 = new MySQL()

//Usa el patron singleton asqui,Todas las llamadas usan la misma instancia
MySQL.instance
MySQL.instance
MySQL.instance
MySQL.instance

server.app.use(router)

server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000');
})