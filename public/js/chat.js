var socket = io();

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params ,function(err){
            if(err){
                jQuery('#myModal').modal('show');
                $('#myModal').on('shown.bs.modal', function () {
                    var template = jQuery('#modalError').html();

                    var html = Mustache.render(template,{
                        error: err
                    });
                    jQuery('#textError').append(html);
                });
                $('#myModal').on('hidden.bs.modal', function (e) {
                    window.location.href = '/';
                });
                
            }else{
                console.log('No hay errores');
                socket.emit('roomie', params, function(){});
            }
    });

});

socket.on('disconnect', function () {
    console.log('servidor desconectado');
});



function scrollToBottom(){
    var mensajes = jQuery('#mensajes');
    var nuevoMensaje = mensajes.children('li:last-child');

    var clienteAltura = mensajes.prop('clientHeight');
    var scrollTop = mensajes.prop('scrollTop');
    var scrollHeight = mensajes.prop('scrollHeight');
    var nuevoMensajeAltura = nuevoMensaje.innerHeight();
    var ultimoMensajeAltura = nuevoMensaje.prev().innerHeight();

    if( clienteAltura + scrollTop + ultimoMensajeAltura + nuevoMensajeAltura >= scrollHeight ){
        mensajes.scrollTop(scrollHeight);
    }

}

socket.on('updateUserList', function(users){
    var ol = jQuery('<ol></ol>');

    users.forEach( function(user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMensaje', function (newMsg) {
    var formatoTiempo = moment(newMsg.creadoEl).format('h:mm a');    
    var template = jQuery('#mensaje-template').html();

    var html = Mustache.render(template,{
        from: newMsg.from,
        texto: newMsg.texto,
        creadoEl: formatoTiempo
    });

    jQuery('#mensajes').append(html);
    scrollToBottom();
});

socket.on('newLocationMensaje', function (msg) {
    var formatTime = moment(msg.creadoEl).format('h:mm a');
    var template = jQuery('#location-mensaje-template').html();
    var html = Mustache.render( template, {
        from: msg.from,
        url: msg.url,
        creadoEl: formatTime
    });

    jQuery('#mensajes').append(html);
    scrollToBottom();

});

jQuery('#mensaje-form').on('submit', function (e) {
    e.preventDefault();

    var mensajeTextbox = jQuery('[name=mensaje]');

    socket.emit('crearMensaje', {
        texto: mensajeTextbox.val()
    }, function () {
        mensajeTextbox.val('');
    });
});

var locationBotton = jQuery('#send-location');
locationBotton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocalización no soportada en tu navegador.');
    }
    
    locationBotton.attr('disabled','disabled').text('enviando localización...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationBotton.removeAttr('disabled').text('Enviar localización');
        socket.emit('crearLocationMensaje', {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
        });
    }, function (err) {
        alert('Desactivado para buscar tu localización');
        locationBotton.removeAttr('disabled').text('Enviar localización');      
    });
});