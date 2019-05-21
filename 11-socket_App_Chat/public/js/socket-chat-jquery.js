var params = new URLSearchParams(window.location.search);



var nombre = params.get('nombre')
var sala = params.get('sala')


var divUsuarios = $("#divUsuarios")
var sala = $("#sala")
var form = $("#formEnviar")
var txtMensaje = $("#txtMensaje")
var chatBox = $("#divChatbox")


function renderizarPersonas(personas) {

    // let personas = res.usuarios
    // console.log(personas);

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

function rendereizarMensajes(mensaje, yo) {

    var html = ""
    var fecha = new Date(mensaje.fecha)
    var hora = fecha.getHours() + ':' + fecha.getMinutes()

    var adminClass = 'info'

    if (mensaje.nombre === "Administrador") {
        adminClass = 'danger'
    }

    if (yo) {
        html += '<li class="reverse animated fadeIn">'
        html += '<div class="chat-content">'
        html += '<h5>' + mensaje.nombre + '</h5>'
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += '</div>'
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += '</li>'
    } else {
        html += '<li class="animated fadeIn">'

        if (mensaje.nombre !== "Administrador") {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }
        html += '<div class="chat-content">'
        html += ' <h5>' + mensaje.nombre + '</h5>'
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>'
        html += ' </div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }




    chatBox.append(html)


}

//Listeneres de Juery
divUsuarios.on('click', 'a', function() {

        var id = $(this).data(id)

        if (id) {
            console.log(id);
        }

    })
    /**
     * Envio de un mensaje
     */
form.on('submit', function(e) {
    e.preventDefault()
    if (txtMensaje.val().trim().length == 0) {
        return;
    }
    console.log(txtMensaje.val());

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        console.log('Callback', mensaje);
        txtMensaje.val("").focus()
        rendereizarMensajes(mensaje, true)
        scrollBottom()
    });
})

function scrollBottom() {

    // selectors
    var newMessage = chatBox.children('li:last-child');

    // heights
    var clientHeight = chatBox.prop('clientHeight');
    var scrollTop = chatBox.prop('scrollTop');
    var scrollHeight = chatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatBox.scrollTop(scrollHeight);
    }
}