/**
 * Ambas funciones getNombre son equivalentes, la diferencia es que una
 * se escribe mas teto, SON LOS MISMO
 */
let getNombre = async() => {
    /**
     * Esta linea sire para ejemplificar como se caeria en el catch usando async
     */
    //throw new Error('Soy un error en la funcion getNombre que usa ASYNC')


    return 'Kell Dintch'


}

let getNombre2 = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('Kell dintch')
        }, 3000);

    });
}

let getSaludo = async() => {

    let nombre = await getNombre2()

    return `Hola ${nombre}`

}

getNombre().then(nombre => {
    console.log('=============ASYNC===================');
    console.log(nombre);
    console.log('====================================');
}).catch(e => {
    console.log('===========ERROR EN ASYNC==================');
    console.log('Error GACP ejemplo en ASYNC', e);
    console.log('====================================');
})

getNombre2().then(nombre => {
    console.log('=============FUNCION CON PROMESA==================');
    console.log(nombre);
    console.log('====================================');
}).catch(e => {
    console.log('=============ERROR FUNCION PROMESA==============');
    console.log('Error GACP ejemplo en funcion promesa', e);
    console.log('====================================');
})

getSaludo().then(mensaje => {
    console.log('======EJEMPLO USO AWAIT==============');
    console.log('Resultado de funcion con AWAIT', mensaje);
    console.log('====================================');
}).catch(error => {

})