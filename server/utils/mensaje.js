var generarMensaje = ( from, texto ) => {
    return {
        from,
        texto,
        creadoEl : new Date().getTime()
    };
};

var generarLocationMensaje = ( from, latitud, longitud ) => {
    return {
        from,
        url: `https://www.google.com.mx/maps?=${latitud},${longitud}`,
        creadoEl : new Date().getTime()        
    };
};

module.exports = { generarMensaje, generarLocationMensaje };