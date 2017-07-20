var generarMensaje = ( from, texto ) => {
    return {
        from,
        texto,
        completedAt : new Date().getTime()
    };
};

module.exports = { generarMensaje };