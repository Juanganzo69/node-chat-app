var socket = io();

socket.on('connect', function () {
    console.log('conectado...');
    socket.emit('sendRooms',{ k: null } ,function(k){
        var ol = jQuery('<ol></ol>');

        k.forEach( function(room){
            ol.append(jQuery('<li></li>').text(room));
        });

        jQuery('#listRooms').html(ol);
    });
});


socket.on('room', function(rooms){
        console.log(rooms);

        var ol = jQuery('<ol></ol>');

        rooms.forEach( function(room){
            ol.append(jQuery('<li></li>').text(room));
        });

        jQuery('#listRooms').html(ol);
});

jQuery('#refresh').click( function(){
    socket.emit('sendRooms',{ k: null } ,function(k){
        console.log(k);
    });     
});

socket.on('disconnect', function () {
    console.log('servidor desconectado');
});