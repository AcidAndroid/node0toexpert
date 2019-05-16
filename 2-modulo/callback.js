let getUsuerById = (id, callback) => {

    let usuario = {
        nombre: "Kell",
        id

    }

    if (id == 20) {
        callback(`El usaurio con id ${id} No existe en la BD`)
    } else {
        callback(null, usuario)
    }
}

getUsuerById(5, (err, usuario) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Usuario de bd:`, usuario)
})