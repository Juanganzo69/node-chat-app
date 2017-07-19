const path = require('path');
const http  = require('http');
const express = require('express');
const socketIO = require('socket.io');
var port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');


var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('usuario conectado');

    socket.on('crearMensaje', ( msj ) => {
        console.log('Mensaje: ', msj);
        io.emit('newMensaje', {
            de : msj.de,
            texto: msj.texto,
            creadoEl: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
});

server.listen(port, ()  => {
    console.log(`El servidor está escuchando en el puerto ${ port }`);
});