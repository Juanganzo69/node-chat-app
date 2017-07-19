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

    // socket.emit('newEmail', {
    //     from: 'Juanganzo69@gmail.com',
    //     msg: 'Hola como estás?',
    //     creadoEl: 1234
    // });

    socket.emit('newMensaje', {
        de : 'juanito@gmail.com',
        texto: 'Te amo <3',
        creadoEl: 3421
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('Email creado', newEmail);
    // }); 

    socket.on('crearMensaje', ( msj ) => {
        console.log('Mensaje: ', msj);
    });

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
});



server.listen(port, ()  => {
    console.log(`El servidor está escuchando en el puerto ${ port }`);
});