var expect = require('expect');
var { generarMensaje, generarLocationMensaje } = require('./mensaje');

describe('generarMensaje', () => {
    it('Deberá generar un objeto del mensaje', () => {
        var from = 'juan1910@live.com.mx';
        var texto =  'Hola amigos :)';

        var mensaje = generarMensaje( from , texto );
        expect(mensaje).toExist();
        expect(mensaje).toInclude({from, texto });
        expect(mensaje.creadoEl).toBeA('number');
    });
});

describe('generarLocationMensaje', () => {
    it('Deberá generar un objeto con una localización', () => {
        var from = 'Juan';
        var latitud = '20.971752199999997';
        var longitud = '-89.58031240000001';
        var url = 'https://www.google.com.mx/maps?=20.971752199999997,-89.58031240000001';

        var locMensaje = generarLocationMensaje(from, latitud, longitud);
        expect(locMensaje).toExist();
        expect(locMensaje).toInclude({ from, url});
        expect(locMensaje.creadoEl).toBeA('number');
    });
});