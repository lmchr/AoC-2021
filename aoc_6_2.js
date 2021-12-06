const fs = require('fs');

let text = fs.readFileSync('aoc_6.txt')
text = text.toString().split(",").map(x => parseInt(x))

const numDays = 256
let numZeros = 0
let field = {}
for (let i=0; i<=8; i++){
    field[i] = 0
}
for (let i=0; i<text.length; i++){
    field[text[i]]++
}

for (let day=0; day<numDays; day++){
    numZeros = field[0]
    for (let i=1; i<=8; i++){
        field[i - 1] = field[i]
    }
    field[6] += numZeros;
    field[8] = numZeros;
}

console.log(Object.values(field).reduce((a,b) => a+b))