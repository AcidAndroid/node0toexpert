var params = new URLSearchParams(window.location.search);
var divUsuarios = $("#divUsuarios")
var sala = $("#sala")


function renderizarPersonas(personas) {

    // let personas = res.usuarios
    console.log(personas);

    var html = ""

    html += '<li>'
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>'
    html += '</li>'

    sala.html(params.get('sala'))

    for (let index = 0; index < personas.length; index++) {
        html += '<li>'
        html += '<a data-id="' + personas[index].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[index].nombre + '<small class="text-success">online</small></span></a>'
        html += '</li>'
    }


    // console.log(html);
    // console.log(html);
    divUsuarios.html(html)

}