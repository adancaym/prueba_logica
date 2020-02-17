const proceso = require('../src/process')
var assert = require("assert");

describe("Modulo",function(){
    it('debe de dat cero',function(){
        assert.equal(0, proceso.modulo(9,3));
    })
    it('debe de dar verdaro',function(){
        assert.equal(true, proceso.isModuloDe(9,3));
    })
});


describe("Cadenas",function(){
    it('debe de dar 1 coincidencia',function(){
        assert.equal(1, proceso.occurrences('hola adan','hola'));
    })

    it('debe de dar 3 coincidencia',function(){
        assert.equal(3, proceso.occurrences('333','3'));
    })

    it('debe de dar Two',function(){
        assert.equal("Two", proceso.occurrencesToString('33','3'));
    })
});
describe("Modulo",function(){
    it('debe de dar verdaro',function(){
        assert.equal(true, proceso.getTags(9,3));
    })
});

