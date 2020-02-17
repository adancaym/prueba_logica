const numberToText = require('number-to-text')
require('number-to-text/converters/en-us');
const valores = [3,5,7]
const etiquetas = [
        {value : 3, string: 'Foo'},
        {value : 5, string: 'Bar'},
        {value : 7, string: 'Qix'}
    ]

const procesar2 = () => {
    valores.unshift(0)
    etiquetas.unshift({value:0, string: '*'})

    const pruebas = [101,303,105,10101]

    var salida = []
    for (let entrada of pruebas) {
        var object = {}
        if ( getIsdivisible(entrada).length !==0  ){
            object.esDivisible = getIsdivisible(entrada)
        }

        if ( getContains(entrada).length !==0 ){
            object.contiene = getContains(entrada)
        }

        object.entrada = entrada

        salida.push(object)
    }

    salida = getTags2(salida)

    salida.forEach(arreglo => {
        console.log(arreglo.entrada +' => ' + arreglo.cadena  )
    })
    return 1
}


const procesar = () => {
    const pruebas = [1,2,3,4,5,6,7,8,9,10,13,15,21,33,51,53]
    var salida = []
    for (let entrada of pruebas) {
        var object = {}
        if ( getIsdivisible(entrada).length !==0  ){
            object.esDivisible = getIsdivisible(entrada)
        }

        if ( getContains(entrada).length !==0 ){
            object.contiene = getContains(entrada)
        }

        object.entrada = entrada
        salida.push(object)
    }

    salida = getTags(salida)

    salida.forEach(arreglo => {
        console.log(arreglo.entrada +' => ' + arreglo.cadena + ' ' + arreglo.parentesis )
    })
    return 1
}
const getTags = (entradaValores) => {
    const salida = []
    for (let valor of entradaValores) {
        const parentensisString = []
        const cadena = []
        if (valor.esDivisible){
            for(let frase of valor.esDivisible) {
                parentensisString.push(frase.cadena)
                const tag = etiquetas.find(tag => tag.value === frase.module)
                cadena.push(tag.string)
            }
            parentensisString.concat(valor.esDivisible)
        }
        if (valor.contiene) {
            for(let frase of valor.contiene) {
                parentensisString.push(frase.cadena)
                const tag = etiquetas.find(tag => tag.value === frase.module)
                cadena.push(tag.string.repeat(frase.repeticiones))
            }
            parentensisString.concat(valor.contiene)
        }

        let parentesis = ''
        if (valor.contiene && valor.esDivisible) {
            parentesis = parentensisString.join(',') === '' ? valor.entrada: '(' + parentensisString.join(',') + ')'
        }
        if (cadena.join('') == '' && parentesis === '') {
            parentesis = valor.entrada
        }
        const obj = {
            entrada: valor.entrada,
            parentesis,
            cadena: cadena.join('')
        }
        salida.push(obj)
    }
    return salida;
}
const getTags2 = (entradaValores) => {
    const salidaValores = getTags(entradaValores)
    for (let valor of salidaValores) {
        if (valor.cadena === '*') {
            let entradaCadena = '' + valor.entrada;
            valor.cadena = entradaCadena.replace(/0/g,"*");
        }
    }
    return salidaValores
}

const occurrencesToString = (entrada, module) => {

    const numero = occurrences(entrada,module)
    let letras = numberToText.convertToText(numero)
    if (letras === 'One' || letras === 'Zero'){
        letras = ''
    }
    return letras
}
const occurrences = (string, subString, allowOverlapping) => {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
const getContains  = (entrada ) => {
    let salida = []
    let entradaStringOcurrencies = '' + entrada;
    let entradaString = '' + entrada;
    entradaString = entradaString.split('')
    for (let entradaStringArray of entradaString){
        const valorToSearch = valores.find(valor => valor === parseInt(entradaStringArray))
        const module = valorToSearch
        let moduleString= ''+module;
        const guardado = salida.find(guardado => guardado.module === module)
        if (occurrences(entradaStringOcurrencies, moduleString )!==0 && !guardado ){
            salida.push({cadena: ' contains ' + occurrencesToString(entradaStringOcurrencies, moduleString) + ' ' +module, module, repeticiones: occurrences(entradaStringOcurrencies,moduleString)} )
        }
    }

    return salida
}


const getIsdivisible = (entrada) => {
    let salida = []
    let cadena = ''
    for (let module of valores) {
        if (isModuloDe(entrada, module)){
            salida.push({cadena: ' divisible by ' + module, module})
        }
    }
    return salida
}
const isModuloDe = (entrada, module) => {
    return modulo(entrada, module) === 0
}
const modulo = (entrada, module) => {
    return entrada % module
}

module.exports = {
    procesar,
    procesar2,
    getTags,
    occurrencesToString,
    occurrences,
    getContains,
    getIsdivisible,
    isModuloDe,
    modulo
}


