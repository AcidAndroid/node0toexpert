import mysql = require('mysql');

export default class MySQL {
	private static _intance: MySQL;
	cnn: mysql.Connection;
	conectado: boolean = false;

	constructor() {
		console.log('Clase inicilizada');
		this.cnn = mysql.createConnection({
			host: '192.168.56.101',
			user: 'root',
			password: 'ubuntumon',
			database: 'node_db'
		});

		this.conectarDb();
	}

	public static get instance() {
		return this._intance || (this._intance = new this());
	}

	static ejecutarQuery(qry: string, callback: Function) {
		this.instance.cnn.query(qry, (err, result, fields) => {
			if (err) {
                console.log('Error en query:', err);
                return callback(err)
            }
            
            if (result.length===0) {
                return callback('No hay resultados')                
            }

            callback(null,result)
		});
	}
	private conectarDb() {
		this.cnn.connect((err: mysql.MysqlError) => {
			if (err) {
				console.log(err.message);
				return;
			}

			this.conectado = true;
			console.log('Clase inicilizada y conectada a la BD');
		});
	}
}
