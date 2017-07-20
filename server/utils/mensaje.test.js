var expect = require('expect');
var { generarMensaje } = require('./mensaje');

describe('generarMensaje', () => {
    it('Deberá generar un objeto del mensaje', () => {
        var from = 'juan1910@live.com.mx';
        var texto =  'Hola amigos :)';

        var mensaje = generarMensaje( from , texto );
        expect(mensaje).toExist();
        expect(mensaje).toInclude({from, texto });
        expect(mensaje.completedAt).toBeA('number');
    });
});