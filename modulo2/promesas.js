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
    }, {
        id: 4,
        nombre: 'Pop'
    }
];

let salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }, {
        id: 4,
        salario: 2000
    }
];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        let empleadodb = empleados.find((empleado) => {
            return empleado.id === id;
        });

        if (!empleadodb) {
            reject(`No existe un empleado con el ID: ${id}`);
        } else {
            resolve(empleadodb);
        }

    })
}

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        let salariodb = salarios.find((salario) => {
            return salario.id === empleado.id;
        });

        if (!salariodb) {
            reject(`No existe un salario para el empleado ${empleado.nombre}`);
            return;
        } else {
            resolve({
                id: empleado.id,
                nombre: empleado.nombre,
                salario: salariodb.salario
            });
        }
    })
};

/**
 * Promesa con llamado a funcion como su fuera callback
 */
getEmpleado(3).then(empleado => {
    console.log("Empleado BD", empleado);

    getSalario(empleado).then(salario => {
        console.log('====================================');
        console.log(`El salario de ${salario.nombre} es de ${salario.salario}`);
        console.log('====================================');
    }, (err) => {
        console.error(err);
    })

}, (err) => {
    console.log(err);
})

/**
 * Promesa con timeout
 */
setTimeout(() => {
    getSalario({ id: 2, nombre: 'Kell' }).then(salario => {
        console.log("Salario", salario)
    }, (err) => {
        console.log(err);
    })
}, 6000);

/**
 * Promesa encadenada
 */


getEmpleado(4).then(empleado => {
        console.log('====================================');
        console.log(`El empelado con el id ${empleado.id} es:`, empleado);
        console.log('====================================');
        return getSalario(empleado)
    })
    .then(salario => {
        console.log('====================================');
        console.log(`El salario de ${salario.nombre} es de $ ${salario.salario}`);
        console.log('====================================');
    })
    .catch(err => {
        console.error('Error en las promesas encadenadas:', err);

    })