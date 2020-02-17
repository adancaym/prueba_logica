const rules = require('./rules')
const proceso = require('./process')
console.table(rules)


//stdin.addListener("data",proceso.procesar);
proceso.procesar2()
