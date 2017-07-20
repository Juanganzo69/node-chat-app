const path = require('path');
const http  = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generarMensaje, generarLocationMensaje } = require('./utils/mensaje');
var port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');


var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log('usuario conectado');

    socket.emit('newMensaje', generarMensaje('Admin', 'Bienvenidos al chat room'));

    socket.broadcast.emit('newMensaje', generarMensaje('Admin','Nuevo usuario conectado'));

    socket.on('crearMensaje', ( msj, callback ) => {
        console.log('Mensaje: ', msj);
        
        io.emit('newMensaje', generarMensaje(msj.from, msj.texto));
        callback();
    });

    socket.on('crearLocationMensaje', ( coords) => {
        io.emit('newLocationMensaje', generarLocationMensaje('Admin', coords.latitud, coords.longitud));
    });

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
});

server.listen(port, ()  => {
    console.log(`El servidor está escuchando en el puerto ${ port }`);
});