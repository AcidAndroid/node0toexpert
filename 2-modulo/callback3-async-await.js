let empleados = [{
        id: 1,
        nombre: 'Gustavo'
    },
    {
        id: 2,
        nombre: 'Pop'
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
 * Las siguientes funciones son las misma de arriba pero en version async y await
 * 
 * 
 */


let getEmpleado2 = async(empleadoid) => {

    let empleadodb = empleados.find((empleado) => {
        return empleado.id === empleadoid;
    });

    if (!empleadodb) {
        throw new Error(`No existe un empleado con el ID: ${empleadoid}`);
    } else {
        return empleadodb;
    }
}


let getSalario2 = async(empleado) => {

    let salariodb = salarios.find((salario) => {
        return salario.id === empleado.id;
    });


    if (!salariodb) {
        throw new Error(`No existe un salario para el empleado ${empleado.nombre}`)
    } else {
        return salariodb
    }

}

/**
 * Resultados para mostrar 
 * 
 */
let getInfo = async(empleadoId) => {

    let empleado = await getEmpleado(empleadoId)
        // console.log(empleado);

    let salario = await getSalario(empleado)
        // console.log(salario);

    return `${empleado.nombre} tiene un salario de: $${salario.salario}`

}

let getInfo2 = async(empleadoId) => {

    let empleado = await getEmpleado2(empleadoId);
    // console.log(empleado);

    let salario = 0
        // salario = await getSalario2(empleado);
        // console.log(salario);

    return `${empleado.nombre} tiene un salario de: $${salario.salario}`

}


getInfo(10)
    .then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    }).catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    })




getInfo2(11)
    .then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
    }).catch(e => {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    })