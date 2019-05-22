"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicilizada');
        this.cnn = mysql.createConnection({
            host: '192.168.56.101',
            user: 'root',
            password: 'ubuntumon',
            database: 'node_db'
        });
        this.conectarDb();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    conectarDb() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Clase inicilizada y conectada a la BD');
        });
    }
}
exports.default = MySQL;
