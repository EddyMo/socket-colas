// Comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

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