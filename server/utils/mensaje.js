var moment = require('moment');

var generarMensaje = ( from, texto ) => {
    return {
        from,
        texto,
        creadoEl : moment().valueOf()
    };
};

var generarLocationMensaje = ( from, latitud, longitud ) => {
    return {
        from,
        url: `https://www.google.com.mx/maps?=${latitud},${longitud}`,
        creadoEl : moment().valueOf()        
    };
};

module.exports = { generarMensaje, generarLocationMensaje };