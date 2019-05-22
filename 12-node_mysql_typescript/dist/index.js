"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
const server = server_1.default.init(3000);
//NO Usa el patron singleton aqui;cada linea crea una nueva instancia
// const mysql = new MySQL()
// const mysql2 = new MySQL()
// const mysql3= new MySQL()
// const mysql4 = new MySQL()
//Usa el patron singleton asqui,Todas las llamadas usan la misma instancia
mysql_1.default.instance;
mysql_1.default.instance;
mysql_1.default.instance;
mysql_1.default.instance;
server.app.use(router_1.default);
server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});
