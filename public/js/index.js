var socket = io();

socket.on('connect', function () {
    console.log('conectado con el servidor');

});

socket.on('disconnect', function () {
    console.log('servidor desconectado');
});

socket.on('newMensaje', function (newMsg) {
    console.log('Mensaje: ', newMsg);
    var li = jQuery('<li></li>');
    li.text(newMsg.from + ' : ' + newMsg.texto);
    jQuery('#mensajes').append(li);
});

socket.on('newLocationMensaje', function (msg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My localización actual</a>');
    li.text(msg.from+' : ');
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#mensajes').append(li);
});

jQuery('#mensaje-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('crearMensaje', {
        from: 'Usuario',
        texto: jQuery('[name=mensaje]').val()
    }, function () {

    });
});

var locationBotton = jQuery('#send-location');
locationBotton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocalización no soportada en tu navegador.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('crearLocationMensaje', {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
        });
    }, function (err) {
        alert('Desactivado para buscar tu localización');
    });
});