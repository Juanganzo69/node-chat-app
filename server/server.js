const path = require('path');
const http  = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generarMensaje, generarLocationMensaje } = require('./utils/mensaje');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

var port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users(); 

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log('usuario conectado');

    socket.on('join', (params, callback) => {
        var user = users.getUserList(params.room).filter( (name) => name === params.name );


        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Nombre y room son requeridos');        
        }else if(user.length > 0){
            return callback(`El usuario ${ params.name } ya existe en el room ${ params.room }`);
        }

        socket.join(params.room);
        users.removeUser(socket.id);

        users.addUsers( socket.id, params.name, params.room );
        users.addRoom( params.room );   
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMensaje', generarMensaje('Admin', 'Bienvenidos al chat room'));
        socket.broadcast.to(params.room).emit('newMensaje', generarMensaje('Admin',`${params.name} está conectado`));
        callback();
    });

    socket.on('sendRooms', (msg, callback) => {
            
            callback(users.room);
    });

    socket.on('roomie', ( params, callback ) => {
        io.emit('room',users.room );
        callback();
    });
     

    socket.on('crearMensaje', ( msj, callback ) => {
        var user = users.getUser(socket.id);
        
        if( user && isRealString(msj.texto)){
            io.to(user.room).emit('newMensaje', generarMensaje(user.name, msj.texto));
            
        }

        callback();
    });

    socket.on('crearLocationMensaje', ( coords) => {
        var user = users.getUser(socket.id);
        if( user ){
            io.to(user.room).emit('newLocationMensaje', generarLocationMensaje(user.name, coords.latitud, coords.longitud));            
        }
    });

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
        var user = users.removeUser(socket.id);
                
        

        if( user ){
            var sizeRoom = users.getUserList(user.room);

            if( sizeRoom.length === 0 ){
                var roomRemove = users.removeRoom(user.room);
                io.emit('room', users.getListRoom());
            }

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMensaje', generarMensaje('Admin', `${ user.name } se desconectó`));
        }
    });
});

server.listen(port, ()  => {
    console.log(`El servidor está escuchando en el puerto ${ port }`);
});