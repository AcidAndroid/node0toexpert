console.log('Inicio del programa');

setTimeout(() => {
    console.log('Primer timeout')
}, 3000);

setTimeout(() => {
    console.log('Segundo timeout')
}, 0);

setTimeout(() => {
    console.log('Tercer timeout')
}, 0);


setTimeout(() => {
    console.log('Cuarto timeout')
}, 5000);

console.log('Fin programa');