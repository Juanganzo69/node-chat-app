const { isRealString } = require('./validation');
const expect = require('expect');

describe('isRealString', () => {
    it('Deberá rechazar los que no son tipo string', () => {
        var validacion = isRealString(1234);

        expect(validacion).toBe(false);        
        expect(validacion).toBeA('boolean');

    });
    it('Deberá rechazar el string que solo contenga espacios', () => {
        var validacion = isRealString('    ');

        expect(validacion).toBe(false);        
        expect(validacion).toBeA('boolean');
    });

    it('Deberá permitir strings con espacios entre letras', () => {
        var validacion = isRealString('El cuarto secreto');

        expect(validacion).toBe(true);        
        expect(validacion).toBeA('boolean');
    });
});