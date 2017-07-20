var socket = io();

socket.on('connect', function(){
    console.log('conectado con el servidor');

});

socket.on('disconnect', function(){
    console.log('servidor desconectado');
});

socket.on('newMensaje', function(newMsg){
    console.log('Mensaje: ', newMsg );
    var li = jQuery('<li></li>');
    li.text(newMsg.from+' : '+newMsg.texto);
    jQuery('#mensajes').append(li);
});

jQuery('#mensaje-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('crearMensaje', {
        from: 'Usuario',
        texto: jQuery('[name=mensaje]').val()
    }, function(){

    });
});