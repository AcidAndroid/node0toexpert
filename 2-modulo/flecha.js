function Sumar(a, b) {
    return a + b;
}

let Sumar2 = (a, b) => {
    return a + b;
}

let heroe = {
    nombre: "Wade",
    apellido: "Wilson",
    poder: "Regeneracion",
    //Esto es una funcion sin usar la palabra funcion
    getNombre() {
        console.log(`Nombre: ${this.nombre} ${this.apellido} - Poder: ${this.poder}`);

    },
    //El this no es el del objeto interno sino el de los externo por eso da undefined
    getNombre2: () => {
        console.log(`Nombre: ${this.nombre} ${this.apellido} - Poder: ${this.poder}`);

    },

};

console.log(Sumar(10, 20));
console.log(Sumar2(10, 20));

console.log(heroe.getNombre());
console.log(heroe.getNombre2());