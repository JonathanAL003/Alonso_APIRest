const yaml = require('yaml');
const fs = require('fs')
const path = require('path')

const archivoArr = fs.readFileSync(path.join(__dirname,'/archivosyaml/arreglo.yml'),'utf8')
const valorArra = yaml.parse(archivoArr)
console.table(valorArra)