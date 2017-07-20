var socket = io();

socket.on('connect', function(){
    console.log('conectado con el servidor');

});

socket.on('disconnect', function(){
    console.log('servidor desconectado');
});

socket.on('newMensaje', function(newMsg){
    console.log('Mensaje: ', newMsg );
});