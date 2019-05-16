let empleados = [{
        id: 1,
        nombre: 'Gustavo'
    },
    {
        id: 2,
        nombre: 'Juan'
    },
    {
        id: 3,
        nombre: 'Nash'
    }
];

let salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
];
/**
 * Obtiene un empleado
 * @param {*} id 
 * @param {*} callback 
 */
let getEmpleado = (id, callback) => {
    let empleadodb = empleados.find((empleado) => {
        return empleado.id === id;
    });

    if (!empleadodb) {
        callback(`No existe un empleado con el ID: ${id}`);
    } else {
        callback(null, empleadodb);
    }
};

/**
 * 
 * Debe regresar el siguien objeto
 * { nombre:'Un nombre'
 *  ,salario:1000
 * }
 * En caso de error mostrar No se encontro un salario para le usaurio NOMBRE
 */
let getSalario = (empleado, callback) => {
    let salariodb = salarios.find((salario) => {
        return salario.id === empleado.id;
    });

    if (!salariodb) {
        callback(`No existe un salario para el empleado ${empleado.nombre}`);
        return;
    } else {
        callback(null, {
            id: empleado.id,
            nombre: empleado.nombre,
            salario: salariodb.salario
        });
    }
};

let empleadoRecuperado;
// getEmpleado(1);
getEmpleado(3, (err, emp) => {
    if (err) {
        console.log(err);
        return;
    }
    this.empleadoRecuperado = emp;
    // console.log(emp)

    console.log('====================================');
    console.log(this.empleadoRecuperado);
    console.log('====================================');
    getSalario(this.empleadoRecuperado, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`El salario de ${res.nombre} es de $ ${res.salario}`);
    });
});