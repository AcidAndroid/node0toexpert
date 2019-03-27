let heroe = {
    nombre: "Wade",
    apellido: "Wilson",
    poder: "Regeneracion",
    getNombre: function() {
        console.log(`Nombre: ${this.nombre} ${this.apellido} - Poder: ${this.poder}`);

    },
    getNombre2: () => {
        console.log(`Nombre: ${this.nombre} ${this.apellido} - Poder: ${this.poder}`);

    }
};

console.log(heroe.getNombre());
console.log(heroe.getNombre2());

//De aqui en adelante Esto es decostruncting
// let { nombre, apellido, poder } = heroe
let { nombre, apellido: Apellido, poder } = heroe


// console.log(nombre, apellido, poder);
console.log(nombre, Apellido, poder);