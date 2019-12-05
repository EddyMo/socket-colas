const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Se carga cuando inicia la conexion
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Se ejecuta a solicitud del cliente - la creación de un siguiente ticket
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        //console.log(siguiente);
        callback(siguiente);
    });

    // Se ejecuta a solicitud del cliente - la atención del siguiente ticket
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        // Asignacion de ticket al escritorio y retorno de resultado
        let atenderTicket = ticketControl.atendetTicket(data.escritorio);
        callback(atenderTicket);

        // Se lanza un Broadcast para todos con lo ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});