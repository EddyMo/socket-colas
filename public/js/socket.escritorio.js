// Comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});

/*
var label = $('#lblNuevoTicket');

// socket.on('connect', function() {
//     console.log('Conectado al servidor');
// });
// socket.on('disconnect', function() {
//     console.log('Desconectado del servidor');
// });

//on Estado Actual
socket.on('estadoActual', function(dato) {
    label.text(dato.actual);
});

$('button').on('click', function() {
    //console.log('Click aqui');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
    //  socket.emit('siguienteTicket', {
    //     usuario: 'Edwin',
    //     mensaje: 'Hola Mundo'
    // }, function(resp) {
    //     console.log('Respuesta server: ', resp);
    // });
});
*/