// test/test.js
const chai = require('chai');
const expect = chai.expect;
const suma = require('../source/modulo');

describe('Mi Módulo', function () {
    it('debería sumar dos números correctamente', function () {
        const resultado = suma(2, 3);
        expect(resultado).to.equal(5);
    });

    it('debería sumar números negativos correctamente', function () {
        const resultado = suma(-2, 3);
        expect(resultado).to.equal(1);
    });

    it('debería sumar cero correctamente', function () {
        const resultado = suma(0, 3);
        expect(resultado).to.equal(3);
    });
});
